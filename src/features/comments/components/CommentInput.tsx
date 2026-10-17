import { useContext, useEffect, useRef, useState } from "react"
import { UserAuthContext } from "../../../app/providers/UserAuthProvider/UserAuthContext"
import { Image, Send2, Trash } from "iconsax-reactjs"
import AppEmojiPicker from "../../../utils/AppEmojiPicker";

export default function CommentInput({ autoFocus, placeholder, isPending, onSubmit }: { autoFocus?: boolean; placeholder?: string; isPending: boolean; onSubmit: (data: { body: string; file: File | null }, reset: () => void) => void }) {
  const { userData } = useContext(UserAuthContext);
  const [body, setBody] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);


  const handleAddEmoji = (emoji: string) => {
    setBody((prev) => prev + emoji);
  };

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

  const reset = () => {
    setBody("");
    handleRemoveImage();
  };
  const canSubmit = (body.trim() || file) && !isPending;

  const handleSubmit = () => {
    if (!canSubmit) return;
    onSubmit({ body: body.trim(), file }, reset);
  };
  return (

    <div className="mt-3">
      <div className="flex items-start gap-2">
        <img
          alt={userData?.name}
          className="h-9 w-9 rounded-full object-cover"
          src={userData?.photo}
        />

        <div className="w-full rounded-2xl border border-slate-200 bg-[#f0f2f5] px-2.5 py-1.5 transition focus-within:border-[#c7dafc] focus-within:bg-white">
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            autoFocus={autoFocus}
            placeholder={placeholder ?? `Comment as ${userData?.name}`}
            rows={1}
            className="max-h-35 min-h-10 w-full resize-none bg-transparent px-2 py-1.5 text-sm leading-5 outline-none placeholder:text-slate-500"
          />
          {imagePreview && (
            <div className="relative mx-2 mb-1 w-fit">
              <img src={imagePreview} alt="preview" className="max-h-32 rounded-lg object-cover" />
              <button
                type="button"
                onClick={handleRemoveImage}
                className="absolute right-1 top-1 rounded-full bg-slate-900/70 p-1 text-white hover:bg-slate-900"
              >
                <Trash size={14} />
              </button>
            </div>
          )}

          <div className="mt-1 flex items-center justify-between">
            <div className="flex items-center gap-1">
              <label className="inline-flex cursor-pointer items-center justify-center rounded-full p-2 text-slate-500 transition hover:bg-slate-200 hover:text-emerald-600">
                <Image size={16} variant="Outline" />
                <input
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  type="file"
                  accept="image/*"
                  className="hidden"
                />
              </label>
              <AppEmojiPicker onEmojiSelect={handleAddEmoji} />

            </div>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={!canSubmit}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#1877f2] text-white shadow-sm transition hover:bg-[#166fe5] disabled:cursor-not-allowed disabled:bg-[#9ec5ff] disabled:opacity-100"
            >
              <Send2 size={16} variant="Outline" />
            </button>
          </div>
        </div>
      </div>
    </div >
  )
}
