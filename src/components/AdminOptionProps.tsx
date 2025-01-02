import { IconButton, Modal } from "@mui/material"
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useStorePosts } from '../context/useStorePosts';
import { PostEntity, PostWithoutAutor } from "../types/types";
import FormEditPost from "./FormEditPost";
import { useState } from "react";


interface AdminOptionProps {
    PostProps: PostEntity;
}

const AdminOptions: React.FC<AdminOptionProps> = (AdminOptionProps) => {

    const deletePost = useStorePosts(state => state.DeletePost);
    const editPost = useStorePosts(state => state.EditPost);

    const handleDeletePost = (postId: string) => {
        deletePost(postId);
    }

    const handleSave = (updatedPost: PostWithoutAutor) => {
        editPost(updatedPost);
    };

    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div style={{
            display: 'flex',
            alignItems: 'start'
        }}>
            <div style={{ display: 'flex', alignItems: "center", gap: 10 }}>
                <IconButton onClick={handleOpen}>
                    <EditIcon fontSize='small' />
                </IconButton>
                <IconButton onClick={() => (handleDeletePost(AdminOptionProps.PostProps.id as string))}>
                    <DeleteIcon fontSize='small' />
                </IconButton>
            </div>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <FormEditPost
                    onSave={handleSave}
                    PostEdit={{ ...AdminOptionProps.PostProps }}
                    closeModal={handleClose} ></FormEditPost>
            </Modal>
        </div>
    )
}

export default AdminOptions