import { Sms, User as UserIcon } from "iconsax-reactjs";
type Props = {
  email?: string;
  isMe: boolean;
  postsCount: number;   
  savedCount:number;

};
export default function ProfileAbout({ email, isMe, postsCount, savedCount }: Props) {
  return (
<div className="mt-5 grid gap-4 lg:grid-cols-[1.3fr_.7fr]">
      {/* About */}
      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
        <h3 className="text-sm font-extrabold text-slate-800">About</h3>
        <div className="mt-3 space-y-2 text-sm text-slate-600">
          <p className="flex items-center gap-2">
            <Sms size={16} variant="Outline" className="text-slate-500" />
            {email || "No email provided"}
          </p>
          <p className="flex items-center gap-2">
            <UserIcon size={16} variant="Outline" className="text-slate-500" />
            Active on Route Posts
          </p>
        </div>
      </div>

      {/* My posts / Saved posts */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
        <div className="rounded-2xl border border-[#dbeafe] bg-[#f6faff] px-4 py-3">
          <p className="text-xs font-bold uppercase tracking-wide text-[#1f4f96]">
            {isMe ? "My posts" : "Posts"}
          </p>
          <p className="mt-1 text-2xl font-black text-slate-900">{postsCount}</p>
        </div>

        {isMe && (
          <div className="rounded-2xl border border-[#dbeafe] bg-[#f6faff] px-4 py-3">
            <p className="text-xs font-bold uppercase tracking-wide text-[#1f4f96]">Saved posts</p>
            <p className="mt-1 text-2xl font-black text-slate-900">{savedCount}</p>
          </div>
        )}
      </div>
    </div>
  );
}
