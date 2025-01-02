
import React, { useState } from "react";
import { Box, TextField, Button, Stack } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { PostWithoutAutor } from "../types/types";
import ShowImage from "./ShowImage";
import { useLoadImage } from "../hooks/useLoadImage";

interface FormEditProps {
    PostEdit: PostWithoutAutor
    closeModal: () => void;
    onSave: (updatedPost: any) => void;
}
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};

const FormEditPost: React.FC<FormEditProps> = (props) => {
    const [fechaCreacion, setfechaCreacion] = useState<Dayjs | null>(
        dayjs(props.PostEdit.fecha_creacion)
    );
    const [fechaPublicacion, setfechaPublicacion] = useState<Dayjs | null>(
        dayjs(props.PostEdit.fecha_publicacion)
    );

    const [postEdit, setPostEdit] = useState({
        id: props.PostEdit.id,
        titulo: props.PostEdit.titulo,
        descripcion: props.PostEdit.descripcion,
        foto: props.PostEdit.foto,
        contador_likes: props.PostEdit.contador_likes,
    });

    const handleInputChange = (e: any) => {
        let value = e.target.value;

        if (e.target.name === 'contador_likes') {
            value = parseInt(value, 10);
            setPostEdit(
                {
                    ...postEdit,
                    contador_likes: value,
                }
            );
            return;
        }

        setPostEdit((post) => ({
            ...post,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSave = () => {
        const updatedPost = {
            ...postEdit,
            fecha_creacion: fechaCreacion?.toDate(),
            fecha_publicacion: fechaPublicacion?.toDate(),
        };
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
            <Box sx={style}>
                <h2 id="child-modal-title">Editar publicación</h2>

                <Stack spacing={4}>
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

                    <ShowImage handleChangeImage={handleChangeImage} handleClearImage={handleClearImage} image={postEdit.foto ?? ''} />

                    <TextField
                        value={postEdit.contador_likes}
                        label="likes"
                        variant="standard"
                        name="contador_likes"
                        type="number"
                        onChange={(e) =>handleInputChange(e)}
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
            </Box>
        </>
    );
};

export default FormEditPost;
