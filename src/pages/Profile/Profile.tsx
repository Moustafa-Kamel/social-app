import { useContext, useState } from "react";
import { UserAuthContext } from "../../app/providers/UserAuthProvider/UserAuthContext";
import { useParams } from "react-router";
import { useBookmarkStats, useUploadPhoto, useUserPostsCount, useUserProfile } from "../../features/profile/profile.hooks";
import { useToggleFollow } from "../../features/users/users.hooks";
import LoadingSpinner from "../../Components/ui/LoadingSpinner/LoadingSpinner";
import CreatePost from "../../features/posts/components/CreatePost";
import PostsList from "../../features/posts/components/PostsList";
import { getBookmarks, getUserPosts } from "../../features/posts/posts.api";
import ProfileCover from "../../features/profile/Components/ProfileCover";
import ProfileHeader from "../../features/profile/Components/ProfileHeader";
import ProfileStats from "../../features/profile/Components/ProfileStats";
import ProfileAbout from "../../features/profile/Components/ProfileAbout";
import ProfileTabs from "../../features/profile/Components/ProfileTabs";

export default function Profile() {
  const { id } = useParams<{ id: string }>();
  const { userData } = useContext(UserAuthContext);
  const [tab, setTab] = useState<"posts" | "saved">("posts");

  const { data, isPending, isError } = useUserProfile(id ?? "");
  const follow = useToggleFollow();
  const upload = useUploadPhoto();
  const { user, isFollowing = false } = data?.data ?? {};
  const isMe = !!user && userData?._id === user._id;
  const { data: postsCount = 0 } = useUserPostsCount(user?._id ?? "");

  const { data: stats } = useBookmarkStats(!!user && isMe);
  const bookmarksCount = stats?.bookmarks ?? 0;
  const savedPostsCount = stats?.savedPosts ?? 0;

  if (isPending) return <LoadingSpinner />;
  if (isError || !user) {
    return <p className="py-8 text-center text-red-500">User not found</p>;
  }

  const activeTab = isMe ? tab : "posts";



  return (
    <div className="space-y-4">
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_2px_10px_rgba(15,23,42,.06)] sm:rounded-[28px]">

        {/* Cover Section */}
        <ProfileCover cover={user.cover} />

        {/* Main Info Container */}
        <div className="relative -mt-12 px-3 pb-5 sm:-mt-16 sm:px-8 sm:pb-6">
          <div className="rounded-3xl border border-white/60 bg-white/92 p-5 backdrop-blur-xl sm:p-7">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">

              {/* Avatar & User Details */}
              <ProfileHeader
                user={user}
                isMe={isMe}
                isFollowing={isFollowing}
                isFollowPending={follow.isPending}
                isUploading={upload.isPending}
                onFollowClick={() => follow.mutate(user._id)}
                onPhotoChange={(file) => upload.mutate(file)}
              />
              <ProfileStats
                followers={user.followersCount}
                following={user.followingCount}
                bookmarks={isMe ? bookmarksCount : undefined}
              />

            </div>

            {/* About Section & Activity Cards */}
            <ProfileAbout email={user.email}
              isMe={isMe}
              postsCount={postsCount}
              savedCount={savedPostsCount} />

          </div>
        </div>
      </section>




      <ProfileTabs
        activeTab={activeTab}
        onTabChange={setTab}
        isMe={isMe}
        count={activeTab === "posts" ? postsCount : savedPostsCount}
      />

      <div className="space-y-3">
        {activeTab === "posts" ? (
          <>
            {isMe && <CreatePost />}
            <PostsList
              key={`posts-${user._id}`}
              queryKey={`user-${user._id}`}
              fetcher={(page) => getUserPosts(user._id, page)}
             paginate={false} emptyMessage="No saved posts yet."
            />
          </>
        ) : (
          <PostsList
            key="saved"
            queryKey="saved"
            fetcher={getBookmarks}
            emptyMessage="No saved posts yet."
            paginate={false}
          />
        )}
      </div>
    </div>


  );
}