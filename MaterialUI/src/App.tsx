import './App.css'
import TemporaryDrawer from './Components/Navigate/Navigate.jsx'
import {AppBar, Container} from "@mui/material";
import  MC421_Statistics  from "./Components/CM421/CM421_Statistics.jsx";

function App() {
  const handleFileUpload = async (file) => {
    // Здесь мы можем добавить дополнительную логику для отправки файла на сервер
    console.log('Файл загружен:', file.name);
  };

  return (
    <>
          <Container fixed className='App__Container'>
            <TemporaryDrawer/>
          </Container>
  
          <MC421_Statistics/>
      
    </>
  )
}

export default App
