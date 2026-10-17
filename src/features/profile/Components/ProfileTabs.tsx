export type ProfileTab = "posts" | "saved";

type Props = {
    activeTab: ProfileTab;
    onTabChange: (tab: ProfileTab) => void;
    isMe: boolean;
    count: number;
};
const tabClass = (active: boolean) =>
    `inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-bold cursor-pointer transition  ${active ? "bg-white text-main-color shadow-sm" : "text-slate-600 hover:text-slate-900"
    }`;

export default function ProfileTabs({ activeTab, onTabChange, isMe, count }: Props) {
    return (
        <div className="my-4  flex md:flex-none lg:flex-wrap items-center justify-between gap-2 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">

            <div className="flex w-full  flex-wrap items-center justify-between gap-2 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
                <div className="inline-flex gap-1 rounded-xl bg-slate-100 p-1.5">
                    <button onClick={() => onTabChange("posts")} className={tabClass(activeTab === "posts")}>
                        {isMe ? "My Posts" : "Posts"}
                    </button>

                    {isMe && (
                        <button onClick={() => onTabChange("saved")} className={tabClass(activeTab === "saved")}>
                            Saved
                        </button>
                    )}
                </div>

                <span className="rounded-full bg-[#e7f3ff] px-3 py-1 text-xs font-bold text-main-color">
                    {count}
                </span>
            </div>
        </div>

    );
}
