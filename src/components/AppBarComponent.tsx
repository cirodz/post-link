import { AppBar, Button, Toolbar, Typography } from '@mui/material'

const AppBarComponent = () => {
    return (
        <AppBar style={{ backgroundColor: '#000000' }} position="sticky">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Cancún Link
                </Typography>
                <Button color="inherit">Iniciar sesión</Button>
            </Toolbar>
        </AppBar>
    )
}

export default AppBarComponent