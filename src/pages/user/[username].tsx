import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { fetchUserProfile, fetchUserRepos } from "@/lib/api";
import UserProfile from "@/Components/UserProfile";
import RepositoryList from "@/Components/RepositoryList";

const UserPage = () => {
  const router = useRouter();
  const { username } = router.query;
  const [user, setUser] = useState<any>(null);
  const [repos, setRepos] = useState<any[]>([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (username) {
      fetchUserProfile(username as string)
        .then(setUser)
        .catch(console.error);
      fetchUserRepos(username as string)
        .then(setRepos)
        .catch(console.error);
    }
  }, [username]);

  const loadMoreRepos = () => {
    fetchUserRepos(username as string, page + 1)
      .then((newRepos) => {
        setRepos([...repos, ...newRepos]);
        setPage(page + 1);
      })
      .catch(console.error);
  };

  return user ? (
    <div className="container mx-auto p-4">
      <UserProfile username={user} />
      <RepositoryList repos={repos} onNextPage={loadMoreRepos} />
    </div>
  ) : (
    <p>Loading...</p>
  );
};

export default UserPage;
