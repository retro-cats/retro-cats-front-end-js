import RetroCats from '../chain-info/contracts/RetroCats.json'
import networkMapping from '../chain-info/deployments/map.json'
import { useMoralis } from 'react-moralis'
import React, { useState, useEffect } from 'react'

export const useMintCats = (retroCatsAddress) => {
  const { Moralis } = useMoralis()
  const { abi } = RetroCats
  const options = { abi, contractAddress: retroCatsAddress }

  const [mintCatsState, setMintCatsState] = useState({ status: null })

  const mintCats = async (amount) => {
    let cat_price = await Moralis.executeFunction({ functionName: 's_catFee', ...options })
    try {
      setMintCatsState({ status: 'Mining' })
      let tx = await Moralis.executeFunction({
        functionName: 'mint_cats',
        params: { amount },
        msgValue: cat_price * amount,
        ...options,
      })
      setMintCatsState({ status: tx.status })
      console.log(tx)
    } catch (e) {
      setMintCatsState({ status: null })
      console.log(e)
    }
  }
  return { mintCats, mintCatsState }
}
