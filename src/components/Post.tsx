import { type PostEntity } from '../types/types';
import { Avatar, Box, Paper, Typography } from '@mui/material'
import { Fragment } from 'react'
import AdminOptions from './AdminOptionProps';
import { useSessionStore } from '../context/useStore';
import LikePost from './LikePost';

export interface PostProps {
    PostProps: PostEntity;
}

const Post: React.FC<PostProps> = ({ PostProps }) => {

    const UserInfo = useSessionStore(state => state.user);

    return (
        <>
            <Paper square={true} elevation={0} style={{ display: 'flex', flexDirection: 'row', padding: '16px', borderBottom: '1px solid #e0e0e0', }}>
                <div style={{ display: 'flex', marginRight: '1rem' }}>
                    <Avatar alt={PostProps.autor} src='notloadimage' />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                    <Typography
                        component="span"
                        variant="body2"
                        sx={{ color: 'text.primary', display: 'flex' }}
                    >
                        <b >
                            {PostProps.autor}
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
                        <Box sx={{ display: 'flex', gap: 3, flexDirection: { xs: 'column', md: 'row' } }}>
                            <Typography style={{ color: '#929292', fontSize: '13px' }} >
                                Fecha de creación: {PostProps.fecha_creacion
                                    ? new Date(PostProps.fecha_creacion).toLocaleDateString('es-ES', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                    })
                                    : 'Fecha no disponible'}
                            </Typography>

                            <Typography style={{ color: '#929292', fontSize: '13px' }} >
                                Fecha de publicación: {PostProps.fecha_publicacion
                                    ? new Date(PostProps.fecha_publicacion).toLocaleDateString('es-ES', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                    })
                                    : 'Fecha no disponible'}

                            </Typography>
                        </Box>
                        <></>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                            <LikePost contador_likes={PostProps.contador_likes} postId={PostProps.id as string} />
                            {
                                UserInfo && <AdminOptions PostProps={PostProps} ></AdminOptions>
                            }
                        </div>
                    </Fragment>
                </div>
            </Paper >

        </ >
    );
}

export default Post;
