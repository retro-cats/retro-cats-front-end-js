export const SearchCats = () => {
  return (
    <div>SearchCats</div>
  )
}

// import { useState, useEffect } from 'react'
// import networkMapping from '../chain-info/deployments/map.json'
// import helperConfig from '../helper-config.json'
// import brownieConfig from '../brownie-config.json'
// import { makeStyles } from '@material-ui/core'
// import { constants } from 'ethers'
// import {
//   useMoralisWeb3Api,
//   useMoralisWeb3ApiCall,
//   useMoralis,
// } from 'react-moralis'
// import { MintOrViewCats } from './MintCats'

// const useStyles = makeStyles((theme) => ({
//   title: {
//     color: theme.palette.common.black,
//     textAlign: 'center',
//     padding: theme.spacing(4),
//   },
// }))

// export const NFTView = ({ networkId, user, retroCatsAddress }) => {
//   const Web3Api = useMoralisWeb3Api()
//   //   console.log(networkId)

//   const { fetch, data, error, isLoading } = useMoralisWeb3ApiCall(
//     Web3Api.account.getNFTsForContract,
//     {
//       chain: networkId,
//       address: user,
//       token_address: retroCatsAddress,
//     }
//   )
//   return <div>{JSON.stringify(data)}</div>
// }
