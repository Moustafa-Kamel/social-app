import LoadingSpinner from "../../../Components/ui/LoadingSpinner/LoadingSpinner";
import PostCard from "./PostCard/PostCard";
import type { Posts } from "../posts.types";
import {  useInfiniteQuery } from "@tanstack/react-query";
import InfiniteScrollTrigger from "../../../Components/ui/InfiniteScrollTrigger/InfiniteScrollTrigger";

type Props = {
  queryKey: string;
  fetcher: (page: number) => Promise<Posts>;
  emptyMessage?: string;
};

export default function PostsList({ queryKey, fetcher, emptyMessage = "No posts found." }: Props) {


  const { data, isPending, isError, hasNextPage, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ["posts", queryKey],
    queryFn: ({ pageParam }) => fetcher(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const p = lastPage.meta?.pagination;
      return p && p.currentPage < p.numberOfPages ? p.currentPage + 1 : undefined;
    },
  });

  const posts = Array.from(
    new Map(
      (data?.pages ?? []).flatMap((page) => page.data.posts).map((post) => [post._id, post] as const)
    ).values()
  );


  if (isPending) return <LoadingSpinner />;
  if (isError) return <p className="py-8 text-center text-red-500">Failed to load posts</p>

  return (
    <section className="space-y-4">

      {posts.length > 0 ? (
        <>
          {posts.map((post) => <PostCard post={post} key={post._id} />)}
          <InfiniteScrollTrigger
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
            onLoadMore={fetchNextPage}
            endMessage="You're all caught up 🎉"
          />
        </>
      ) : (
        <p className="py-8 text-center text-gray-500">{emptyMessage}</p>
      )}
    </section>
  );
}