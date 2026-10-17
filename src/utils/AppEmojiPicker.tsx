import EmojiPicker, { type EmojiClickData, Theme } from "emoji-picker-react";
import { Popover, PopoverTrigger, PopoverContent } from "@heroui/react";
import { FaceSmile } from "@gravity-ui/icons";

type Props = {
    onEmojiSelect: (emoji: string) => void;
    body?: string;
};

export default function AppEmojiPicker({ onEmojiSelect, body }: Props) {

    const handleEmojiClick = (emojiData: EmojiClickData) => {
        onEmojiSelect(emojiData.emoji);
    };
    return (
        <Popover>
            <PopoverTrigger>
                <button
                    type="button"
                    aria-label="Add Emoji"
                    className="inline-flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-100"
                >
                    <FaceSmile className="text-amber-600" width={20} height={20} />
                    <span className="hidden sm:inline">{body}</span>

                </button>
            </PopoverTrigger>

            <PopoverContent className="p-0 border-none bg-transparent shadow-none z-50 "> 
                <EmojiPicker
                    onEmojiClick={handleEmojiClick}
                    autoFocusSearch={false}
                    theme={Theme.LIGHT}
                    width={320}
                    height={400}
                    searchPlaceHolder="Search emoji..."
                    previewConfig={{ showPreview: false }}
                />

            </PopoverContent>
        </Popover>
    );
}