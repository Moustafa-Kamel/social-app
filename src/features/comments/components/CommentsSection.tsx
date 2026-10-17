import CommentItem from "./commentItem/CommentItem";
import CommentInput from "../../../features/comments/components/CommentInput";
import { useComments, useCreateComment } from "../comments.hooks";
import toast from "react-hot-toast";


export default function CommentsSection({ postId }: { postId: string }) {
  const {data, isPending: isLoading, isError, hasNextPage, fetchNextPage, isFetchingNextPage  } = useComments(postId);
  const { mutate, isPending: isSubmitting } = useCreateComment(postId);
  
  const comments = data?.pages.flatMap((p) => p.data.comments) ?? [];
  return (

    <div className="border-t border-slate-200 bg-[#f7f8fa] px-4 py-4">
      <div className="space-y-2">
        {isLoading ? (
          <p className="text-sm text-slate-500">Loading...</p>
        ) : isError ? (
          <p className="text-sm text-red-500">Failed to load comments</p>
        ) : comments.length === 0 ? (
          <p className="text-sm text-slate-500">No comments yet. Be the first!</p>
        ) : (
          comments.map((c) => <CommentItem postId={postId} key={c._id} comment={c} />)
          
        )}
        {hasNextPage && (
  <button
    onClick={() => fetchNextPage()}
    disabled={isFetchingNextPage}
    className="mt-2 text-xs font-bold text-[#1877f2] hover:underline disabled:opacity-50"
  >
    {isFetchingNextPage ? "Loading..." : "Load more comments"}
  </button>
)}
      </div>

        <CommentInput
          isPending={isSubmitting}
          onSubmit={(data, reset) =>
            mutate(
              { postId, body: data.body, file: data.file ?? undefined },
              {
                onSuccess: reset,
                onError: () => toast.error("Failed to add comment"),
              }
            )
          }
        />
    </div>

  )


}
