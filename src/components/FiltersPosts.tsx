import { Box, Divider, InputAdornment, List, Stack, Switch, TextField, Typography } from '@mui/material'
import { useStorePosts } from '../context/useStorePosts'
import { useState } from 'react';
import Post from './Post';
import SearchIcon from '@mui/icons-material/Search';
import dayjs, { Dayjs } from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers';
import useFiltersPosts from '../hooks/useFiltersPosts';
const FiltersPosts: React.FC = () => {
    const [keyword, setKeyword] = useState('')
    const ListPosts = useStorePosts(state => state.Posts);

    const [fechaInicioFiltro, setfechaCreacion] = useState<Dayjs | null>(
        dayjs()
    );
    const [fechaFinFiltro, setfechaPublicacion] = useState<Dayjs | null>(
        dayjs()
    );
    const [fechaPublicacionInicio, setfechaPublicacionInicio] = useState<Dayjs | null>(
        dayjs()
    );
    const [fechaPublicacionFin, setfechaPublicacionFin] = useState<Dayjs | null>(
        dayjs()
    );

    const [FirstFilterOn, setFirstFilterOn] = useState<boolean>(false);
    const [SecondFilterOn, setSecondFilterOn] = useState<boolean>(false);
    const filteredPosts = useFiltersPosts({
        ListPosts,
        keyword: keyword,
        fechaInicioFiltro,
        fechaFinFiltro,
        fechaPublicacionInicio,
        fechaPublicacionFin,
        FirstFilterOn,
        SecondFilterOn,
    });

    const handleSearch = (e: any) => {
        setKeyword(e.target.value)
    }
    const handleFirstFilter = (event: any) => {
        setFirstFilterOn(event.target.checked);
    };
    const handleSecondFilter = (event: any) => {
        setSecondFilterOn(event.target.checked);
    };
    return (
        <Box>
            <div >
                <TextField
                    fullWidth
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        },
                    }}
                    onChange={handleSearch}
                    id="outlined-basic" label="Buscar post por autor, descripción o título" variant="outlined" />
                <div style={{ display: 'flex', gap: 10, justifyContent: 'center', alignItems: 'center', marginTop: '1rem' }}>
                    <Box >
                        <Typography>
                            Filtrar por fecha de creación
                            <Switch
                                checked={FirstFilterOn}
                                onChange={handleFirstFilter}
                                inputProps={{ 'aria-label': 'controlled' }}
                            />
                        </Typography>


                        <br />
                        <Box sx={{ gap: 1, display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
                            <DatePicker
                                label="Fecha de inicio de creación"
                                value={fechaInicioFiltro}
                                onChange={(newValue) => setfechaCreacion(newValue)}
                            />
                            <DatePicker
                                label="Fecha fin de creación"
                                value={fechaFinFiltro}
                                onChange={(newValue) => setfechaPublicacion(newValue)}
                            />
                        </Box>
                    </Box>
                    <Divider sx={{ marginLeft: 3, marginRight: 3 }} orientation="vertical" flexItem />
                    <Box >
                        <Typography>
                            Filtrar por fecha de publiación
                            <Switch
                                checked={SecondFilterOn}
                                onChange={handleSecondFilter}
                                inputProps={{ 'aria-label': 'controlled' }}
                            />
                        </Typography>
                        <br />
                        <Box sx={{ gap: 1, display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
                            <DatePicker
                                label="Fecha de inicio publicación"
                                value={fechaPublicacionInicio}
                                onChange={(newValue) => setfechaPublicacionInicio(newValue)}
                            />
                            <DatePicker
                                label="Fecha fin publicación"
                                value={fechaPublicacionFin}
                                onChange={(newValue) => setfechaPublicacionFin(newValue)}
                            />
                        </Box>
                    </Box>
                </div>
            </div>
            <List>
                {
                    filteredPosts.length !== 0 ? <Stack sx={{ bgcolor: 'background.paper' }} >
                        {
                            filteredPosts.map((post) => {
                                return <>
                                    <Post PostProps={post} key={post.id}></Post>
                                </>
                            })
                        }
                    </Stack>
                        :
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '10vh' }}>
                            <Typography variant="h5">No hay posts</Typography>
                        </div>
                }
            </List>
        </Box>
    )
}

export default FiltersPosts