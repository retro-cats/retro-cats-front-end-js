/* eslint-disable no-undef */

const alreadyExists = async (request, token_id) => {
    const NFTImage = Moralis.Object.extend("NFTImage")
    const findExistingQuery = new Moralis.Query(NFTImage)
    findExistingQuery.equalTo("networkId", request.params.networkId)
    findExistingQuery.equalTo("retroCatsAddress", request.params.retroCatsAddress)
    findExistingQuery.equalTo("tokenId", token_id)
    const result = await findExistingQuery.find()
    if (result.length > 0) {
        console.log("Already exists!")
        return true
    }
    return false
}

Moralis.Cloud.define("updateNFTImages", async (request) => {
    if (networkMapping[request.params.networkId]["RetroCats"].includes(request.params.retroCatsAddress)) {
        const NFTImage = Moralis.Object.extend("NFTImage")
        const query = new Moralis.Query(NFTImage)
        query.equalTo("retroCatsAddress", request.params.retroCatsAddress)
        const nftSavedCount = await query.count()
        const web3 = Moralis.web3ByChain(networkIdToString[request.params.networkId])
        const retroCatsContract = new web3.eth.Contract(retroCatsAbi, request.params.retroCatsAddress)
        const nftActualCount = await retroCatsContract.methods.s_tokenCounter().call()
        response = []
        if (nftSavedCount < nftActualCount) {
            for (let i = nftSavedCount; i <= nftActualCount; i++) {
                if (await alreadyExists(request, i)) {
                    return {
                        "error": "Already exists!"
                    }
                }
                const nftImage = new NFTImage()
                nftImage.set("networkId", request.params.networkId)
                nftImage.set("retroCatsAddress", request.params.retroCatsAddress)
                nftImage.set("tokenId", i)

                const results = await query.find()
                let tokenUri = await retroCatsContract.methods.tokenURI(i).call()
                let tokenUriResponse = await Moralis.Cloud.httpRequest({ url: tokenUri })
                let imageData = await Moralis.Cloud.httpRequest({ url: tokenUriResponse.data.image })
                let bufferData = { base64: imageData.buffer.toString('base64') }
                const imageFile = new Moralis.File(`${i}_cat.png`, bufferData)
                nftImage.set("image", imageFile)
                await nftImage.save(null, { useMasterKey: true })
                response.push(i)
            }
        }
        return response
    } else {
        return {
            "error": "Wrong address or networkId!"
        }
    }
})

