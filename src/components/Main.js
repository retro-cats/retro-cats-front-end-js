import { useState, useEffect } from 'react'
import networkMapping from '../chain-info/deployments/map.json'
import { MintCats } from "./MintCats"
import { ShowCats } from "./ShowCats"

import helperConfig from '../helper-config.json'
import brownieConfig from '../brownie-config.json'
import { Box, makeStyles, Tabs, Tab, Container } from '@material-ui/core'
import { TabContext, TabList, TabPanel } from "@material-ui/lab"
import { constants } from 'ethers'
import { NFTView } from './ShowCats'
import {
  useMoralisWeb3Api,
  useMoralisWeb3ApiCall,
  useMoralis,
} from 'react-moralis'
import { MintOrViewCats } from './MintCats'

const useStyles = makeStyles((theme) => ({
  title: {
    color: theme.palette.common.black,
    textAlign: 'center',
    padding: theme.spacing(4),
    fontSize: '2rem',
  },
  box: {
    backgroundColor: "white",
    borderRadius: "25px",
  },
  header: {
    color: "blue"
  }
}))

export const isValidNetwork = (network) => {
  if (networkMapping.hasOwnProperty(network)) {
    return true
  }
  return false
}

export const Main = () => {

  const classes = useStyles()
  const { Web3Api } = useMoralisWeb3Api()
  const { web3, isWeb3Enabled, Moralis, user, isAuthenticated, enableWeb3 } = useMoralis()

  const getChain = async () => {
    if (isAuthenticated && isWeb3Enabled) {
      return await web3.eth.getChainId()
    }
    return null
  }

  const [selectedTab, setSelectedTab] = useState("mint-cats")
  const [networkId, setNetworkId] = useState(null)

  useEffect(() => {
    getChain().then(setNetworkId)
  }, [isWeb3Enabled])

  Moralis.onChainChanged(async () => {
    getChain().then(setNetworkId)
  })

  const handleTabChange = (event, newTab) => {
    setSelectedTab(newTab)
  }

  const tabOptions = [
    "mint-cats",
    "show-cats"
  ]


  const retroCatsAddress = isValidNetwork(networkId) ? networkMapping[networkId.toString()]['RetroCats'][0] : "0x0000000000000000000000000000000000000000"
  return (
    <div>
      {isAuthenticated && isWeb3Enabled ?
        isValidNetwork(networkId) ?
          <Container>
            <TabContext value={selectedTab.toString()}>
              <TabList centered onChange={handleTabChange} aria-label="cats-tab">
                {tabOptions.map((tabOption) => {
                  return (<Tab label={tabOption} value={tabOption} key={tabOption} />)
                })}
              </TabList>
              {tabOptions.map((tabOption) => {
                return (<TabPanel className={classes.tabContent} value={tabOption} key={tabOption}>
                  {tabOption === "mint-cats" ? <MintCats networkId={networkId} retroCatsAddress={retroCatsAddress} /> : <ShowCats networkId={networkId} retroCatsAddress={retroCatsAddress} />}
                </TabPanel>)
              })}
            </TabContext>
          </Container> :
          <div className={classes.title}>Please connected to a supported chain!</div> :
        <div className={classes.title}>Please Connect Metamask and Login!</div>}
    </div >
  )
}
