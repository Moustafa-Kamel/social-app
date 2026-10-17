import { useState } from "react";
import { useNavigate } from "react-router";
import LoadingSpinner from "../../../Components/ui/LoadingSpinner/LoadingSpinner";
import NotificationHeader from "./NotificationHeader";
import NotificationsButtons from "./NotificationsButtons";
import NotificationsList from "./NotificationsList";
import { useMarkAllAsRead, useMarkAsRead, useNotifications } from "../notifications.hooks";
import type { Notification } from "../notifications.types";
import InfiniteScrollTrigger from "../../../Components/ui/InfiniteScrollTrigger/InfiniteScrollTrigger";

export default function NotificationsSection() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<"all" | "unread">("all");

  const { data, isPending, isError,fetchNextPage,hasNextPage,isFetchingNextPage } = useNotifications(filter === "unread");
  const markAsRead = useMarkAsRead();
  const markAll = useMarkAllAsRead();


  const notifications = Array.from(
    new Map(
      (data?.pages ?? []).flatMap((page) => page.data.notifications).map((noti) => [noti._id, noti])
    ).values()
  )
  const handleItemClick = (n: Notification) => {
    if (!n.isRead) markAsRead.mutate(n._id);
    if (n.type === "follow" && n.actor) navigate(`/profile/${n.actor._id}`);
    else if (n.entity?._id) navigate(`/postDetails/${n.entity._id}`);
  };

  return (
    <section className="rounded-xl border border-slate-200 bg-white shadow-sm sm:rounded-2xl">
      {/* Header & Filters */}
      <div className="border-b border-slate-200 p-4 sm:p-5">
        <NotificationHeader onMarkAllAsRead={() => markAll.mutate()} />

        {/* Filter Buttons */}
        <NotificationsButtons onFilterChange={setFilter} filter={filter} />
      </div>
      {isPending ? (
        <LoadingSpinner />
      ) : isError ? (
        <p className="py-8 text-center text-sm text-red-500">Failed to load notifications</p>
      ) : (
        <NotificationsList notifications={notifications} onItemClick={handleItemClick}
          emptyMessage={filter === "unread" ? "You're all caught up 🎉" : "No notifications yet."} />
      )}
      <InfiniteScrollTrigger
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        onLoadMore={fetchNextPage}
        endMessage="You're all caught up 🎉"
      />

    </section>
  );
}
