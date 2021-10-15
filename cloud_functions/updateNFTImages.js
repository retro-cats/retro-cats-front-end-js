/* eslint-disable no-undef */

const alreadyExists = async (request, token_id) => {
    const findExistingQuery = new Moralis.Query("NFTImage")
    findExistingQuery.equalTo("retroCatsAddress", request.params.retroCatsAddress)
    findExistingQuery.equalTo("tokenId", token_id)
    const result = await findExistingQuery.find()
    if (result.length > 0) {
        console.log("Already exists!")
        return true
    }
    return false
}

const databaseIsUpdating = async () => {
    const isUpdatingQuery = new Moralis.Query("isUpdating")
    let result = await isUpdatingQuery.first()
    console.log(result)
    if (result === undefined) {
        console.log("Uhhhh... you need a lock in the database")
        return true
    }
    return result["isUpdating"]
}

const setDatabaseUpdating = async (updating) => {
    const isUpdatingQuery = new Moralis.Query("isUpdating")
    let result = await isUpdatingQuery.first()
    if (result.length <= 0) {
        console.log("Uhhhh... you need a lock in the database")
        return false
    }
    result.set("isUpdating", updating)
    await result.save(null, { useMasterKey: true })
    return true
}

let sleepTime = 180000

Moralis.Cloud.define("updateNFTImages", async (request) => {
    const isUpdating = await databaseIsUpdating()
    let response = []
    if (!isUpdating) {
        try {
            await setDatabaseUpdating(true)
            // only for addresses we've already defined
            if (networkMapping[request.params.networkId]["RetroCats"].includes(request.params.retroCatsAddress)) {
                // let's first give the chainlink node some time to return the data!
                if (request.params.shouldSleep) {
                    await new Promise(r => setTimeout(r, sleepTime))
                }
                const web3 = Moralis.web3ByChain(networkIdToString[request.params.networkId])
                const retroCatsContract = new web3.eth.Contract(retroCatsAbi, request.params.retroCatsAddress)
                const nftActualCount = await retroCatsContract.methods.s_tokenCounter().call()
                for (let i = 0; i < nftActualCount; i++) {
                    if (await alreadyExists(request, i)) {
                        continue
                    } else {
                        const NFTImage = Moralis.Object.extend("NFTImage")
                        const nftImage = new NFTImage()
                        nftImage.set("networkId", request.params.networkId)
                        nftImage.set("retroCatsAddress", request.params.retroCatsAddress)
                        nftImage.set("tokenId", i)
                        let tokenUri = await retroCatsContract.methods.tokenURI(i).call()
                        let tokenUriResponse = await Moralis.Cloud.httpRequest({ url: tokenUri })
                        let imageData = await Moralis.Cloud.httpRequest({ url: tokenUriResponse.data.image })
                        let bufferData = { base64: imageData.buffer.toString('base64') }
                        const imageFile = new Moralis.File(`${i}_cat.png`, bufferData)
                        nftImage.set("image", imageFile)
                        let owner = (await retroCatsContract.methods.ownerOf(i).call()).toLowerCase()
                        nftImage.set("owner", owner)
                        await nftImage.save(null, { useMasterKey: true })
                        response.push(i)
                    }
                }
                await setDatabaseUpdating(false)
                return response
            } else {
                await setDatabaseUpdating(false)
                return {
                    "error": "Wrong address or networkId!"
                }
            }
        } catch (e) {
            await setDatabaseUpdating(false)
            return {
                "error": e,
                "response": response
            }
        }
    } else {
        return "Currently updating!"
    }
})

