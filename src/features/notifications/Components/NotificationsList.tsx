import { formatPostTime } from "../../../utils/formatPostTime";
import type { Notification } from "../notifications.types";
import NotificationItem from "./NotificationsItem";

type ListProps = {
    notifications: Notification[];
    onItemClick: (n: Notification) => void;
    emptyMessage?: string;
};

const getActionText = (type: string) => {
    switch (type) {
        case "like_post": return "liked your post";
        case "comment_post": return "commented on your post";
        case "follow_user": return "followed you";
        case "share": return "shared your post";
        case "mention_user": return "mintion you";
        default: return "interacted with your content";
    }
};


export default function NotificationsList({ notifications, emptyMessage, onItemClick }: ListProps) {
    if (notifications.length === 0) {
        return <p className="py-8 text-center text-sm text-slate-500">{emptyMessage ?? "No notifications found."}</p>;
    }
    return (
        <div className="space-y-2 p-3 sm:p-4">
            {notifications.map((n) => {
                const user = n.actor;
                return (
                    <NotificationItem
                        key={n._id}
                        type={n.type}
                        user={{ name: user?.name ?? "Unknown user", photo: user?.photo ?? "" }}
                        actionText={getActionText(n.type)}
                        time={formatPostTime(n.createdAt!)}
                        content={n.entity?.body ?? n.entity?.topComment?.content}
                        isRead={n.isRead}
                        onClick={() => onItemClick(n)}
                    />
                );
            })}
        </div>
    );
}
