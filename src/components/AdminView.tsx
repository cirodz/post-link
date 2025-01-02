import { Avatar, Divider, ListItem, ListItemAvatar, ListItemText, TextField, Typography } from '@mui/material'
import ListPosts from './ListPosts';
import { Height } from '@mui/icons-material';
import AddPost from './AddPost';

const AdminView: React.FC = () => {


    return (
        <>
            <AddPost />
            <ListPosts />
        </>
    );
}

export default AdminView;
