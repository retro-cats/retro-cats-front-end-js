import React from 'react'
import { Header } from './components/Header'
import { Main } from './components/Main'
import { Container } from '@mui/material'
import { makeStyles } from '@mui/styles'


const useStyles = makeStyles(() => ({
  container: {
    borderRadius: "10px",
    boxShadow: "0px 0px 10px #000000",
  }
}))

function App() {
  const classes = useStyles()
  return (
    <>
      <Header />
      <Container className={classes.container} maxWidth='md'>
        <Main />
      </Container>
    </>
  )
}

export default App
