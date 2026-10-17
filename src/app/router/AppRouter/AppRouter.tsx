import { createBrowserRouter, Navigate, Outlet } from "react-router";
import Login from "../../../pages/Login/Login";
import Register from "../../../pages/Register/Register";
import NotFound from "../../../pages/NotFound/NotFound";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import AuthProtected from "../AuthProtected/AuthProtected";
import Feed from "../../../pages/Feed/Feed";
import PostDetails from "../../../pages/PostDetails/PostDetails";
import HomeLayout from "../../../Components/layout/HomeLayout/HomeLayout";
import Community from "../../../pages/community/Community";
import MyPosts from "../../../pages/myPosts/MyPosts";
import Saved from "../../../pages/saved/Saved";
import MainLayout from "../../../Components/layout/mainLayout/MainLayout";
// import SuggestedFriends from "../../../features/users/components/SuggestedFriends";
import Suggestions from "../../../pages/suggestions/Suggestions";
import NotificationsPage from "../../../pages/NotificationsPage/NotificationsPage";
import Profile from "../../../pages/Profile/Profile";
import Settings from "../../../pages/Settings/Settings";


export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        element: <ProtectedRoute><Outlet /></ProtectedRoute>,
        children: [
          { index: true, element: <Navigate to="/feed" replace /> },
          { path: "settings", element: <Settings /> },
          {
            element: <HomeLayout />,
            children: [
              { path: "feed", element: <Feed /> },
              { path: "community", element: <Community /> },
              { path: "my-posts", element: <MyPosts /> },
              { path: "saved", element: <Saved /> },

            ],
          },
          { path: "postDetails/:id", element: <PostDetails /> },
          { path: "suggestions", element: <Suggestions /> },
          { path: "notifications", element: <NotificationsPage /> },
          { path: "profile/:id", element: <Profile /> },


        ],
      },
      {
        element: <AuthProtected><Outlet /></AuthProtected>,
        children: [
          { path: "login", element: <Login /> },
          { path: "register", element: <Register /> },
        ],
      },
      { path: "*", element: <NotFound /> },
    ],
  },
])