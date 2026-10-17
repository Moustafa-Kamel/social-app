import { Link } from "react-router";
import { formatPostTime } from "../../../../utils/formatPostTime";
import { ArrowDown2, Global } from "iconsax-reactjs";
import type { Post } from "../../posts.types";
import { EllipsisVertical, Pencil, TrashBin, Bookmark } from "@gravity-ui/icons";
import { Avatar, Button, Description, Dropdown, Header, Label } from "@heroui/react";
import { useContext, useState } from "react";
import { UserAuthContext } from "../../../../app/providers/UserAuthProvider/UserAuthContext";
import AppButton from "../../../../SharedComponents/AppButton/AppButton";
type Props = {
    isEditing: boolean;
    isSaving: boolean;
    onSave: (body: string) => void;
    onCancel: () => void;
    onEdit: () => void,
    isBookmarked: boolean,
    onDeletePost: () => void,
    onBookMarkClick: () => void,
    post: Post
};
export default function PostHeader({ post, onBookMarkClick, isBookmarked, onDeletePost, isEditing, onEdit, isSaving, onSave, onCancel }: Props) {
    const { body, user, createdAt, privacy } = post;
    const { userData } = useContext(UserAuthContext);
    const [text, setText] = useState(post.body ?? "");

    const handleCancel = () => {
        setText(post.body!);
        onCancel();
    };
    const handleSave = () => {
        onSave(text.trim());
    };
    return (
        <div className="p-4">
            <div className="flex items-center gap-3">
                <Link to={`/profile/${user._id}`} className="shrink-0">
                    <Avatar className="h-11 w-11">
                        <Avatar.Image alt="User" src={user.photo} />
                        <Avatar.Fallback>U</Avatar.Fallback>
                    </Avatar>
                </Link>

                <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-1 text-sm">
                        <Link to={`/profile/${user._id}`} className="font-extrabold text-slate-900 hover:underline">
                            {user.name}
                        </Link>

                    </div>

                    <div className="flex flex-wrap items-center gap-1 text-xs text-slate-500">
                        <span>{user.username}</span>
                        <span className="mx-1">·</span>
                        <button
                            type="button"
                            className=" rounded px-0.5 py-0.5 text-xs font-semibold text-slate-500 transition hover:bg-slate-100 hover:text-slate-700 hover:underline"
                        >
                            {formatPostTime(createdAt)}
                        </button>
                        <span className="mx-1">·</span>
                        <span className="relative inline-flex items-center">
                            <button
                                type="button"
                                className="inline-flex items-center gap-1 rounded-md px-1 py-0.5 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                <Global size={11} variant="Outline" />
                                {privacy}
                                <ArrowDown2 size={12} variant="Outline" />
                            </button>
                        </span>
                    </div>
                </div>

                <div className="relative">
                    <Dropdown>
                        <Button isIconOnly aria-label="Menu" className="bg-white hover:bg-gray-300/30">
                            <EllipsisVertical className="outline-none text-gray-500" />
                        </Button>
                        <Dropdown.Popover>
                            <Dropdown.Menu onAction={(key) => {
                                if (key === "post-save") onBookMarkClick();
                                if (key === "edit-post") onEdit();
                                if (key === "delete-post") onDeletePost();
                            }}>
                                <Dropdown.Section >
                                    <Header>Actions</Header>

                                    <Dropdown.Item  className="flex items-center" id="post-save" textValue={isBookmarked ? "Unsave Post" : "Save Post"}>
                                        <div className="flex  items-start justify-center pt-px">

                                            <Bookmark className="size-4 shrink-0 text-muted" />{/* <SquarePlus className="size-4 shrink-0 text-muted" /> */}
                                        </div>
                                        <div className="flex flex-col">
                                            <Label>{isBookmarked ? "UnSave" : "Save Post"}</Label>
                                        </div>
                                    </Dropdown.Item>
                                    {userData?._id === post.user._id &&
                                        <>
                                            <Dropdown.Item  id="edit-post" textValue="Edit Post">
                                                <div className="flex  items-start justify-center pt-px">
                                                    <Pencil className="size-4 shrink-0 text-muted" />
                                                </div>
                                                <div className="flex flex-col">
                                                    <Label>Edit Post</Label>
                                                </div>

                                            </Dropdown.Item>

                                            <Dropdown.Item  id="delete-post" textValue="Delete Post" variant="danger">
                                                <div className="flex h-8 items-start justify-center pt-px">
                                                    <TrashBin className="size-4 shrink-0 text-danger" />
                                                </div>
                                                <div className="flex flex-col">
                                                    <Label>Delete Post</Label>
                                                    <Description>Move to trash</Description>
                                                </div>
                                            </Dropdown.Item>
                                        </>
                                    }
                                    {/* {isDeleted && } */}

                                </Dropdown.Section>

                            </Dropdown.Menu>
                        </Dropdown.Popover>
                    </Dropdown>
                </div>
            </div>
            <div className="mt-3">
                <>
                    {isEditing
                        ?
                        <div className="w-full">
                            <textarea
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                autoFocus
                                rows={2}
                                className="min-h-27.5 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm outline-none ring-[#1877f2]/20 focus:border-[#1877f2] focus:ring-2"
                            />
                            <div className="mt-1 flex gap-3 px-1 justify-end items-center">
                                <AppButton
                                    onPress={handleSave}
                                    size="sm"
                                    className="bg-main-color"
                                    isDisabled={!text.trim() || isSaving}
                                >
                                    Save
                                </AppButton>
                                <AppButton onPress={handleCancel} size="sm" variant="danger">
                                    Cancel
                                </AppButton>
                            </div>
                        </div>
                        :
                        <p className="whitespace-pre-wrap text-sm leading-relaxed text-foreground">{body}</p>
                    }
                </>
            </div>
            {isBookmarked && (
                <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-[#1877f2]">
                    <Bookmark className="size-4 shrink-0 text-bold" />
                    <span>Saved</span>
                </div>
            )}
        </div>
    )
}
