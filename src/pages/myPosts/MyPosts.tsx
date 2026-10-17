import { useContext } from "react";
import { UserAuthContext } from "../../app/providers/UserAuthProvider/UserAuthContext";
import LoadingSpinner from "../../Components/ui/LoadingSpinner/LoadingSpinner";
import CreatePost from "../../features/posts/components/CreatePost";
import PostsList from "../../features/posts/components/PostsList";
import { getUserPosts } from "../../features/posts/posts.api";
// import PostsList from "../../features/posts/components/PostsList";

export default function MyPosts() {
  const { userData } = useContext(UserAuthContext);
  if (!userData) return <LoadingSpinner />;
  return (
    <>
 <CreatePost />
      <PostsList
        key={userData._id}
        queryKey={`user-${userData._id}`}
        fetcher={(page) => getUserPosts(userData._id, page)}
        emptyMessage="You haven't posted yet."
      />
    </>
  )
}
