
import { LoginPage } from './pages/login/LoginPage'
import HomePage from './pages/home/HomePage'
import ListPosts from './components/ListPosts'
import AppBarComponent from './components/AppBarComponent'
import AdminView from './components/AdminView'
import { Container } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
function App() {

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <AppBarComponent />
        {/* <LoginPage /> */}
        <Container>
          <AdminView />
        </Container>
      </LocalizationProvider>
    </>
  )
}

export default App
