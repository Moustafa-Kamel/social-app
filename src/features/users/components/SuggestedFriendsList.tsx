import { Link } from "react-router";
import { useFollowSuggestions, useToggleFollow } from "../users.hooks";
import { PersonPlus, Persons } from "@gravity-ui/icons";
import { SearchField } from "@heroui/react";
import { useState } from "react";

type Props = { limit?: number; layout?: "vertical" | "grid"; showLoadMore?: boolean };

export default function SuggestedFriendsList({ limit = 40, layout = "vertical", showLoadMore = false }: Props) {
    const { data, isPending, isError, hasNextPage, fetchNextPage, isFetchingNextPage } =
        useFollowSuggestions(limit);
    const [search, setSearch] = useState("");
    const users = [...new Map(
        (data?.pages.flatMap((p) => p.data.suggestions) ?? []).map((u) => [u._id, u])
    ).values()];
    const follow = useToggleFollow();
    const filtered = users.filter(
        (u) =>
            u.name.toLowerCase().includes(search.toLowerCase()) ||
            u.username.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div>
            <div className="mb-3 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 justify-center">
                    <Persons width={18} height={18} className="text-main-color" />
                    <h2 className="  font-extrabold text-slate-900">Suggested Friends</h2>
                </div>
                <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-bold text-main-color">{users.length}</span>
            </div>

            <SearchField className="my-3" name="search" value={search} onChange={setSearch}>
                <SearchField.Group className="focus-within:ring-main-color bg-slate-50">
                    <SearchField.SearchIcon className="text-main-color" />
                    <SearchField.Input className="w-70" placeholder="Search..." />
                    <SearchField.ClearButton />
                </SearchField.Group>
            </SearchField>

            {isPending ? (
                <p className="text-xs text-slate-500">Loading...</p>
            ) : isError ? (
                <p className="text-xs text-red-500">Failed to load suggestions</p>
            ) : filtered.length === 0 ? (
                <p className="text-xs text-slate-500">No suggestions right now</p>
            ) : (
                <ul className={layout === "grid" ? "grid grid-cols-2 md:grid-cols-2 gap-4"
                    : "space-y-3 flex mt-6 flex-col gap-3"}>
                    {filtered.map((u) => {
                        const isThisPending = follow.isPending && follow.variables === u._id;
                    return(
                        <li key={u._id} className="border p-4 border-slate-200 rounded-2xl">
                            <div className="flex items-center gap-4 ">
                                <Link to={`/profile/${u._id}`} className="flex min-w-0  flex-1 items-center gap-2">
                                    <img src={u.photo} alt={u.name} className="h-10 w-10 rounded-full object-cover" />
                                    <div className="min-w-0">
                                        <p className="truncate text-xs hover:underline font-bold text-slate-900">{u.name}</p>
                                        <p className="truncate text-xs text-slate-500">@{u.username}</p>
                                    </div>
                                </Link>
                                <button
                                    onClick={() => follow.mutate(u._id)}
                                    disabled={isThisPending}
                                    className="rounded-lg gap-1 items-center justify-center flex   bg-[#e7f3ff] px-3 py-1 text-xs font-bold text-main-color hover:bg-main-color/20 cursor-pointer disabled:opacity-50"
                                >
                                    <PersonPlus />
                                    Follow
                                </button>
                            </div>
                            <div className="mt-2 flex items-center gap-2 text-[11px] font-semibold text-slate-500">
                                <span className="rounded-full bg-slate-100 px-2 py-0.5">{u.followersCount} followers</span>
                            </div>
                        </li>
                    )
                }
                    )
                    }

                </ul>
            )}
            {showLoadMore && hasNextPage && (
                <button
                    onClick={() => fetchNextPage()}
                    disabled={isFetchingNextPage}
                    className="mt-4 w-full rounded-2xl cursor-pointer border border-slate-200 bg-slate-50 p-2 font-bold text-main-color shadow hover:bg-main-color/20 disabled:opacity-50"
                >
                    {isFetchingNextPage ? "Loading..." : "Load more users"}
                </button>
            )}
        </div>
    )
}
