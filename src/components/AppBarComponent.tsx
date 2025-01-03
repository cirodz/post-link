import { AppBar, Button, Toolbar, Typography } from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout';
import { useSessionStore } from '../context/useStore';
import { useLocation, useNavigate } from 'react-router';

const AppBarComponent = () => {
    let navigate = useNavigate();
    const location = useLocation();

    const logout = useSessionStore(state => state.logout)
    const user = useSessionStore(state => state.user)

    const handleLogout = () => {
        logout()
    }

    const handleLogIn = () => {
        navigate("/login");
    }

    return (
        <AppBar style={{ backgroundColor: '#000000' }} position="sticky">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Cancún Link
                </Typography>
                {
                    user ? <Button onClick={handleLogout} color="inherit" startIcon={<LogoutIcon />}>Cerrar sesión</Button> :
                        location.pathname !== '/login' && <Button onClick={handleLogIn} color="inherit">Iniciar sesión</Button>
                }
            </Toolbar>
        </AppBar>
    )
}

export default AppBarComponent