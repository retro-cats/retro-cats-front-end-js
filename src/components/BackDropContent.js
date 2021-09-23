import Confetti from 'react-confetti'
import { Backdrop } from "@mui/material"
import useWindowSize from 'react-use/lib/useWindowSize'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles(() => ({
    backDropTitle: {
        textAlign: 'center',
        backgroundColor: 'gold',
        marginLeft: "25%",
        marginRight: "25%",
        borderRadius: "10px",
        padding: "10px",
        fontSize: "3rem",
    },
    backDropText: {
        marginLeft: "25%",
        marginRight: "25%",
        textAlign: 'center',
        backgroundColor: "gold",
        borderRadius: "10px",
        padding: "10px",
        fontSize: "1rem",
    }
}))

export const BackDropContent = ({ txSuccess, handleCloseBackDrop }) => {
    const { width, height } = useWindowSize()
    const classes = useStyles()

    return (<Backdrop
        open={txSuccess}
        onClick={handleCloseBackDrop}
    >
        <Confetti
            width={width}
            height={height}
        />
        <div>
            <h1 className={classes.backDropTitle}>
                Your Cat(s) are being randomly created!
            </h1>
            <h2 className={classes.backDropText}>
                In a few minutes, head over to the "My Cats" tab.

                <br /> If you don't see any cats, hit the refresh button, wait a few seconds, then browser refresh, and you'll see your adorable new Cat!

                <br /><br />Or jump to the search cats tab to see on Opensea!
            </h2>
        </div>
    </Backdrop>)
}
