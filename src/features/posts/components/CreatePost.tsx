import React, { useState, useRef, useContext, useEffect } from "react";
import { Gallery, Global, Send2, Trash } from "iconsax-reactjs";
import toast from "react-hot-toast";
import { UserAuthContext } from "../../../app/providers/UserAuthProvider/UserAuthContext";
import { useCreatePost } from "../posts.hooks";
import AppEmojiPicker from "../../../utils/AppEmojiPicker";

export default function CreatePost() {
  const { userData } = useContext(UserAuthContext);
  const { mutate, isPending } = useCreatePost();

  const [body, setBody] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);


  const handleAddEmoji = (emoji: string) => {
    setBody((prev) => prev + emoji);
  };

  // تنضيف الـ preview URL لما يتغير أو الـ component يتشال
  useEffect(() => {
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview);
    };
  }, [imagePreview]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    setFile(selectedFile);
    setImagePreview(URL.createObjectURL(selectedFile));
  };

  const handleRemoveImage = () => {
    setFile(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const canSubmit = (body.trim() || file) && !isPending;

  const handleSubmit = () => {
    if (!canSubmit) return;
    mutate(
      { body, file: file ?? undefined },
      {
        onSuccess: () => {
          setBody("");
          handleRemoveImage();
          toast.success("Post created");
        },
        onError: () => toast.error("Failed to create post"),
      }
    );
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      {/* Header */}
      <div className="mb-3 flex items-start gap-3">
        <img
          alt={userData?.name}
          className="h-11 w-11 rounded-full object-cover"
          src={userData?.photo}
        />
        <div className="flex-1">
          <p className="text-base font-extrabold text-slate-900">{userData?.name}</p>
          <div className="mt-1 inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-700">
            <Global size="14" className="text-slate-600" />
            <span>Public</span>
          </div>
        </div>
      </div>

      {/* Textarea */}
      <textarea
        rows={3}
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder={`What's on your mind, ${userData?.name}?`}
        className="w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-[17px] leading-relaxed text-slate-800 outline-none transition focus:border-main-color focus:shadow-main-color focus:bg-white"
        spellCheck={false}
      />

      {/* Image preview */}
      {imagePreview && (
        <div className="relative mt-2 overflow-hidden rounded-xl border border-slate-200">
          <img src={imagePreview} alt="Upload preview" className="max-h-60 w-full object-cover" />
          <button
            type="button"
            onClick={handleRemoveImage}
            className="absolute right-2 top-2 rounded-full bg-slate-900/70 p-1.5 text-white transition hover:bg-slate-900"
          >
            <Trash size="16" />
          </button>
        </div>
      )}

      {/* Footer */}
      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-3">
        <div className="flex items-center gap-2">
          <label className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-100">
            <Gallery size="20" className="text-emerald-600" variant="Bold" />
            <span className="hidden sm:inline">Photo/video</span>
            <input
              ref={fileInputRef}
              accept="image/*"
              className="hidden"
              type="file"
              onChange={handleFileChange}
            />
          </label>

          <button
            type="button"
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 "
          >
            <AppEmojiPicker onEmojiSelect={handleAddEmoji}  body={"Feeling/activity"}/>
          </button>

        </div>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={!canSubmit}
          className="flex items-center gap-2 rounded-lg bg-main-color px-5 py-2 text-sm font-extrabold text-white shadow-sm transition-colors hover:bg-main-color/60 cursor-pointer disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isPending ? "Posting..." : "Post"}
          <Send2 size="16" variant="Bold" />
        </button>
      </div>
    </div>
  );
}