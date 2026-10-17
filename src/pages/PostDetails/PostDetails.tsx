import { Link, useParams } from "react-router"
import PostCard from "../../features/posts/components/PostCard/PostCard"
import LoadingSpinner from "../../Components/ui/LoadingSpinner/LoadingSpinner"
import AppButton from "../../SharedComponents/AppButton/AppButton"
import { ArrowLeft } from "iconsax-reactjs"
import { usePost } from "../../features/posts/posts.hooks"

export default function PostDetails() {
  const { id } = useParams<{ id: string }>()
  const { data: post, isPending, isError } = usePost(id!);

  return (
    <div className="mx-auto mt-2 flex w-full max-w-3xl flex-col gap-4 px-3">
      <Link to="/feed"><AppButton className='bg-main-color pointer-events-none  hover:bg-main-color/80'><ArrowLeft
        size="32"
      /> Back</AppButton></Link>
      {isPending ? <LoadingSpinner /> : isError || !post ? (
  <p className="text-center text-red-500">Post not found</p>
) : (
  <PostCard post={post} postDetails />
)}
    </div>
  )
}
