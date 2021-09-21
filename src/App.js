import React from 'react'
import { Header } from './components/Header'
import { Main } from './components/Main'
import { Container } from '@material-ui/core'
import { useMoralis } from 'react-moralis'

// const UserContext = React.createContext(null)


function App() {
  return (
    <>
      <Header />
      <Container maxWidth='md'>
        <Main />
      </Container>
    </>
  )
}

export default App
