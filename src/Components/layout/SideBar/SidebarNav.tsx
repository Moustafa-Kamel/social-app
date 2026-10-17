import { Bookmark, ChartLineLabel, Layers, PersonPlanetEarth } from "@gravity-ui/icons";
import { NavLink } from "react-router";

const links = [
  { to: "/feed", label: "Feed", icon: <Layers/>},
  { to: "/my-posts", label: "My Posts", icon: <PersonPlanetEarth/>},
  { to: "/community", label: "Community", icon: <ChartLineLabel/>},
  { to: "/saved", label: "Saved", icon: <Bookmark/>},
];

export default function SidebarNav() {
  return (
    <nav className="flex flex-col gap-1 rounded-2xl border border-slate-200 bg-white p-2 shadow-sm max-xl:flex-row max-xl:overflow-x-auto">
      {links.map((l) => (
        <NavLink
          key={l.to}
          to={l.to}
          className={({ isActive }) =>
            `rounded-lg px-3 flex gap-2 py-2 text-sm  font-semibold whitespace-nowrap ${
              isActive ? "bg-main-color text-white" : "text-slate-600 hover:bg-main-color/10"
            }`
          }
        >
            {l.icon}
          {l.label}
        </NavLink>
      ))}
    </nav>
  );
}