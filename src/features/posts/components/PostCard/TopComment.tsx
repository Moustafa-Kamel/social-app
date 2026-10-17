import type { TopComment } from "../../posts.types";

export default function TopComment({ comment, onViewAll }: { comment?: TopComment; onViewAll: () => void }) {
  return (
        <div className="mx-4  mb-4 rounded-2xl border border-slate-200 bg-slate-50 p-3">
          <p className="mb-2 text-[11px] font-bold uppercase tracking-wide text-slate-500">Top Comment</p>
          <div className="flex items-start gap-2">
            <img alt={comment?.commentCreator.name} className="h-8 w-8 rounded-full object-cover" src={comment?.commentCreator.photo} />
            <div className="min-w-0 flex-1 rounded-2xl bg-white px-3 py-2">
              <p className="truncate text-xs font-bold text-slate-900">{comment?.commentCreator.name}</p>
              <p className="mt-0.5 whitespace-pre-wrap text-sm text-slate-700">{comment?.content}</p>
            </div>
          </div>
          <button onClick={() => { onViewAll() }} className="mt-2 text-xs font-bold text-[#1877f2] hover:underline">View all comments</button>
        </div>
  )
}
