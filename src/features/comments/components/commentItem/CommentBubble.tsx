import { useState } from "react";
import { formatPostTime } from "../../../../utils/formatPostTime";
import type { Comment } from "../../comments.types";
type Props = {
  comment: Comment;
  isEditing: boolean;
  isSaving: boolean;
  onSave: (content: string) => void;
  onCancel: () => void;
};
export default function CommentBubble({ comment, isEditing, isSaving, onSave, onCancel }: Props) {
  const [text, setText] = useState(comment.content);
  const handleCancel = () => {
    setText(comment.content);
    onCancel();
  };
  
  if (isEditing) {
    return (
      <div className="w-full">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          autoFocus
          rows={2}
          className="w-full resize-none rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-[#c7dafc]"
        />
        <div className="mt-1 flex gap-3 px-1">
          <button
            onClick={() => {onSave(text.trim()); }}
            
            disabled={!text.trim() || isSaving}
            className="text-xs font-bold text-[#1877f2] hover:underline disabled:opacity-50"
          >
            {isSaving ? "Saving..." : "Save"}
          </button>
          <button onClick={handleCancel} className="text-xs font-semibold text-slate-500 hover:underline">
            Cancel
          </button>
        </div>
      </div>
    );
  }
  return (

    <div className="relative inline-block max-w-full rounded-2xl bg-[#f0f2f5] px-3 py-2">
      <p className="text-xs font-bold text-slate-900  mb-1">
        {comment.commentCreator.name}
      </p>
      <p className="text-xs text-slate-500  mb-1">
        @{comment.commentCreator.username} · {formatPostTime(comment.createdAt)}
      </p>
      {comment.content && (
        <p className="mt-1 whitespace-pre-wrap text-sm text-slate-800 ">
          {comment.content}
        </p>
      )}

      {/* صورة التعليق (لو موجودة) */}
      {comment.image && (
        <img
          src={comment.image}
          alt="comment"
          className="mt-2 max-h-60 w-full rounded-lg object-cover"
        />
      )}
    </div>

  )
}
