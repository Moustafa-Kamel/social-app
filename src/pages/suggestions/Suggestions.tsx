import SuggestedFriendsList from "../../features/users/components/SuggestedFriendsList";

export default function Suggestions() {
  return (
    <div className="mx-auto max-w-4xl rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <SuggestedFriendsList limit={40} layout="grid" showLoadMore />
    </div>
  )
}
