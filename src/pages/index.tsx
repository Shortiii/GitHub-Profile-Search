// src/pages/index.tsx
import { useState } from "react";
import UserProfile from "@/Components/UserProfile";
import RepositoryList from "@/Components/RepositoryList";
import SearchBar from "@/Components/SearchBar";

const HomePage = () => {
  const [username, setUsername] = useState<string | null>(null);

  const handleSearch = (newUsername: string) => {
    setUsername(newUsername);
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-6 text-center">
        GitHub Profile Search
      </h1>
      <SearchBar onSearch={handleSearch} />
      {username && (
        <>
          <UserProfile username={username} />
          <RepositoryList username={username} />
        </>
      )}
    </div>
  );
};

export default HomePage;
