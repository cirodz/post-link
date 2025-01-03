
import React, { useState } from "react";
import { Box, TextField, Button, Stack, Input, styled } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { PostEntity } from "../types/types";
import ShowImage from "./ShowImage";
import { useLoadImage } from "../hooks/useLoadImage";
import { validatePostData } from "../utils/utils";
import ShowErrors from "./ShowErrors";
import ImageIcon from '@mui/icons-material/Image';

interface FormEditProps {
    PostEdit: PostEntity
    closeModal: () => void;
    onSave: (updatedPost: any) => void;
}
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

const FormEditPost: React.FC<FormEditProps> = (props) => {
    const [fechaCreacion, setfechaCreacion] = useState<Dayjs | null>(
        dayjs(props.PostEdit.fecha_creacion)
    );
    const [fechaPublicacion, setfechaPublicacion] = useState<Dayjs | null>(
        dayjs(props.PostEdit.fecha_publicacion)
    );
    const [postDataErrors, setpostDataErrors] = useState<Record<string, string>>({});

    const [postEdit, setPostEdit] = useState<PostEntity>({
        id: props.PostEdit.id,
        titulo: props.PostEdit.titulo,
        descripcion: props.PostEdit.descripcion,
        foto: props.PostEdit.foto,
        autor: props.PostEdit.autor,
        fecha_creacion: props.PostEdit.fecha_creacion,
        fecha_publicacion: props.PostEdit.fecha_publicacion,
        contador_likes: props.PostEdit.contador_likes,
    });

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        const parsedValue = name === 'contador_likes' ? parseInt(value, 10) || 0 : value;
        setpostDataErrors({});
        setPostEdit((post) => ({
            ...post,
            [name]: parsedValue,
        }));
    };

    const handleSave = () => {
        const updatedPost = {
            ...postEdit,
            fecha_creacion: fechaCreacion?.toDate(),
            fecha_publicacion: fechaPublicacion?.toDate(),
        };
        const errors = validatePostData(updatedPost);
        if (Object.keys(errors).length > 0) {
            setpostDataErrors(errors);
            return;
        }
        props.onSave(updatedPost);
        props.closeModal();
    };
    const handleClearImage = () => {
        setPostEdit({
            ...postEdit,
            foto: null,
        })
    }
    const handleChangeImage = async (e: any) => {
        let image = await useLoadImage(e);
        setPostEdit({
            ...postEdit,
            foto: image,
        });
    }

    return (
        <>
            <Box >
                <h2 id="child-modal-title">Editar publicación</h2>

                <Stack spacing={2}>
                    <TextField
                        value={postEdit.id}
                        label="Identificador"
                        variant="standard"
                        disabled
                    />

                    <TextField
                        value={postEdit.titulo}
                        label="Titulo"
                        variant="standard"
                        name="titulo"
                        onChange={(e) => handleInputChange(e)}
                    />
                    <TextField
                        value={postEdit.descripcion}
                        label="Descripcion"
                        variant="standard"
                        name="descripcion"
                        onChange={(e) => handleInputChange(e)}
                    />
                    <DatePicker
                        label="Editar fecha de creación"
                        value={fechaCreacion}
                        onChange={(newValue) => setfechaCreacion(newValue)}
                    />
                    <DatePicker
                        label="Editar fecha de publicación"
                        value={fechaPublicacion}
                        onChange={(newValue) => setfechaPublicacion(newValue)}
                    />
                    {
                        postEdit.foto ? <ShowImage handleChangeImage={handleChangeImage} handleClearImage={handleClearImage} image={postEdit.foto ?? ''} />
                            :
                            <>
                                <Button
                                    variant="outlined"
                                    component="label"
                                    tabIndex={-1}
                                    color='inherit'
                                >
                                    <ImageIcon />
                                    Agregar imagen
                                    <VisuallyHiddenInput
                                        type="file"
                                        onChange={handleChangeImage}
                                        multiple
                                    />
                                </Button>
                            </>
                    }

                    <Input
                        value={postEdit.contador_likes}
                        name="contador_likes"
                        type="number"
                        onChange={(e) => handleInputChange(e)}
                    />
                    <div style={{ display: "flex", justifyContent: "space-between", gap: 20 }}>
                        <Button
                            sx={{ width: "100%" }}
                            variant="contained"
                            onClick={props.closeModal}
                        >
                            Cerrar
                        </Button>
                        <Button
                            sx={{ width: "100%" }}
                            variant="outlined"
                            onClick={handleSave}
                        >
                            Guardar
                        </Button>
                    </div>
                </Stack>
                {
                    postDataErrors && Object.keys(postDataErrors).length > 0 && <ShowErrors errorsList={postDataErrors} />
                }
            </Box>
        </>
    );
};

export default FormEditPost;
