import React, { useState, useEffect } from "react"
import useWindowSize from 'react-use/lib/useWindowSize'
import { Input, Button, CircularProgress, Box, Snackbar, Backdrop } from "@mui/material"
import { useMintCats } from "../hooks"
import { BackDropContent } from "./BackDropContent"
import { makeStyles } from '@mui/styles'
import { useMoralis } from 'react-moralis'


const useStyles = makeStyles(() => ({
  input: {
    textAlign: 'center',
    width: '50%',
  }
}))

const shouldSleep = true

export const MintCats = ({ retroCatsAddress, networkId }) => {
  const { Moralis } = useMoralis()
  const [amountOfCats, setAmountOfCats] = useState(0)
  const handleInputChange = (event) => {
    const newAmount = event.target.value === "" ? "" : event.target.value
    setAmountOfCats(newAmount)
    console.log(newAmount)
  }
  const { mintCats, mintCatsState } = useMintCats(retroCatsAddress)
  const [txSuccess, setTxSuccess] = useState(false)
  useEffect(() => {
    if (mintCatsState.status === true) {
      setTxSuccess(true)
      Moralis.Cloud.run("updateNFTImages", { networkId, retroCatsAddress, shouldSleep })
    }
  }, [mintCatsState.status])

  const handleCloseBackDrop = () => {
    setTxSuccess(false)
  }

  const handleMintSubmit = () => {
    return mintCats(amountOfCats)
  }

  const isMining = mintCatsState.status === "Mining"

  const classes = useStyles()
  return (
    <>
      <BackDropContent txSuccess={txSuccess} handleCloseBackDrop={handleCloseBackDrop} />
      <div>
        <Box textAlign='center'>
          <Input
            onChange={handleInputChange}
            placeholder="Number of Cats to mint, ie: 5"
            fullWidth={true}
            className={classes.input}
            type="number"
          />
          <Button
            onClick={handleMintSubmit}
            color="primary"
            size="large"
            variant='contained'
            disabled={isMining || amountOfCats <= 0}>
            {isMining ? <CircularProgress size={26} /> : "Mint Cats"}
          </Button>
        </Box>
        {mintCatsState.status ? <div></div> : <div></div>}
      </div>
    </>
  )
}
