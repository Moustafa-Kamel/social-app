import { useEffect, useRef } from "react";
import { RotatingLines } from "react-loader-spinner";
type Props = {
    hasNextPage: boolean;
    isFetchingNextPage: boolean;
    onLoadMore: () => void;
    endMessage?: string;
};
export default function InfiniteScrollTrigger({ hasNextPage, isFetchingNextPage, onLoadMore, endMessage }: Props) {
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const el = ref.current;
        if (!el || !hasNextPage || isFetchingNextPage) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) onLoadMore();
            },
            { rootMargin: "400px" } // ابدأ التحميل قبل ما المستخدم يوصل للآخر بـ 400px
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, [hasNextPage, isFetchingNextPage, onLoadMore]);

    return (
        <div ref={ref} className="flex min-h-10 items-center justify-center py-4">
            {isFetchingNextPage ? (
                <RotatingLines visible height="32" width="32" strokeWidth="5" strokeColor="#2ccce4"  animationDuration="0.75" ariaLabel="loading-more" />
            ) : !hasNextPage && endMessage ? (
                <p className="text-sm text-slate-400">{endMessage}</p>
            ) : null}
        </div>
    )
}
