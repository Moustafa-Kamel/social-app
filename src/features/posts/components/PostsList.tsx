import { useEffect, useState } from "react";
import LoadingSpinner from "../../../Components/ui/LoadingSpinner/LoadingSpinner";
import AppPagintaion from "../../../Components/ui/AppPagination/AppPagination";
import PostCard from "./PostCard/PostCard";
import type { Posts } from "../posts.types";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

type Props = {
  queryKey: string;
  fetcher: (page: number) => Promise<Posts>;
  emptyMessage?: string;
  paginate?: boolean;
};

export default function PostsList({ queryKey, fetcher, emptyMessage = "No posts found.", paginate = true }: Props) {

  const [page, setPage] = useState(1);

  const { data, isPending, isError, isFetching, isPlaceholderData } = useQuery({
    queryKey: ["posts", queryKey, page],
    queryFn: () => fetcher(page),
    placeholderData: keepPreviousData,
  });
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);
  const posts = data?.data?.posts ?? [];
  const pagination = data?.meta?.pagination;

  if (isPending) return <LoadingSpinner />;
  if (isError) return <p className="py-8 text-center text-red-500">Failed to load posts</p>

  return (
    <section className="space-y-4">


      <div className={`space-y-4 transition-opacity ${isPlaceholderData ? "pointer-events-none opacity-50" : ""}`}>
        {posts.length > 0
          ? posts.map((post) => <PostCard post={post} key={post._id} />)
          : <p className="py-8 text-center text-gray-500">{emptyMessage}</p>}
      </div>

      {paginate && pagination && pagination.numberOfPages > 1 &&  (
        <AppPagintaion
          itemsPerPage={pagination.limit}
          page={page}
          loading={isFetching}
          setPage={setPage}
          totalPages={pagination.numberOfPages}
          totalItems={pagination.total}
        />
      )}
    </section>
  );
}