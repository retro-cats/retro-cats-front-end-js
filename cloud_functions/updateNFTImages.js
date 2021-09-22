/* eslint-disable no-undef */

Moralis.Cloud.define("updateNFTImages", async (request) => {
    if (networkMapping[request.params.networkId]["RetroCats"].includes(request.params.retroCatsAddress)) {
        const NFTImage = Moralis.Object.extend("NFTImage")
        const query = new Moralis.Query(NFTImage)
        query.equalTo("retroCatsAddress", request.params.retroCatsAddress)
        const nftSavedCount = await query.count()
        const web3 = Moralis.web3ByChain(networkIdToString[request.params.networkId])
        const retroCatsContract = new web3.eth.Contract(retroCatsAbi, request.params.retroCatsAddress)
        const nftActualCount = await retroCatsContract.methods.s_tokenCounter().call()
        if (nftSavedCount < nftActualCount) {
            for (let i = nftSavedCount + 1; i <= nftActualCount; i++) {
                const nftImage = new NFTImage()
                nftImage.set("networkId", request.params.networkId)
                nftImage.set("retroCatsAddress", request.params.retroCatsAddress)
                nftImage.set("tokenId", i)
                let tokenUri = await retroCatsContract.methods.tokenURI(i).call()
                let tokenUriResponse = await Moralis.Cloud.httpRequest({ url: tokenUri })
                let imageData = await Moralis.Cloud.httpRequest({ url: tokenUriResponse.data.image })
                let bufferData = { base64: imageData.buffer.toString('base64') }
                const imageFile = new Moralis.File(`${i}_cat.png`, bufferData)
                await imageFile.saveIPFS()
                // nftImage.set("image", imageFile)
                // await nftImage.save()
            }
        }
    } else {
        return {
            "error": "Wrong address or networkId!"
        }
    }
    // const nftImage = new NFTImage()
    // nftData.set("user", request.user)
    // nftData.set("imageFile", request.imageFile)
    // nftData.set("user", user)
    // nftData.set("data", data)
    // await nftData.save()
})

