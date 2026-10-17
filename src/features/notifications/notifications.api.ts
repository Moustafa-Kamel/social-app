import { api } from "../../lib/axios";
import type {  NotificationResponseType, UnreadCountRespone } from "./notifications.types";

export const getNotifications = (page = 1, limit = 10, unread = false) =>
  api
    .get<NotificationResponseType>("/notifications", {
      params: { page, limit, ...(unread && { unread: true }) },
    })
    .then((r) => r.data);

export async function getUnreadCount() {

    const res = await api.get<UnreadCountRespone>("/notifications/unread-count");
    return res.data

}



export async function markAsReaApi(id: string) {

    const res = await api.patch(`/notifications/${id}/read`);
    return res.data

}

export async function markAllAsReadApi() {

    const res = await api.patch("/notifications/read-all");
    return res.data

}
