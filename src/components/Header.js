import { Button, makeStyles } from '@material-ui/core'
import { useMoralis, useMoralisWeb3Api } from 'react-moralis'
import { useState, useEffect } from 'react'


const useStyles = makeStyles((theme) => ({
  navBarItems: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(4),
    justifyContent: "space-between",
    marginLeft: theme.spacing(10),
    marginRight: theme.spacing(10),

  }
}))

export const Header = () => {
  const {
    enableWeb3,
    isWeb3Enabled,
    isWeb3EnableLoading,
    web3EnableError,
    authenticate,
    isAuthenticated,
    isAuthenticating,
    logout,
    authError,
    onAccountsChanged,
    web3
  } = useMoralis()

  useEffect(() => { if (isAuthenticated) { enableWeb3() } }, [isAuthenticated])

  const enableAndAuthenticate = async () => {
    await enableWeb3()
    await authenticate()
  }
  const classes = useStyles()

  return (
    <nav className={classes.navBarItems}>
      <h2>RetroCats</h2>
      <div>
        <Button
          variant='contained'
          color='primary'
          onClick={() => {
            if (!isAuthenticated || !isWeb3Enabled) {
              enableAndAuthenticate()
            } else {
              logout()
            }
          }}
          disabled={isAuthenticating}
        >
          {isAuthenticating || isWeb3EnableLoading ? 'Loading...' : !isAuthenticated || !isWeb3Enabled ? 'Connect & Login' : 'Logout'}
        </Button>
        {authError && <div>{authError.message}</div>}
        {web3EnableError && <div>{web3EnableError.message}</div>}
      </div>
    </nav>
  )
}
