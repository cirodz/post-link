import { AppBar, Button, Container, IconButton, Paper, Stack, TextField, Toolbar, Typography } from "@mui/material"


export const LoginPage = () => {
    return (
        <>
            <Container >
                <Stack
                    display='flex'
                    direction={{ xs: 'column', sm: 'row' }}
                    gap={6}
                    alignContent={'center'}
                    alignItems='center'
                    justifyContent='center'
                >
                    <Typography variant="h4">Bienvenido, ve las últimas opiniones de todo Cancún.</Typography>

                    <div>
                        <Typography sx={{ textAlign: 'center' }} pb={2} variant="h5">Iniciar sesión</Typography>
                        <Paper sx={{ padding: 3 }} elevation={3} >
                            <Stack sx={{ width: '17rem' }} spacing={2}>
                                <Typography>Correo</Typography>
                                <TextField id="outlined-basic" label="Outlined" variant="outlined" />

                                <Typography>Contraseña</Typography>
                                <TextField id="outlined-basic" label="Outlined" variant="outlined" />
                                <Button variant="contained">Iniciar sesión</Button>
                            </Stack>
                        </Paper>
                    </div>
                </Stack>

            </Container>
        </>
    )
}