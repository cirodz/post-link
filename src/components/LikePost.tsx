import { IconButton } from "@mui/material"
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import { useStorePosts } from "../context/useStorePosts";

interface LikePostProps {
    postId: string;
    contador_likes: number;
}

const LikePost: React.FC<LikePostProps> = ({ postId, contador_likes }) => {

    const likePost = useStorePosts(state => state.likePost);
    const handleLikePost = (postId: string) => {
        likePost(postId);
    }

    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            {
                contador_likes > 0 ?
                    <IconButton onClick={() => (handleLikePost(postId as string))} sx={{ border: 'none' }} aria-label="like" size="small">
                        <FavoriteIcon sx={{ color: 'red' }} fontSize='small' />
                    </IconButton>
                    :
                    <IconButton onClick={() => (handleLikePost(postId as string))} sx={{ border: 'none' }} aria-label="like" size="small">
                        <FavoriteBorderRoundedIcon fontSize='small' />
                    </IconButton>   
            }
            <span style={{ fontSize: '15px', color: '#929292', marginLeft: '5px' }}>
                {contador_likes}
            </span>
        </div>
    )
}

export default LikePost