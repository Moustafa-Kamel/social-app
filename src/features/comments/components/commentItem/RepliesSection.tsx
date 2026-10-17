import toast from "react-hot-toast";
import { useCreateReply, useReplies } from "../../comments.hooks";
import CommentInput from "../CommentInput";
import CommentItem from "./CommentItem";
import { getErrorMessage } from "../../../../utils/getErrorMessage";

type Props = { postId: string; commentId: string; showInput: boolean };
export default function RepliesSection({ postId, commentId, showInput }: Props) {
  const { data, isPending, isError, hasNextPage, fetchNextPage, isFetchingNextPage } = useReplies(postId, commentId);
  const { mutate, isPending: isSubmitting } = useCreateReply(postId, commentId);
const replies = data?.pages.flatMap((p) => p.data.replies) ?? [];

  return (
    <div className='relative mt-2 ml-5 pl-4'>
      <span className="absolute bottom-10 left-0 top-1 w-px rounded-full bg-slate-300"></span>
       {isPending ? (
        <p className="text-xs text-slate-500">Loading replies...</p>
      ) : isError ? (
        <p className="text-xs text-red-500">Failed to load replies</p>
      ) : (
        replies.map((r) => (
          <CommentItem key={r?._id} comment={r} postId={postId} parentId={commentId} />
        ))  
      )}
      {hasNextPage && (
  <button
    onClick={() => fetchNextPage()}
    disabled={isFetchingNextPage}
    className="mt-2 text-xs font-bold text-[#1877f2] hover:underline disabled:opacity-50"
  >
    {isFetchingNextPage ? "Loading..." : "Load more replies"}
  </button>
)}
      {showInput && (
        <CommentInput
          autoFocus
          placeholder="Write a reply..."
          isPending={isSubmitting}
          onSubmit={(d, reset) =>
            mutate(
              { body: d.body, file: d.file ?? undefined },
              { onSuccess: reset, onError: (e) => toast.error(getErrorMessage(e)) }
            )
          }
        />
      )}
    </div>
  )
}
