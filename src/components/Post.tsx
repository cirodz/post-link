import { type PostEntity } from '../types/types';
import { Avatar, Paper, Typography } from '@mui/material'
import { Fragment } from 'react'
import AdminOptions from './AdminOptionProps';
import { useSessionStore } from '../context/useStore';
import LikePost from './LikePost';
import { useStorePosts } from '../context/useStorePosts';

export interface PostProps {
    PostProps: PostEntity;
}

const Post: React.FC<PostProps> = ({ PostProps }) => {

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
                        <></>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                            <LikePost contador_likes={PostProps.contador_likes} postId={PostProps.id as string} />
                            <AdminOptions PostProps={PostProps} ></AdminOptions>
                        </div>
                    </Fragment>
                </div>
            </Paper >

        </ >
    );
}

export default Post;
