import { Camera, User as UserIcon } from "iconsax-reactjs";
import type { User } from "../profile.types";
type Props = {
  user: User;
  isMe: boolean;
  isFollowing: boolean;
  isFollowPending: boolean;
  isUploading: boolean;
  onFollowClick: () => void;
  onPhotoChange: (file: File) => void;
};
export default function ProfileHeader({
  user, isMe, isFollowing, isFollowPending, isUploading, onFollowClick, onPhotoChange,
}: Props) {

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    onPhotoChange(file);
    e.target.value = ""; // عشان تقدر ترفع نفس الصورة تاني
  };
  return (
    <div className="flex min-w-0 items-end gap-4">
      {/* الصورة */}
      <div className="group/avatar relative shrink-0">
        <img
          alt={user.name}
          src={user.photo || "https://via.placeholder.com/150"}
          className={`h-28 w-28 rounded-full border-4 border-white object-cover shadow-md ring-2 ring-[#dbeafe] ${isUploading ? "opacity-60" : ""
            }`}
        />

        {isMe && (
          <label className="absolute bottom-1 right-1 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-[#1877f2] text-white opacity-100 shadow-sm transition duration-200 hover:bg-[#166fe5] sm:opacity-0 sm:group-hover/avatar:opacity-100 sm:group-focus-within/avatar:opacity-100">
            <Camera size={17} variant="Outline" />
            <input
              accept="image/*"
              className="hidden"
              type="file"
              onChange={handleChange}
              disabled={isUploading}
            />
          </label>
        )}
      </div>

      {/* الاسم */}
      <div className="min-w-0 pb-1">
        <h2 className="truncate text-2xl font-black tracking-tight text-slate-900 sm:text-4xl">
          {user.name}
        </h2>
        <p className="mt-1 text-lg font-semibold text-slate-500 sm:text-xl">@{user.username}</p>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#d7e7ff] bg-[#eef6ff] px-3 py-1 text-xs font-bold text-main-color">
            <UserIcon size={14} variant="Outline" />
            Route Posts member
          </div>

          {!isMe && (
            <button
              onClick={onFollowClick}
              disabled={isFollowPending}
              className={`rounded-lg px-5 py-1.5 text-sm font-bold disabled:opacity-50 ${isFollowing
                  ? "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  : "bg-main-color text-white hover:opacity-90"
                }`}
            >
              {isFollowing ? "Unfollow" : "Follow"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
