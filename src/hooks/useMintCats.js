import RetroCats from "../chain-info/contracts/RetroCats.json";
import networkMapping from "../chain-info/deployments/map.json";
import { useMoralis } from "react-moralis";
import React, { useState } from "react";

export const useMintCats = (retroCatsAddress) => {
  const { web3 } = useMoralis();
  const { abi } = RetroCats;
  const contract = new web3.eth.Contract(abi, retroCatsAddress);

  const [mintCatsState, setMintCatsState] = useState({ status: null });

  const mintCats = async (amount) => {
    let cat_price = await contract.methods.s_catFee().call();
    try {
      setMintCatsState({ status: "Mining" });
      let tx = await contract.methods
        .mint_cats(amount)
        .send({ from: web3.eth.currentProvider.selectedAddress, value: cat_price * amount });
      setMintCatsState({ status: tx.status });
      console.log(tx);
    } catch (e) {
      setMintCatsState({ status: null });
      console.log(e);
    }
  };
  return { mintCats, mintCatsState };
};
