import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getNotifications, getUnreadCount, markAllAsReadApi, markAsReaApi } from "./notifications.api";
import { getErrorMessage } from "../../utils/getErrorMessage";
import toast from "react-hot-toast";

export const useUnreadCount = (enabled: boolean) =>
    useQuery({
        queryKey: ["notifications", "count"],
        queryFn: getUnreadCount,
        refetchInterval: 30_000,enabled});

export const useNotifications = ( unread: boolean) =>
  useInfiniteQuery({    
    queryKey: ["notifications", "list", unread],
    queryFn: ({ pageParam }) => getNotifications(pageParam, 10, unread),
     initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const p = lastPage.meta?.pagination;
      return p && p.currentPage < p.numberOfPages ? p.currentPage + 1 : undefined;
    },
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