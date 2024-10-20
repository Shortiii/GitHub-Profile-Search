const GITHUB_API_URL = "https://api.github.com";

export const fetchUserProfile = async (username: string) => {
  const response = await fetch(`${GITHUB_API_URL}/users/${username}`);

  if (response.status === 404) {
    throw new Error("User not found");
  }

  if (response.status === 403) {
    throw new Error("API rate limit exceeded");
  }

  if (!response.ok) {
    throw new Error("Failed to fetch user profile");
  }

  return response.json();
};

export const fetchUserRepos = async (username: string, page: number = 1) => {
  const response = await fetch(
    `${GITHUB_API_URL}/users/${username}/repos?per_page=30&page=${page}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch repositories");
  }

  return response.json();
};
