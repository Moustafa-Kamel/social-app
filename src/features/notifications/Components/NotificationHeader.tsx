import { CheckDouble } from "@gravity-ui/icons";

export default function NotificationHeader({ onMarkAllAsRead }: { onMarkAllAsRead:()=> void }) {
    return (
        <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
                <h2 className="text-xl font-black text-slate-900 sm:text-2xl">Notifications</h2>
                <p className="mt-1 text-sm text-slate-500">Realtime updates for likes, comments, shares, and follows.</p>
            </div>

            <button
                onClick={onMarkAllAsRead}
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
            >
                <CheckDouble width={16} className="text-main-color" />
                Mark all as read
            </button>
        </div>
    )
}
