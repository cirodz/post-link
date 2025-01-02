import { Avatar, Button, IconButton, Input, ListItemAvatar, styled, TextField } from '@mui/material'
import { useStorePosts } from '../context/useStorePosts';
import { PostEntity } from '../types/types';
import { useState } from 'react';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { useSessionStore } from '../context/useStore';
import ImageIcon from '@mui/icons-material/Image';
import ShowErrors from './ShowErrors';
import ShowImage from './ShowImage';
import { validatePostData } from '../utils/utils';
import { useLoadImage } from '../hooks/useLoadImage';


const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

const AddPost: React.FC = () => {

    const AddPost = useStorePosts(state => state.AddPost);
    const UserInfo = useSessionStore(state => state.user);

    const [fechaCreacion, setfechaCreacion] = useState<Dayjs | null>(dayjs(new Date()));
    const [fechaPublicacion, setfechaPublicacion] = useState<Dayjs | null>(dayjs(new Date()));
    const [postData, setpostData] = useState<PostEntity>({ contador_likes: 0 })

    const [postDataErrors, setpostDataErrors] = useState<Record<string, string>>({});

    const handleAddPost = (e: any) => {

        const newPostData = {
            contador_likes: 0,
            autor: 2,
            fecha_creacion: fechaCreacion?.toDate() ?? new Date(),
            fecha_publicacion: fechaPublicacion?.toDate() ?? new Date(),
            foto: postData.foto ? postData.foto as string : null,
            descripcion: postData.descripcion,
            titulo: postData.titulo,
        };
        const errors = validatePostData(newPostData);
        if (Object.keys(errors).length > 0) {
            console.log("Errores de validación:", errors);
            setpostDataErrors(errors);
            return;
        }
        AddPost(newPostData);

        resetValues();
    }

    const resetValues = () => {
        setpostData({ contador_likes: 0 });
        setpostDataErrors({});
        setfechaCreacion(dayjs(new Date()));
        setfechaPublicacion(dayjs(new Date()));

    }

    const handleChangeTextField = (e: any) => {
        setpostDataErrors({});
        setpostData({ ...postData, [e.target.name]: e.target.value });
    }

    const handleChangeDatePublicacion = (newValue: any) => {
        console.log("Fecha de publicación:", newValue.toDate());
        setfechaPublicacion(newValue)
    }

    const handleChangeDateCreacion = (newValue: any) => {
        console.log("Fecha de creación:", newValue.toDate());
        setfechaCreacion(newValue)
    }
    const handleClearImage = () => {
        setpostData({ ...postData, foto: null });
    }

    const handleImage = async (e: any) => {
        setpostData({ ...postData, foto: await useLoadImage(e) });
    }

    return (
        <div style={{ backgroundColor: 'white', display: 'flex', flexDirection: 'column', width: '100%', padding: '16px', borderBottom: '1px solid #e0e0e0', }}>
            <div style={{ display: 'flex', width: '100%' }}>
                <ListItemAvatar>
                    <Avatar alt="sd" src='sadas' />
                </ListItemAvatar>

                <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                    <Input
                        error={!!postDataErrors.descripcion}
                        required={true}
                        placeholder='Titulo'
                        name="titulo"
                        value={postData?.titulo ?? ''}
                        onChange={handleChangeTextField}
                    />
                    <TextField
                        error={!!postDataErrors.descripcion}
                        variant='standard'
                        name="descripcion"
                        value={postData?.descripcion ?? ''}
                        onChange={handleChangeTextField}
                        multiline rows={5}
                        fullWidth placeholder='Que estas pensando?' />

                </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'start', gap: 30, marginTop: '1rem', width: '100%' }}>
                <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'row', gap: 30 }}>
                    <DatePicker
                        label="seleccionar fecha de creación"
                        value={fechaCreacion}
                        defaultValue={dayjs(new Date())}
                        onChange={handleChangeDateCreacion}
                    />
                    <DatePicker
                        label="Seleccionar fecha de publicación"
                        defaultValue={dayjs(new Date())}
                        value={fechaPublicacion}
                        onChange={handleChangeDatePublicacion}
                    />

                </div>
                <div style={{ display: 'flex' }}>
                    <Button
                        component="label"
                        tabIndex={-1}
                        startIcon={<ImageIcon />}
                        color='inherit'
                    >
                        Cargar Imagen
                        <VisuallyHiddenInput
                            type="file"
                            onChange={handleImage}
                            multiple
                        />
                    </Button>
                </div>
            </div>
            {
                postData.foto && <ShowImage handleClearImage={handleClearImage} image={postData.foto as string} />
            }
            {
                postDataErrors && Object.keys(postDataErrors).length > 0 && <ShowErrors errorsList={postDataErrors} />
            }

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
                <Button onClick={handleAddPost} variant='contained' fullWidth>Postear</Button>
            </div>

        </div>
    );
}

export default AddPost;
