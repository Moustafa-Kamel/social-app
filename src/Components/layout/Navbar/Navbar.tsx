import { useContext} from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { useQueryClient } from "@tanstack/react-query";
import { Avatar, Button, Dropdown, Header, Label } from "@heroui/react";
import { Educare, Logout, NotificationCircle, Profile, ProfileCircle, Setting2 } from "iconsax-reactjs";
import { Layers } from "@gravity-ui/icons";
import AppButton from "../../../SharedComponents/AppButton/AppButton";
import { UserAuthContext } from "../../../app/providers/UserAuthProvider/UserAuthContext";
import { useUnreadCount } from "../../../features/notifications/notifications.hooks";

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `relative flex items-center justify-center gap-1.5 rounded-xl px-2.5 py-2 text-sm font-extrabold transition sm:gap-2 sm:px-3.5 ${
    isActive ? "bg-white text-main-color!" : "text-black"
  }`;

export default function Navbar() {
  const { userData, setUserData } = useContext(UserAuthContext);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data } = useUnreadCount(!!userData)
  const count = data?.data?.unreadCount ?? 0;

  const handleSignOut = () => {
    localStorage.removeItem("user_tkn");
    queryClient.clear();
    setUserData(null);
    navigate("/login");
  };

  const handleMenuAction = (key: React.Key) => {
    if (key === "profile") navigate(`/profile/${userData?._id}`);
    if (key === "settings") navigate("/settings");
    if (key === "signout") handleSignOut();
  };

  // اللينكات: بتتعرض في النص (ديسكتوب) وتحت الشريط (موبايل)
  const navLinks = userData && (
    <ul className="flex min-w-0 items-center gap-1 rounded-2xl border border-slate-200 bg-slate-50/90 px-1 py-1 sm:px-1.5">
      <li>
        <NavLink to="/feed" className={linkClass} >
          <Layers width={20} height={20} />
          Feed
        </NavLink>
      </li>
      <li>
        <NavLink to={`/profile/${userData._id}`} className={linkClass} >
          <ProfileCircle size="20" />
          Profile
        </NavLink>
      </li>
      <li>
        <NavLink to="/notifications" className={linkClass} >
          <NotificationCircle size="20" />
          Notifications
          {count > 0 && (
            <span className="absolute -right-1 -top-1 rounded-full bg-red-500 px-1.5 text-[10px] font-bold text-white">
              {count > 99 ? "99+" : count}
            </span>
          )}
        </NavLink>
      </li>
    </ul>
  );

  return (
    <header className="sticky top-0 z-20 w-full border-b border-default bg-white shadow-xl">
      <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-3 p-3 sm:p-4">
        {/* الشمال: اللوجو */}
        <div className="flex flex-1 justify-start">
          <Link to="/feed">
            <Educare size="50" color="#2ccce4" variant="Outline" />
          </Link>
        </div>

        {/* النص: اللينكات (ديسكتوب بس) */}
        <div className="hidden md:flex">{navLinks}</div>

        {/* اليمين: الأفاتار + hamburger */}
        <div className="flex flex-1 items-center justify-end gap-2">
          {userData ? (
            <Dropdown>
              <Button isIconOnly aria-label="User menu" className="h-10 w-10 min-w-0 rounded-full bg-transparent p-0">
                <Avatar>
                  <Avatar.Image alt={userData.username} src={userData.photo} />
                  <Avatar.Fallback>{userData.name?.[0]?.toUpperCase() ?? "U"}</Avatar.Fallback>
                </Avatar>
              </Button>

              <Dropdown.Popover className="min-w-56">
                <div className="flex items-center gap-3 border-b border-slate-100 px-4 py-3">
                  <Avatar className="h-10 w-10">
                    <Avatar.Image alt={userData.username} src={userData.photo} />
                    <Avatar.Fallback>{userData.name?.[0]?.toUpperCase() ?? "U"}</Avatar.Fallback>
                  </Avatar>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-extrabold text-slate-900">{userData.name}</p>
                    <p className="truncate text-xs text-slate-500">@{userData.username}</p>
                  </div>
                </div>

                <Dropdown.Menu onAction={handleMenuAction}>
                  <Dropdown.Section>
                    <Header>Account</Header>
                    <Dropdown.Item id="profile" textValue="My Profile">
                      <Profile size={18} variant="Outline" className="text-slate-500" />
                      <Label>My Profile</Label>
                    </Dropdown.Item>
                    <Dropdown.Item id="settings" textValue="Settings">
                      <Setting2 size={18} variant="Outline" className="text-slate-500" />
                      <Label>Settings</Label>
                    </Dropdown.Item>
                  </Dropdown.Section>

                  <Dropdown.Section>
                    <Dropdown.Item id="signout" textValue="Sign out" variant="danger">
                      <Logout size={18} variant="Outline" />
                      <Label>Sign out</Label>
                    </Dropdown.Item>
                  </Dropdown.Section>
                </Dropdown.Menu>
              </Dropdown.Popover>
            </Dropdown>
          ) : (
            <div className="flex gap-3">
              <AppButton className="bg-main-color hover:bg-main-color/80" onPress={() => navigate("/login")}>
                Login
              </AppButton>
              <AppButton className="bg-main-color hover:bg-main-color/80" onPress={() => navigate("/register")}>
                Register
              </AppButton>
            </div>
          )}

          {/* {userData && (
            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              aria-expanded={mobileOpen}
              className="inline-flex h-10 w-10 items-center justify-center rounded-base p-2 text-body hover:bg-neutral-secondary-soft focus:outline-none focus:ring-2 focus:ring-neutral-tertiary md:hidden"
            >
              <span className="sr-only">Open main menu</span>
              <svg className="h-6 w-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeWidth={2} d="M5 7h14M5 12h14M5 17h14" />
              </svg>
            </button>
          )} */}
        </div>
      </div>
    </header>
  );
}