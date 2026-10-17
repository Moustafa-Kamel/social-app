import { Like1, Repeat } from "iconsax-reactjs";
import { Link } from "react-router";
import type { Post } from "../../posts.types";

export default function PostStats({ post, showDetailsLink }: { post: Post; showDetailsLink?: boolean }) {
  const { likesCount, sharesCount, commentsCount, _id } = post;
  return (
      <div className="px-4 pb-2 pt-3 text-sm text-slate-500">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#1877f2] text-white">
              <Like1 size={12} variant="Bold" />
            </span>
            <button
              type="button"
              className="cursor-pointer font-semibold transition hover:text-[#1877f2] hover:underline"
            >
              {likesCount??0} likes
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs sm:gap-3 sm:text-sm">
            <span className="inline-flex items-center gap-1">
              <Repeat size={13} variant="Outline" />
              {sharesCount??0} shares
            </span>
            <span>{commentsCount??0} comments</span>
            {showDetailsLink && (
              <Link to={`/postDetails/${_id}`}
              // size="sm"

              className="rounded-md px-2 py-1 text-xs font-bold text-main-color hover:bg-main-color/10"
            >
              View details
            </Link>
            )}
          </div>
        </div>
      </div>
  )
}
