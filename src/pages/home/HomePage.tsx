import AddPost from '../../components/AddPost';
import ListPosts from '../../components/ListPosts';
import { Typography } from '@mui/material';
import { useSessionStore } from '../../context/useStore';

const HomePage: React.FC = () => {

  const user = useSessionStore(state => state.user);

  return (
    <div style={{ marginTop: '2rem' }}>
      {
        user && <AddPost />
      }
      <Typography sx={{ fontSize: 32, marginTop: 3, marginBottom: 3 }} ><b>Últimas publicaciones</b> </Typography>
      <ListPosts />
    </div>
  );
}

export default HomePage;