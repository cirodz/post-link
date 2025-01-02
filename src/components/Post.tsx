import { PostWithoutAutor, type PostEntity } from '../types/types';
import { Avatar, Box, Button, Divider, Icon, IconButton, List, ListItem, ListItemAvatar, ListItemText, Modal, Paper, Typography } from '@mui/material'
import { Fragment, useEffect, useState } from 'react'
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import EditIcon from '@mui/icons-material/Edit';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FormEditPost from './FormEditPost';
import { useStorePosts } from '../context/useStorePosts';
import DeleteIcon from '@mui/icons-material/Delete';
export interface PostProps {
    PostProps: PostEntity;
}


const Post: React.FC<PostProps> = ({ PostProps }) => {

    const likePost = useStorePosts(state => state.likePost);
    const deletePost = useStorePosts(state => state.DeletePost);
    const editPost = useStorePosts(state => state.EditPost);

    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handleLikePost = (postId: string) => {
        likePost(postId);
    }

    const handleDeletePost = (postId: string) => {
        deletePost(postId);
    }

    const handleSave = (updatedPost: PostWithoutAutor) => {
        editPost(updatedPost);
    };

    return (
        <>
            <Paper square={true} elevation={0} style={{ display: 'flex', flexDirection: 'row', width: '100%', padding: '16px', borderBottom: '1px solid #e0e0e0', }}>
                <div style={{ display: 'flex', marginRight: '1rem' }}>
                    <Avatar alt="sd" src='sadas' />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                    <Typography
                        component="span"
                        variant="body2"
                        sx={{ color: 'text.primary', display: 'flex' }}
                    >
                        <b >
                            Ciro
                        </b>
                    </Typography>
                    <div >
                        <Typography
                            component="span"
                            variant="body2"
                            sx={{ color: 'text.primary', display: 'inline' }}
                        >
                            <b>
                                {PostProps.titulo}
                            </b>
                        </Typography>
                    </div>
                    <Fragment>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>

                            <Typography component="span"
                                variant="body2"
                                color='text.primary'>
                                {PostProps.descripcion}
                            </Typography>
                            {PostProps.foto && (
                                <div style={{ position: 'relative', display: 'inline-block', width: '50%' }}>
                                    <img
                                        src={PostProps.foto}
                                        alt="Vista previa"
                                        max-width='1920px'
                                        max-height='1080px'
                                        style={{ width: '100%', height: 'auto', display: 'block' }}
                                    />

                                </div>
                            )}

                        </div>
                        <br></br>
                        <div style={{ display: 'flex', gap: 10 }}>
                            <Typography style={{ color: '#929292', fontSize: '13px' }} >
                                Fecha de creación: {new Date(PostProps.fecha_creacion as Date).toDateString()}
                            </Typography>
                            <span>·</span>
                            <Typography style={{ color: '#929292', fontSize: '13px' }} >
                                Fecha de publicación: {new Date(PostProps.fecha_publicacion as Date).toDateString()}
                            </Typography>
                        </div>

                    </Fragment>
                </div>
                <div style={{
                    display: 'flex',
                    alignItems: 'start'
                }}>
                    <div style={{ display: 'flex', alignItems: "center", gap: 10 }}>
                        {
                            PostProps.contador_likes > 0 ?
                                <IconButton onClick={() => (handleLikePost(PostProps.id as string))} sx={{ border: 'none' }} aria-label="like" size="small">
                                    <FavoriteIcon sx={{ color: 'red' }} fontSize='small' />
                                </IconButton>
                                :
                                <IconButton onClick={() => (handleLikePost(PostProps.id as string))} sx={{ border: 'none' }} aria-label="like" size="small">
                                    <FavoriteBorderRoundedIcon fontSize='small' />
                                </IconButton>
                        }
                        <span style={{ fontSize: '15px', color: '#929292', marginLeft: '5px' }}>
                            {PostProps.contador_likes}
                        </span>
                        <IconButton onClick={handleOpen}>
                            <EditIcon fontSize='small' />
                        </IconButton>
                        <IconButton onClick={() => (handleDeletePost(PostProps.id as string))}>
                            <DeleteIcon fontSize='small' />
                        </IconButton>
                    </div>
                </div>

                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="child-modal-title"
                    aria-describedby="child-modal-description"
                >
                    <FormEditPost
                        onSave={handleSave}
                        PostEdit={{ ...PostProps }}
                        closeModal={handleClose} ></FormEditPost>
                </Modal>
            </Paper >

        </ >
    );
}

export default Post;
