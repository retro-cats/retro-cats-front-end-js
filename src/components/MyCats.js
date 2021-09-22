import {
    useMoralis,
    useMoralisWeb3Api,
    useMoralisWeb3ApiCall
} from 'react-moralis'
import { Box, Button, makeStyles } from '@material-ui/core'
import helperConfig from "../helper-config.json"
import React, { useState, useEffect } from "react"
import { CatList } from "./CatList"

const useStyles = makeStyles(theme => ({
    default: {
        padding: theme.spacing(1),
    },
}))

export const MyCats = ({ networkId, retroCatsAddress }) => {
    const classes = useStyles()
    const networkName = networkId ? helperConfig[String(networkId)] : "dev"
    const Web3Api = useMoralisWeb3Api()
    const { web3, user, Moralis } = useMoralis()

    const { fetch, data, error, isLoading } = useMoralisWeb3ApiCall(Web3Api.account.getNFTsForContract,
        { chain: networkName, address: user.attributes.accounts, token_address: retroCatsAddress }
    )

    const updateNFTImages = async () => {
        let cat = await Moralis.Cloud.run("updateNFTImages", { networkId, retroCatsAddress })
        console.log(cat)
        return cat
    }

    return (
        <Box textAlign='center'>
            {error && <div>{error.message}</div>}
            {data ? <CatList catListData={data} retroCatsAddress={retroCatsAddress} /> : <div>Loading...</div>}
            <Button
                onClick={async () => await updateNFTImages()}
                color="primary"
                size="small">
                Refresh
            </Button>
        </Box>

    )
}
