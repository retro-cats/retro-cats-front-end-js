import { Box, Button, Link } from '@mui/material'
import { makeStyles } from '@mui/styles'

import opensea from '../img/opensea.png'

const useStyles = makeStyles(() => ({
  title: {
    textAlign: 'center',
    padding: "4",
    justifyContent: 'center',
  },
  openseaImg: {
    width: '100px',
  }
}))

const testnetOpensea = "https://testnets.opensea.io/collection/retro-cats-6qc0zg0sx7"
const openseaURL = "https://opensea.io/collection/retro-cats"


export const SearchCats = ({ networkId, retroCatsAddress }) => {
  const classes = useStyles()

  return (
    <Box className={classes.title}>
      <a href={networkId === 4 ? testnetOpensea : openseaURL}
        target="_blank" rel="noreferrer">
        <Button
          sx={{ fontSize: 32 }}
          color="secondary"
          variant='contained'>
          View on Opensea! &nbsp;
          <img src={opensea} alt="" className={classes.openseaImg} />
        </Button>
      </a>
    </Box >
  )
}
