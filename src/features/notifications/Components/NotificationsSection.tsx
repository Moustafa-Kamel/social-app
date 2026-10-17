import { useState } from "react";
import { useNavigate } from "react-router";
import LoadingSpinner from "../../../Components/ui/LoadingSpinner/LoadingSpinner";
import NotificationHeader from "./NotificationHeader";
import NotificationsButtons from "./NotificationsButtons";
import NotificationsList from "./NotificationsList";
import { useMarkAllAsRead, useMarkAsRead, useNotifications } from "../notifications.hooks";
import type { Notification } from "../notifications.types";
import AppPaginataion from "../../../Components/ui/AppPagination/AppPagination";

export default function NotificationsSection() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<"all" | "unread">("all");
  const [page, setPage] = useState(1);

  const { data, isPending, isError, isFetching } = useNotifications(page, filter === "unread");
  const markAsRead = useMarkAsRead();
  const markAll = useMarkAllAsRead();

  const all: Notification[] = data?.data.notifications ?? [];

  const pagination = data?.meta?.pagination;
  const notifications = filter === "unread" ? all.filter((n) => !n.isRead) : all;
  const handleItemClick = (n: Notification) => {
    if (!n.isRead) markAsRead.mutate(n._id);
    if (n.type === "follow" && n.actor) navigate(`/profile/${n.actor._id}`);
    else if (n.entity?._id) navigate(`/postDetails/${n.entity._id}`);
  };
  const handleFilterChange = (f: "all" | "unread") => {
    setFilter(f);
    setPage(1); // رجّع لأول صفحة لما الفلتر يتغير
  };
  return (
    <section className="rounded-xl border border-slate-200 bg-white shadow-sm sm:rounded-2xl">
      {/* Header & Filters */}
      <div className="border-b border-slate-200 p-4 sm:p-5">
        <NotificationHeader onMarkAllAsRead={() => markAll.mutate()} />

        {/* Filter Buttons */}
        <NotificationsButtons onFilterChange={handleFilterChange} filter={filter} />
      </div>
      {isPending ? (
        <LoadingSpinner />
      ) : isError ? (
        <p className="py-8 text-center text-sm text-red-500">Failed to load notifications</p>
      ) : (
        <NotificationsList notifications={notifications} onItemClick={handleItemClick} 
        emptyMessage={filter === "unread" ? "You're all caught up 🎉" : "No notifications yet."}/>
      )}
      {pagination && pagination.numberOfPages > 1 && (
        <div className="p-3">
          {pagination && pagination.numberOfPages > 1 && notifications.length > 0 &&<AppPaginataion
            itemsPerPage={pagination.limit}
            page={page}
            loading={isFetching}
            setPage={setPage}
            totalPages={pagination.numberOfPages}
            totalItems={pagination.total}
          />}
        </div>
      )}
    </section>
  );
}
