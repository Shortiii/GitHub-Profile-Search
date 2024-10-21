// src/pages/index.tsx
import { useState, useEffect } from "react";
import UserProfile from "@/components/UserProfile";
import RepositoryList from "@/components/RepositoryList";
import SearchBar from "@/components/SearchBar";
import { fetchUserProfile, fetchUserRepos } from "@/lib/api";

const HomePage = () => {
  const [username, setUsername] = useState<string | null>(null);
  const [user, setUser] = useState<any | null>(null); // To store user profile
  const [repos, setRepos] = useState<any[]>([]); // To store repositories
  const [page, setPage] = useState(1); // To track pagination for repos
  const [hasMoreRepos, setHasMoreRepos] = useState(true); // To track if more repos are available

  const handleSearch = (newUsername: string) => {
    setUsername(newUsername);
    setPage(1); // Reset page when a new user is searched
    setRepos([]); // Reset repos when a new user is searched
    setHasMoreRepos(true); // Reset repo loading flag
  };

  // Fetch user profile when username changes
  useEffect(() => {
    if (username) {
      fetchUserProfile(username).then(setUser).catch(console.error);
    }
  }, [username]);

  // Fetch user repos when username or page changes
  useEffect(() => {
    if (username) {
      fetchUserRepos(username, page)
        .then((newRepos) => {
          setRepos((prevRepos) => [...prevRepos, ...newRepos]);
          if (newRepos.length < 30) {
            setHasMoreRepos(false); // If fewer repos than expected, no more to load
          }
        })
        .catch(console.error);
    }
  }, [username, page]);

  // Function to load more repos
  const loadMoreRepos = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-6 text-center">
        GitHub Profile Search
      </h1>
      <SearchBar onSearch={handleSearch} />
      {user && (
        <>
          <UserProfile username={username!} />
          <RepositoryList
            username={username!}
            repos={repos}
            onNextPage={loadMoreRepos}
          />
        </>
      )}
    </div>
  );
};

export default HomePage;
