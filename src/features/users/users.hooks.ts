import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { changePasswordApi, getFollowSuggestions, toggleFollowApi } from "./users.api";
import toast from "react-hot-toast";
import { getErrorMessage } from "../../utils/getErrorMessage";

export const useFollowSuggestions = (limit = 10) =>
  useInfiniteQuery({
    queryKey: ["suggestions", limit],
    queryFn: ({ pageParam }) => getFollowSuggestions(pageParam, limit),
    initialPageParam: 1,
    getNextPageParam: (last, allPages) => {
      const p = last.meta?.pagination;
      if (p) return p.currentPage < p.numberOfPages ? p.currentPage + 1 : undefined;
      return last.data.suggestions.length === limit ? allPages.length + 1 : undefined;
    },
  });

export const useToggleFollow = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: toggleFollowApi,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["suggestions"] });
      qc.invalidateQueries({ queryKey: ["posts"] });
      qc.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (e) => toast.error(getErrorMessage(e)),
  });
};

export const useChangePassword = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: changePasswordApi,
    onSuccess: (res) => {
      const newToken = res?.token ?? res?.data?.token;

      if (newToken) {
        // السيرفر ادّانا token جديد
        localStorage.setItem("user_tkn", newToken);
        toast.success("Password changed successfully");
      } else {
        // مفيش token جديد، فلازم يسجّل دخول من جديد
        localStorage.removeItem("user_tkn");
        qc.clear();
        toast.success("Password changed, please login again");
        window.location.href = "/login";
      }
    },
    onError: (e) => toast.error(getErrorMessage(e)),
  });
};