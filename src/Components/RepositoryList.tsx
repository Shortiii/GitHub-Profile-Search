// src/components/RepoList.tsx
import React, { useState, useEffect } from "react";
import { fetchUserRepos } from "../lib/api";

const RepositoryList = ({ username }: { username: string }) => {
  const [repos, setRepos] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadRepos = async () => {
      try {
        setLoading(true);
        setError(null);

        const newRepos = await fetchUserRepos(username, page);
        setRepos((prevRepos) => [...prevRepos, ...newRepos]);

        if (newRepos.length < 30) {
          setHasMore(false);
        }
      } catch (error: any) {
        setError("Failed to load repositories");
      } finally {
        setLoading(false);
      }
    };

    loadRepos();
  }, [page, username]);

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div className="repo-list">
      <h3 className=" font-semibold mb-4">Repositories</h3>

      {error && <p className="text-red-500">{error}</p>}

      <ul>
        {repos.map((repo) => (
          <li key={repo.id} className="mb-4">
            <a
              href={repo.html_url}
              className="text-blue-500 font-semibold"
              target="_blank"
              rel="noopener noreferrer"
            >
              {repo.name}
            </a>
            <p>{repo.description || "No description available"}</p>
            <p>
              ⭐ {repo.stargazers_count} | 🍴 {repo.forks_count}
            </p>
          </li>
        ))}
      </ul>

      {loading && <p>Loading repositories...</p>}

      {hasMore && !loading && (
        <button
          onClick={handleLoadMore}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
        >
          Load More
        </button>
      )}

      {!hasMore && <p>No more repositories to load.</p>}
    </div>
  );
};

export default RepositoryList;
