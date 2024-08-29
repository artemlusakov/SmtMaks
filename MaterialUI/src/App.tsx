import './App.css'
import TemporaryDrawer from './Components/Navigate/Navigate.jsx'
import {AppBar, Container} from "@mui/material";

function App() {
  return (
    <>
        <AppBar className='AppBar' color='transparent'  position='fixed'>
          <Container fixed className='App__Container'>
            <TemporaryDrawer/>
          </Container>
        </AppBar>
    </>
  )
}

export default App
