import { Avatar } from "@heroui/react";
import { formatPostTime } from "../../../../utils/formatPostTime";
import type { SharedPostType } from "../../posts.types";
import { ArrowUpRightFromSquare } from "@gravity-ui/icons";
import { Link } from "react-router";

export default function SharedPost({ shared }: { shared: SharedPostType | null }) {
    if (!shared) {
        return (
            <div className="mx-4 mb-3 rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-500">
                This post is no longer available
            </div>
        );
    }

    return (
        <div className="mx-4 mb-3 overflow-hidden rounded-xl border bg-slate-50 border-slate-200">
            <div className="flex items-center gap-2 p-3">
                <Link to={`/profile/${shared.user._id}`}>
                    <Avatar className="h-9 w-9">
                        <Avatar.Image alt={shared.user.name} src={shared.user.photo} />
                        <Avatar.Fallback>U</Avatar.Fallback>
                    </Avatar>
                </Link>
                <div>
                    <p className="text-sm font-extrabold text-slate-900">{shared.user.name}</p>
                    <p className="text-xs text-slate-500">
                        @{shared.user.username} · {formatPostTime(shared.createdAt)}
                    </p>
                </div>

                <Link to={`/postDetails/${shared._id}`} className="ml-auto  inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-bold text-[#1877f2] hover:bg-[#e7f3ff]">
                    Original Post
                    <ArrowUpRightFromSquare/>
                </Link>
            </div>

            {shared.body && (
                <p className="whitespace-pre-wrap px-3 pb-3 text-sm text-slate-800">{shared.body}</p>
            )}

            {shared.image && (
                <img src={shared.image} alt="shared post" className="max-h-96 w-full object-cover" />
            )}
        </div>
    );

}
