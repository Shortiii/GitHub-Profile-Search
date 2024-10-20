import "../styles/globals.css";
import { useState, useEffect } from "react";
import { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  const [darkMode, setDarkMode] = useState<boolean>(false);

  // Initialize dark mode from localStorage
  useEffect(() => {
    const isDarkMode = localStorage.getItem("dark-mode") === "true";
    setDarkMode(isDarkMode);
    document.body.classList.toggle("dark", isDarkMode); // Apply the "dark" class to the body
  }, []);

  // Function to toggle dark mode
  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem("dark-mode", String(newDarkMode));
    document.body.classList.toggle("dark", newDarkMode); // Toggle "dark" class on the body
  };

  return (
    <div className="app-container">
      <div className="toggle-container">
        <h2>{darkMode ? "Light Mode" : "Dark Mode"}</h2>
        <button onClick={toggleDarkMode} className="toggle-btn">
          Click Here
        </button>
      </div>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
