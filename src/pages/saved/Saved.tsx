import PostsList from "../../features/posts/components/PostsList";
import { getBookmarks } from "../../features/posts/posts.api";

export default function Saved() {
  return (
    <PostsList queryKey="saved" fetcher={getBookmarks} paginate={false} emptyMessage="No saved posts yet." />

  )
}
