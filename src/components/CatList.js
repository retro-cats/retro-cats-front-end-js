import { Box, makeStyles, ImageList, ImageListItem } from '@material-ui/core'
import { useMoralis, useMoralisFile } from 'react-moralis'
import React, { useState, useEffect } from "react"


const useStyles = makeStyles(theme => ({
    catImg: {
        "&:hover": {
            boxShadow: "10px 5px 5px red;",
            backgroundColor: "gold",
        }
    }
}))


const baseOpenseaURL = "https://opensea.io/assets/"
const baseTestnetOpenseaURL = "https://testnets.opensea.io/assets/"
const baseURI = "https://us-central1-retro-cats.cloudfunctions.net/retro-cats-image-rinkeby?token_id="

export const CatList = ({ catListData, retroCatsAddress, networkId }) => {
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
        })
        setImageURLs(imageURLs)
        return imageURLs
    }


    return (
        <div>
            {
                catListData.result.length > 0 ?
                    <ImageList cols={3} rowHeight={270} gap={20}>
                        {catListData.result.map(cat => (
                            <ImageListItem className={classes.catImg} key={cat.token_id}>
                                {/* <a href={networkId === 1 ? baseOpenseaURL + retroCatsAddress + "/" + cat.token_id : baseTestnetOpenseaURL + retroCatsAddress + "/" + cat.token_id} target="_blank" rel="noreferrer"> */}
                                <img
                                    src={imageURLs[cat.token_id]}
                                    alt="retrocat"
                                    loading="lazy"
                                    key={cat.token_id} />
                                {/* </a> */}
                            </ImageListItem>
                            // 
                        ))}
                    </ImageList >
                    : <Box>No cats found</Box>
            }
        </div>
    )
}
