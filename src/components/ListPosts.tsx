import { Stack, Typography } from "@mui/material"
import Post from "./Post"
import { useStorePosts } from "../context/useStorePosts";

const ListPosts = () => {

    const Posts = useStorePosts(state => state.Posts);

    return (
        <>
            {
                Posts.length !== 0 ? <Stack sx={{ bgcolor: 'background.paper' }}>
                    {
                        Posts.map((post) => {
                            return <>
                                <Post PostProps={post} key={post.id}></Post>
                            </>
                        })
                    }
                </Stack>

                    :
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '10vh' }}>
                        <Typography variant="h5">No hay posts</Typography>
                    </div>
            }

        </>
    )
}

export default ListPosts