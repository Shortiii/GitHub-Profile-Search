// src/components/RepositoryList.tsx
import React, { useState } from "react"; // Make sure useState is imported

interface RepositoryListProps {
  username: string;
  repos: any[]; // Adjust the type according to your repo structure
  onNextPage: () => void;
}

const RepositoryList: React.FC<RepositoryListProps> = ({
  username,
  repos,
  onNextPage,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLoadMore = () => {
    setLoading(true);
    onNextPage(); // Call the onNextPage function passed as a prop
    setLoading(false);
  };

  return (
    <div className="repo-list">
      <h3 className="font-semibold mb-4">Repositories for {username}</h3>

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

      <button
        onClick={handleLoadMore}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
      >
        Load More
      </button>
    </div>
  );
};

export default RepositoryList;
