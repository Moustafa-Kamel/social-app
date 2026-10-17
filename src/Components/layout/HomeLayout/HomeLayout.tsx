  import { Outlet } from "react-router";
  import SidebarNav from "../SideBar/SidebarNav";
  import SuggestedFriends from "../../../features/users/components/SuggestedFriends";

  export default function HomeLayout() {
    return (
      <>
        <div className="grid gap-4 xl:grid-cols-[240px_minmax(0,1fr)_300px]">
          <aside className="hidden h-fit space-y-3 xl:sticky xl:top-21 xl:block">
            {<SidebarNav />}
          </aside>
          <section className="min-w-0 space-y-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-2 shadow-sm xl:hidden">
              <SidebarNav/> 
            </div>
            <Outlet />
          </section>
          <aside className="hidden h-fit space-y-3 xl:sticky xl:top-21 xl:block">
          <SuggestedFriends /> 
        </aside>
        </div>
      </>
    )
  }
