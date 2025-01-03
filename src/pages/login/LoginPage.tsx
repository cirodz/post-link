import { Button, Container, Input, Paper, Stack, Typography } from "@mui/material"
import { useState } from "react"
import { useSessionStore } from "../../context/useStore"
import { LoginData } from "../../types/types";
import { useNavigate } from "react-router";



export const LoginPage = () => {

    let navigate = useNavigate();

    const login = useSessionStore(state => state.login);

    const [error, seterror] = useState<boolean>(false)
    const [dataForm, setDataForm] = useState<LoginData>(
        {
            correo: '',
            contrasena: ''
        }
    )

    const handleChange = (e: any) => {
        seterror(false)
        setDataForm({
            ...dataForm,
            [e.target.name]: e.target.value
        })
    }

    const handleSumbit = async (e: any) => {
        e.preventDefault()
        if (dataForm.correo === '' || dataForm.contrasena === '') return alert('Llena todos los campos')
        const doLogin = await login({ contrasena: dataForm.contrasena, correo: dataForm.correo });
        if (!doLogin) {
            seterror(true)
        } else {
            navigate("/");
        }
    }
    return (
        <>
            <Container sx={{
                marginTop: {
                    xs: '3rem',
                    lg: '16rem'
                }
            }}>
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
                                <Typography><b>Correo</b></Typography>
                                <Input required={true} error={error} id="email" type="email" onChange={handleChange} name="correo" value={dataForm.correo} />

                                <Typography><b>Contraseña</b></Typography>
                                <Input required={true} error={error} type="password" onChange={handleChange} name="contrasena" value={dataForm.contrasena} />
                                {
                                    error && <Typography sx={{ textAlign: 'center' }} color='error'>Correo o contraseña incorrectos</Typography>
                                }
                                <Button onClick={handleSumbit} variant="contained">Iniciar sesión</Button>
                            </Stack>
                        </Paper>
                    </div>
                </Stack>

            </Container>
        </>
    )
}