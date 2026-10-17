
import { Pagination } from "@heroui/react";
import type React from "react";

export default function AppPagination({itemsPerPage, setPage, totalPages, totalItems, page, loading }: {itemsPerPage:number, setPage: React.Dispatch<React.SetStateAction<number>>, loading: boolean, totalPages: number, totalItems: number, page: number }) {
    const getPageNumbers = () => {
        const pages: (number | "ellipsis")[] = [];
        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            pages.push(1);
            if (page > 3) {
                pages.push("ellipsis");
            }
            const start = Math.max(2, page - 1);
            const end = Math.min(totalPages - 1, page + 1);
            for (let i = start; i <= end; i++) {
                pages.push(i);
            }
            if (page < totalPages - 2) {
                pages.push("ellipsis");
            }
            pages.push(totalPages);
        }
        return pages;
    };
    const startItem = (page - 1) * itemsPerPage + 1;
    const endItem = Math.min(page * itemsPerPage, totalItems);

    return (
        <Pagination className="flex flex-wrap items-center justify-center gap-1 py-4 text-xs text-gray-400 w-full ">
            <Pagination.Summary className="w-full text-center mb-2 text-xs text-gray-500">
                Showing {startItem}-{endItem} of {totalItems} results
            </Pagination.Summary>
            <Pagination.Content className="flex flex-wrap items-center justify-center gap-1 w-full">
                <Pagination.Item>
                    <Pagination.Previous
                        isDisabled={page === 1 || loading}
                        onPress={() => setPage((p) => Math.max(p - 1, 1))}
                        className="text-xs px-2 py-1 min-h-7"
                    >
                        <Pagination.PreviousIcon />
                        <span className="text-xs">Prev</span>
                    </Pagination.Previous>
                </Pagination.Item>

                {getPageNumbers().map((p, i) =>
                    p === "ellipsis" ? (
                        <Pagination.Item key={`ellipsis-${i}`}>
                            <Pagination.Ellipsis />
                        </Pagination.Item>
                    ) : (
                        <Pagination.Item key={p}>
                            <Pagination.Link
                                isActive={p === page}
                                onPress={() => setPage(p)}
                                className="text-xs px-2 py-1 min-h-7"
                            >
                                {p}
                            </Pagination.Link>
                        </Pagination.Item>
                    )
                )}

                <Pagination.Item>
                    <Pagination.Next
                        isDisabled={page === totalPages || loading}
                        onPress={() => setPage((p) => Math.min(p + 1, totalPages))}
                        className="text-xs w-7 h-7 min-w-7"
                    >
                        <span className="text-xs">Next</span>
                        <Pagination.NextIcon className="w-3.5 h-3.5"/>
                    </Pagination.Next>
                </Pagination.Item>
            </Pagination.Content>
        </Pagination>


    )
}
