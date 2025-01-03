import AppBarComponent from './components/AppBarComponent'
import { Container } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { BrowserRouter } from "react-router";
import RoutesComponent from './routes/RoutesComponent';

function App() {

  return (
    <>
      <BrowserRouter>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <AppBarComponent />
          <Container >
            <RoutesComponent />
          </Container>
        </LocalizationProvider>
      </BrowserRouter>
    </>
  )
}

export default App
