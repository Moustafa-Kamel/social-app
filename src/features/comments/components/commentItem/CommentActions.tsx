import { formatPostTime } from "../../../../utils/formatPostTime";
import type { Comment } from "../../comments.types";

type Props = {
    comment: Comment;
    isLiked: boolean;
    isOwner: boolean;
    onLike: () => void;
    onReply?: () => void; // مش بيتبعت للردود
    onEdit: () => void;
    onDelete: () => void;
};
export default function CommentActions({ comment, isLiked, isOwner, onLike, onReply, onEdit, onDelete }: Props) {
    return (

        <div className="mt-1.5 flex items-center gap-4 px-1">
            <span className="text-xs font-semibold text-slate-400">
                {formatPostTime(comment.createdAt)}
            </span>
            <button onClick={onLike} className={`text-xs font-semibold hover:underline ${isLiked ? "text-[#1877f2]" : "text-slate-500"}`}>

                Like ({comment.likes.length})
            </button>
            {onReply &&
                <button onClick={onReply} className="text-xs font-semibold text-slate-500 transition hover:text-[#1877f2] hover:underline">
                    Reply
                </button>
            }
            {isOwner &&
                <>
                    <button onClick={onEdit} className="text-xs font-semibold text-slate-500 hover:underline">
                        Edit
                    </button>
                    <button onClick={onDelete} className="text-xs font-semibold text-red-500 hover:underline">
                        Delete
                    </button>
                </>
            }
        </div>
    )
}
