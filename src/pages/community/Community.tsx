import CreatePost from "../../features/posts/components/CreatePost";
import PostsList from "../../features/posts/components/PostsList";
import { getAllPosts } from "../../features/posts/posts.api";

export default function Community() {
  return (
    <>
    <CreatePost />
    <PostsList queryKey="community" fetcher={getAllPosts}/>    
    </>
  )
}
