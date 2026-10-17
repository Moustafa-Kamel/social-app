import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getNotifications, getUnreadCount, markAllAsReadApi, markAsReaApi } from "./notifications.api";
import { getErrorMessage } from "../../utils/getErrorMessage";
import toast from "react-hot-toast";

export const useUnreadCount = (enabled: boolean) =>
    useQuery({
        queryKey: ["notifications", "count"],
        queryFn: getUnreadCount,
        refetchInterval: 30_000,enabled});

export const useNotifications = (page: number, unread: boolean) =>
  useQuery({
    queryKey: ["notifications", "list", unread, page],
    queryFn: () => getNotifications(page, 10, unread),
    placeholderData: (prev, prevQuery) =>
      prevQuery?.queryKey[2] === unread ? prev : undefined,
  });

export const useMarkAsRead = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: markAsReaApi,
        onSuccess: () => qc.invalidateQueries({ queryKey: ["notifications"] }),
        onError: (e) => toast.error(getErrorMessage(e)),
    });
};

export const useMarkAllAsRead = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: markAllAsReadApi,
        onSuccess: () => qc.invalidateQueries({ queryKey: ["notifications"] }),
        onError: (e) => toast.error(getErrorMessage(e)),
    });
};