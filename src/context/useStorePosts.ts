import { create } from "zustand";
import { type PostEntity } from "../types/types";
import { persist } from "zustand/middleware";

interface PostState {
  Posts: PostEntity[];
  AddPost: (post: PostEntity) => void;
  DeletePost: (id: string) => void;
  EditPost: (post: PostEntity) => void;
  likePost: (id: string) => void;
}
export const useStorePosts = create<PostState>()(
  persist(
    (set, get) => ({
      Posts: [],
      AddPost: (post: PostEntity) => {
        const PostsLocalState = get().Posts;
        const newPosts = structuredClone(PostsLocalState);

        let id = +new Date() + "-" + Math.floor(Math.random() * 1000);

        const newPost: PostEntity = { ...post, id: id };
        newPosts.push(newPost);
        set({ Posts: newPosts });
      },
      DeletePost: (id: string) => {
        const PostsLocalState = get().Posts;
        const newPosts = structuredClone(PostsLocalState);
        const updatedPosts = newPosts.filter((post) => post.id !== id);
        set({ Posts: updatedPosts });
      },

      EditPost: (post: PostEntity) => {
        const PostsLocalState = get().Posts;
        const newPosts = structuredClone(PostsLocalState);

        const updatedPosts = newPosts.map((p) => (p.id === post.id ? post : p));

        set({ Posts: updatedPosts });
      },
      likePost: (id: string) => {
        const PostsLocalState = get().Posts;
        const newPosts = structuredClone(PostsLocalState);
        const updatedPosts = newPosts.map((post) =>
          post.id === id
            ? {
                ...post,
                contador_likes: post.contador_likes + 1,
              }
            : post
        );
        set({ Posts: updatedPosts });
      },
    }),
    { name: "posts-list" }
  )
);
