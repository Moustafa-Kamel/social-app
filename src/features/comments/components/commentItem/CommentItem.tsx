import { Avatar } from "@heroui/react";
import type { Comment } from "../../comments.types";
import CommentBubble from "./CommentBubble";
import { Link } from "react-router";
import CommentActions from "./CommentActions";
import { useContext, useState } from "react";
import { UserAuthContext } from "../../../../app/providers/UserAuthProvider/UserAuthContext";
import { useDeleteComment, useLikeComment, useUpdateComment } from "../../comments.hooks";
import toast from "react-hot-toast";
import RepliesSection from "./RepliesSection";
import { getErrorMessage } from "../../../../utils/getErrorMessage";
type Props = { comment: Comment; postId: string; parentId?: string };
export default function CommentItem({ comment, postId, parentId }: Props) {

  const { userData } = useContext(UserAuthContext);
  const [showReplies, setShowReplies] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const isOwner = userData?._id === comment.commentCreator._id;
  const isReply = !!parentId;
  const isLiked = !!userData && comment.likes.includes(userData._id);
  // !! علشان اجيب البوليان فاليو // true ? ["replies", parentId] : ["comments", postId]
  // const repliesOpen = showReplies || isReplying;

  const like = useLikeComment(postId, parentId);
  const update = useUpdateComment(postId, parentId);
  const remove = useDeleteComment(postId, parentId);

  const handleLike = () => like.mutate({ postId, commentId: comment._id });
  
  const handleDelete = () => {
    if (!window.confirm("Delete this comment?")) return;
    remove.mutate(
      { postId, commentId: comment._id },
      { onError: (e) => toast.error(getErrorMessage(e)) }
    )
  }
  const handleUpdate = (content: string) => {
    update.mutate(
      { postId, commentId: comment._id, body: content },
      {
        onSuccess: () => setIsEditing(false),
        onError: (e) => toast.error(getErrorMessage(e))
      }
    )
  }
  const handleReplyClick = () => {
    setShowReplies(true);
    setIsReplying(true);
  }

  const toggleReplies = () => {
    setShowReplies((v) => !v);
    setIsReplying(false);
  }

  return (
    <div className="relative flex items-start gap-2">
      {/* Avatar */}
      <Link to={`/profile/${comment.commentCreator._id}`} className="shrink-0">
        <Avatar className="mt-0.5 h-8 w-8">
          <Avatar.Image alt={comment.commentCreator.name} src={comment.commentCreator.photo} />
          <Avatar.Fallback>U</Avatar.Fallback>
        </Avatar>
      </Link>
      <div className="min-w-0 flex-1 ">
        {/* Bubble */}
        <CommentBubble
        key={`${comment._id}-${comment.content}`}
          comment={comment}
          onCancel={() => setIsEditing(false)}
          isEditing={isEditing}
          isSaving={update.isPending}
          onSave={handleUpdate} />

        {/* Actions */}
        {!isEditing &&
          <CommentActions comment={comment}
            isLiked={isLiked}
            isOwner={isOwner}
            onLike={handleLike}
            onReply={isReply ? undefined : handleReplyClick}
            onEdit={() => setIsEditing(true)}
            onDelete={handleDelete}
          />

        }
        {!isReply && comment.repliesCount > 0 && (
          <button
            onClick={toggleReplies}
            className="mt-1 px-1 text-xs font-bold text-[#1877f2] hover:underline"
          >
            {showReplies ? "Hide replies" : `View replies (${comment.repliesCount})`}
          </button>
        )}

        {!isReply && showReplies && (
          <RepliesSection postId={postId} commentId={comment._id} showInput={isReplying} />
        )}
      </div>
    </div>
  )
}
