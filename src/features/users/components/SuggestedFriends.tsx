import { Link } from "react-router";
// import { useFollowSuggestions, useToggleFollow } from "../users.hooks"
// import { Persons } from "@gravity-ui/icons";
import SuggestedFriendsList from "./SuggestedFriendsList";

export default function SuggestedFriends() {
    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">

            <SuggestedFriendsList limit={5} layout="vertical" />

            <Link to="/Suggestions" className="w-full cursor-pointer mt-3 flex justify-center p-1 text-main-color font-bold hover:bg-main-color/20 bg-slate-50 shadow rounded-2xl border border-slate-200">
                View More
            </Link>

        </div>
    )
}
