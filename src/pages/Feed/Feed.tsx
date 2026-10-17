import CreatePost from "../../features/posts/components/CreatePost";
import PostsList from "../../features/posts/components/PostsList";
import { getHomeFeed } from "../../features/posts/posts.api";

export default function Feed() {

  return (
  < >
  <CreatePost/>
    <PostsList queryKey="home" fetcher={getHomeFeed}/>;
  </>
  )
}
