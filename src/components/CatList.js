import { Box, makeStyles, ImageList, ImageListItem } from '@material-ui/core'

const baseURI = "https://us-central1-retro-cats.cloudfunctions.net/retro-cats-image-rinkeby?token_id="

const useStyles = makeStyles(theme => ({
    container: {
        display: "inline-grid",
        gridTemplateColumns: "auto auto auto",
        gap: theme.spacing(1),
        alignItems: "center"
    },
    catImg: {
        width: "32px"
    },
}))

export const CatList = ({ catListData }) => {
    const classes = useStyles()

    return (
        <div>
            {
                catListData.result.length > 0 ?
                    <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
                        {catListData.result.map(cat => (
                            <ImageListItem key={cat.token_id}>
                                <img className={classes.tokenImg}
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
