import { useState } from "react";
import UserProfile from "@/components/UserProfile";
import RepositoryList from "@/components/RepositoryList";
import SearchBar from "@/components/SearchBar";

const HomePage = () => {
  const [username, setUsername] = useState<string | null>(null);

  const handleSearch = (newUsername: string) => {
    setUsername(newUsername);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">GitHub Profile Search</h1>

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
