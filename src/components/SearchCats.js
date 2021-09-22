import { Box, Button, makeStyles, Link } from '@material-ui/core'
import opensea from '../img/opensea.png'

const useStyles = makeStyles((theme) => ({
  title: {
    color: theme.palette.common.black,
    textAlign: 'center',
    padding: theme.spacing(4),
    fontSize: '2rem',
    justifyContent: 'center',
  },
  openseaImg: {
    width: '50px',
  }
}))

const testnetOpensea = "https://testnets.opensea.io/collection/retro-cats-6qc0zg0sx7"
const openseaURL = "https://opensea.io/"


export const SearchCats = ({ networkId, retroCatsAddress }) => {
  const classes = useStyles()

  return (
    <Box className={classes.title}>
      <a href={networkId === 4 ? testnetOpensea : openseaURL}
        target="_blank" rel="noreferrer">
        <Button className={classes.title}
          variant='contained'>
          View on Opensea! &nbsp;
          <img src={opensea} alt="" className={classes.openseaImg} />
        </Button>
      </a>
    </Box >
  )
}
