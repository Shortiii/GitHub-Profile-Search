//src/components/UserProfile.tsx
import React, { useState, useEffect } from "react";
import { fetchUserProfile } from "../lib/api";

const UserProfile = ({ username }: { username: string }) => {
  const [user, setUser] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadUser = async () => {
      try {
        setLoading(true);
        setError(null);

        const userProfile = await fetchUserProfile(username);
        setUser(userProfile);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [username]);

  if (loading) return <p className="text-center">Loading user profile...</p>;

  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div className="user-profile">
      {user && (
        <>
          <img
            src={user.avatar_url}
            alt={`${user.login}'s avatar`}
            className="user-avatar"
          />
          <h2 className="text-2xl font-semibold">{user.login}</h2>
          <p>{user.bio || "No bio available"}</p>
          <p>{user.location || "No location available"}</p>
          <p>Public Repositories: {user.public_repos}</p>
        </>
      )}
    </div>
  );
};

export default UserProfile;
