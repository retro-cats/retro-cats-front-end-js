import React, { useState, useEffect } from "react"
import { Input, Button, makeStyles, CircularProgress, Box } from "@material-ui/core"
import { useMintCats } from "../hooks"


const useStyles = makeStyles((theme) => ({
  input: {
    textAlign: 'center',
    width: '50%',
  }
}))

export const MintCats = ({ retroCatsAddress }) => {
  const [amountOfCats, setAmountOfCats] = useState(0)
  const handleInputChange = (event) => {
    const newAmount = event.target.value === "" ? "" : event.target.value
    setAmountOfCats(newAmount)
    console.log(newAmount)
  }
  const { mintCats, mintCatsState } = useMintCats(retroCatsAddress)

  const handleMintSubmit = () => {
    return mintCats(amountOfCats)
  }
  console.log(JSON.stringify(mintCatsState))

  const isMining = mintCatsState.status === "Mining"

  const classes = useStyles()
  return (
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
  )
}
