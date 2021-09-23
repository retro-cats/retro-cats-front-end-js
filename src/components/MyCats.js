import {
  useMoralis,
  useMoralisCloudFunction,
  useMoralisWeb3Api,
  useMoralisWeb3ApiCall,
} from "react-moralis";
import { Box, Button, Snackbar } from "@mui/material";
import { makeStyles } from "@mui/styles";

import Alert from "@mui/lab/Alert";
import helperConfig from "../helper-config.json";
import React, { useState, useEffect } from "react";
import { CatList } from "./CatList";

const useStyles = makeStyles((theme) => ({
  default: {
    padding: 1,
  },
}));

let shouldSleep = false;

export const MyCats = ({ networkId, retroCatsAddress }) => {
  const classes = useStyles();
  const networkName = networkId ? helperConfig[String(networkId)] : "dev";
  const Web3Api = useMoralisWeb3Api();
  const { web3, user, Moralis } = useMoralis();
  const [refreshButtonHit, setRefreshButtonHit] = useState(false);
  const handleCloseSnack = () => {
    setRefreshButtonHit(false);
  };

  const { fetch, data, error, isLoading } = useMoralisWeb3ApiCall(
    Web3Api.account.getNFTsForContract,
    { chain: networkName, address: user.attributes.accounts, token_address: retroCatsAddress }
  );
  const { fetch: runCloudFunc } = useMoralisCloudFunction(
    "updateNFTImages",
    { networkId, retroCatsAddress, shouldSleep },
    { autoFetch: false }
  );

  const updateNFTImages = () => {
    setRefreshButtonHit(true);
    runCloudFunc();
  };

  return (
    <Box textAlign="center">
      {error && <div>{error.message}</div>}
      {data ? (
        <CatList catListData={data} retroCatsAddress={retroCatsAddress} networkId={networkId} />
      ) : (
        <div>Loading...</div>
      )}
      <Button onClick={async () => updateNFTImages()} color="primary" size="small">
        Refresh
      </Button>
      <Snackbar open={refreshButtonHit} autoHideDuration={5000} onClose={handleCloseSnack}>
        <Alert onClose={handleCloseSnack} severity="success">
          Refresh queued! Check back in a few minutes!
        </Alert>
      </Snackbar>
    </Box>
  );
};
