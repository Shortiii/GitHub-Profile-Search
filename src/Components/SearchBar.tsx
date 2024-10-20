// src/components/SearchBar.tsx
import React, { useState } from "react";

interface SearchBarProps {
  onSearch: (username: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [username, setUsername] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(username);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 form-bar">
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter GitHub username"
        className="border p-2 rounded mr-2"
        required
      />
      <button type="submit" className="p-2 bg-blue-600 text-white rounded">
        Search
      </button>
    </form>
  );
};

export default SearchBar;
