import { useContext, useState } from "react";
import CommentsSection from "../../../comments/components/CommentsSection";
import type { Post } from "../../posts.types";
import PostHeader from "./PostHeader";
import PostMedia from "./PostMedia";
import PostStats from "./PostStats";
import PostActions from "./PostActions";
import TopComment from "./TopComment";
import { UserAuthContext } from "../../../../app/providers/UserAuthProvider/UserAuthContext";
import { useBookmarkPost, useDeletePost, useLikePost, useSharePost, useUpdatePost } from "../../posts.hooks";
import { DeletePostAlert } from "../../../../utils/DeletePostAlert";
import { useNavigate } from "react-router";
import SharedPost from "./SharedPost";

export default function PostCard({ post, postDetails }: { post: Post; postDetails?: boolean }) {
  const navigate = useNavigate();

  const { userData } = useContext(UserAuthContext);
  const [showComments, setShowComments] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const like = useLikePost();
  const share = useSharePost();
  const bookmark = useBookmarkPost();
  const deletePost = useDeletePost();
  const update = useUpdatePost();

  const isLiked = !!userData && !!post.likes?.some((id) => String(id) === userData._id);
  const isBookmarked = post.bookmarked ?? false;

  const handleDelete = () => {
    deletePost.mutate(post._id, {
      onSuccess: () => {
        if (postDetails) navigate("/feed");
      },
    });
    setDeleteOpen(false);
  };

  const handleUpdate = (body: string) => {
    update.mutate(
      { postId: post._id, body: body },
      {
        onSuccess: () => setIsEditing(false),
      },
    )
  };

  return (
    <article className="overflow-visible rounded-xl border border-slate-200 bg-white shadow-2xl">
      {/* Header */}
      <PostHeader
        key={`${post._id}-${post.body}`}
        onDeletePost={() => setDeleteOpen(true)}
        isBookmarked={isBookmarked}
        onBookMarkClick={() => bookmark.mutate(post._id)}
        post={post}
        onEdit={() => setIsEditing((v) => !v)}
        onCancel={() => setIsEditing(false)}
        isEditing={isEditing}
        isSaving={update.isPending}
        onSave={handleUpdate}
      />
      {post.isShare && <SharedPost shared={post.sharedPost ?? null}/>}
      {/* Image */}
      {post.image && <PostMedia image={post.image} />}

      {/* Stats */}
      <PostStats post={post} showDetailsLink={!postDetails} />

      {/* Divider */}
      <div className="mx-4 border-t border-slate-200" />

      {/* Actions */}
      <PostActions onCommentClick={() => !postDetails && setShowComments((v) => !v)}
        onLikeClick={() => like.mutate(post._id)}
        isLiked={isLiked}
        isLiking={like.isPending}
        onClickShare={() => share.mutate({ postId: post._id})}


      />
      {/*{TopComment}*/}
      {!postDetails && !showComments && post.topComment && (
        <TopComment comment={post.topComment} onViewAll={() => setShowComments(true)} />
      )}
      {(postDetails || showComments) && <CommentsSection postId={post._id} />}

      <DeletePostAlert
        isOpen={deleteOpen}
        onOpenChange={setDeleteOpen}
        onConfirm={handleDelete}
      />
    </article>


  );
}