import { Button } from "@heroui/react";
import { Like1, MessageText1, Send2 } from "iconsax-reactjs";
type Props = {
    onCommentClick: () => void;
    onLikeClick: () => void;
    onClickShare: ()=>void;
    isLiked: boolean;
    isLiking: boolean;
};  
export default function PostActions({ isLiked, isLiking, onLikeClick, onCommentClick,onClickShare }:Props) {
    return (
        <div className="grid grid-cols-3 gap-1 p-1">
            <Button
                onClick={onLikeClick}
                isDisabled={isLiking}
                className={`cursor-pointer w-full flex items-center justify-center gap-1.5 rounded-md p-2 text-xs font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50 sm:gap-2 sm:text-sm ${isLiked ? "text-[#1877f2]" : "text-slate-600"} hover:bg-slate-100`}
            >
                <Like1 size={20} variant={isLiked ? "Bold" : "Outline"} />
                <span>Like</span>
            </Button>

            <Button
                onClick={onCommentClick}
                className="cursor-pointer w-full flex items-center justify-center gap-1.5 rounded-md p-2 text-xs font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50 sm:gap-2 sm:text-sm text-slate-600 hover:bg-slate-100"
            >
                <MessageText1 size={20} variant="Outline" />
                <span>Comment</span>
            </Button>

            <Button
                onClick={onClickShare}
                className="cursor-pointer w-full flex items-center justify-center gap-1.5 rounded-md p-2 text-xs font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50 sm:gap-2 sm:text-sm text-slate-600 hover:bg-slate-100"
            >
                <Send2 size={20} variant="Outline" />
                <span>Share</span>
            </Button>
        </div>
    )
}
