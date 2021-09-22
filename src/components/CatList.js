import { Box, makeStyles, ImageList, ImageListItem } from '@material-ui/core'
import { useMoralis, useMoralisFile } from 'react-moralis'
import React, { useState, useEffect } from "react"


const useStyles = makeStyles(theme => ({
    container: {
        display: "inline-grid",
        gridTemplateColumns: "auto auto auto",
        gap: theme.spacing(1),
        alignItems: "center"
    }
}))

// const baseURI = "https://us-central1-retro-cats.cloudfunctions.net/retro-cats-image-rinkeby?token_id="


export const CatList = ({ catListData, retroCatsAddress }) => {
    const classes = useStyles()
    const { web3, user, Moralis } = useMoralis()

    const [imageURLs, setImageURLs] = useState({})
    useEffect(() => { getImageUrls(retroCatsAddress) }, [])

    const getImageUrls = async (retroCatsAddress) => {
        const NFTImage = Moralis.Object.extend("NFTImage")
        const query = new Moralis.Query(NFTImage)
        query.equalTo("retroCatsAddress", retroCatsAddress)
        const results = await query.find()
        let imageURLs = {}
        results.forEach(element => {
            let url = element.get("image").url()
            let tokenId = element.get("tokenId")
            imageURLs[tokenId] = url
            console.log(url)
        })
        setImageURLs(imageURLs)
        return imageURLs
    }


    return (
        <div>
            {
                catListData.result.length > 0 ?
                    <ImageList sx={{ width: 200, height: 300 }} cols={3} rowHeight={400}>
                        {catListData.result.map(cat => (
                            <ImageListItem key={cat.token_id}>
                                <img
                                    src={imageURLs[cat.token_id]}
                                    alt="retrocat"
                                    loading="lazy" />
                            </ImageListItem>
                        ))}
                    </ImageList >
                    : <Box>No cats found</Box>
            }
        </div>
    )
}
