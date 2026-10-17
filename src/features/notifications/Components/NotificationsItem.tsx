import { Heart, Message, Notification, Repeat, UserAdd } from "iconsax-reactjs";
import { CheckDouble} from "@gravity-ui/icons";

const badges: Record<string, { icon: React.ReactNode; color: string }> = {
  like: { icon: <Heart size={14} variant="Bold" />, color: "text-rose-500" },
  follow: { icon: <UserAdd size={14} variant="Outline" />, color: "text-violet-600" },
  comment: { icon: <Message size={14} variant="Outline" />, color: "text-[#1877f2]" },
  share: { icon: <Repeat size={14} variant="Outline" />, color: "text-emerald-600" },
};
const fallbackBadge = { icon: <Notification size={14} variant="Outline" />, color: "text-slate-500" };

type Props = {
  type: string;
  user: { name: string; photo: string };
  actionText: string;
  time: string;
  content?: string;
  isRead?: boolean;
  onClick?: () => void;
};


export default function NotificationItem({ type, user, actionText, time, content, isRead = true, onClick }: Props) {
  const badge = badges[type] ?? fallbackBadge;
  return (
    <article onClick={onClick} className="group relative flex gap-3 rounded-xl border p-3 transition sm:rounded-2xl sm:p-4 border-slate-200 bg-white hover:bg-slate-50">

      {/* صورة المستخدم وأيقونة الحالة */}
      <div className="relative shrink-0">
        <img
          alt={user.name}
          className="h-11 w-11 rounded-full object-cover"
          src={user.photo}
        />
        <span className={`absolute -bottom-1 -right-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-white ring-2 ring-white ${badge.color}`}>
          {badge.icon}
        </span>
      </div>

      {/* محتوى الإشعار */}
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-start justify-between gap-1.5 sm:gap-2">
          <p className="text-sm leading-6 text-slate-800">
            <span className="font-extrabold">{user.name}</span> {actionText}
          </p>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="text-xs font-semibold text-slate-500">{time}</span>
          </div>
        </div>

        {/* النص الفرعي أو محتوى البوست المرتبط */}
        {content && <p className="mt-0.5 text-sm text-slate-600">{content}</p>}

        {/* حالة القراءة */}
        <div className="mt-2 flex items-center gap-2">
          <span className={`inline-flex items-center gap-1.5 text-xs font-semibold ${isRead ? "text-emerald-500" : "text-slate-400"}`}>
            <CheckDouble width={13} className={isRead? "text-emerald-500" : 'text-main-color'} />
            {isRead ? "Read" : "Unread"}
          </span>
        </div>
      </div>

    </article>
  );
}