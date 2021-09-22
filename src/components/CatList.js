import { Box, makeStyles, ImageList, ImageListItem } from '@material-ui/core'
import { useMoralis, useMoralisFile } from 'react-moralis'

const useStyles = makeStyles(theme => ({
    container: {
        display: "inline-grid",
        gridTemplateColumns: "auto auto auto",
        gap: theme.spacing(1),
        alignItems: "center"
    }
}))

const baseURI = "https://us-central1-retro-cats.cloudfunctions.net/retro-cats-image-rinkeby?token_id="


export const CatList = ({ catListData }) => {
    const classes = useStyles()
    const { web3, user, Moralis } = useMoralis()

    return (
        <div>
            {
                catListData.result.length > 0 ?
                    <ImageList sx={{ width: 200, height: 300 }} cols={3} rowHeight={400}>
                        {catListData.result.map(cat => (
                            <ImageListItem key={cat.token_id}>
                                {/* {getCatImage(cat.token_id)} */}
                                <img
                                    src={baseURI + cat.token_id}
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
