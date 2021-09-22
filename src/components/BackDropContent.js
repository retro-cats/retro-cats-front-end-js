import Confetti from 'react-confetti'
import { useState, useEffect } from 'react'
import { Input, Button, makeStyles, CircularProgress, Box, Snackbar, Backdrop } from "@material-ui/core"
import useWindowSize from 'react-use/lib/useWindowSize'

const useStyles = makeStyles((theme) => ({
    backDropTitle: {
        textAlign: 'center',
        backgroundColor: 'white',
        marginLeft: "25%",
        marginRight: "25%",
        // background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 50%)',
        borderRadius: "10px",
        padding: "10px",
        fontSize: "3rem",
    },
    backDropText: {
        marginLeft: "25%",
        marginRight: "25%",
        textAlign: 'center',
        backgroundColor: "white",
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
                In a few minutes, head over to the "My Cats" tab, hit the refresh button, wait a few seconds, then browser refresh, and you'll see your adorable new Cat!
                Or jump to the search cats tab to see on Opensea!
            </h2>
        </div>
    </Backdrop>)
}
