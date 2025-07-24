import { MainCard } from "./mainCard";
import { ThoughtCard } from "./ThoughtCard";
import { useState, useEffect } from "react";
import { LoadingCard } from "./LoadingCard";
import { ErrorCard } from "./ErrorCard";
import { API_URL } from "../API";
import { LoginForm } from "../components/LoginForm";
import { RegisterForm } from "../components/RegisterForm";

export const MainSection = ({
  accessToken,
  loggedInUserId,
  setAccessToken,
  setUserId,
}) => {
  const [loading, setLoading] = useState(true);
  const [thought, setThoughts] = useState([]);
  const [newThought, setNewThought] = useState("");
  const [error, setError] = useState(null);
  const [mode, setMode] = useState(null); // null | "login" | "register"

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_URL);
      if (response.ok) {
        const data = await response.json();
        setThoughts(data.results);
      } else {
        const errData = await response.json();
        setError(errData.error || "Could not fetch thoughts");
      }
    } catch (err) {
      setError("Failed to fetch thoughts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (accessToken) {
      fetchData();
    }
  }, [accessToken, loggedInUserId]);

  const handleLogout = () => {
    localStorage.clear();
    setAccessToken(null);
    setUserId(null);
    setMode(null);
    setThoughts([]);
  };

  return (
    <main className="w-full sm:w-[500px] mx-auto grid grid-cols-1 gap-[40px] mt-[40px] mb-[50px]">

      {/* Auth UI toggles */}
      <section className="flex justify-center gap-4 mb-4">
        {!accessToken ? (
          <>
            <button
              onClick={() => setMode("login")}
              className="bg-black text-white px-4 py-2 rounded-full hover:opacity-80"
            >
              Login
            </button>
            <button
              onClick={() => setMode("register")}
              className="bg-black text-white px-4 py-2 rounded-full hover:opacity-80"
            >
              Register
            </button>
          </>
        ) : (
          <button
            onClick={handleLogout}
            className="bg-black text-white px-4 py-2 rounded-full hover:opacity-80"
          >
            Logout
          </button>
        )}
      </section>

      {/* Conditional Forms */}
      {mode === "login" && (
        <LoginForm
          setAccessToken={setAccessToken}
          setUserId={setUserId}
          setMode={setMode}
        />
      )}
      {mode === "register" && (
        <RegisterForm
          setAccessToken={setAccessToken}
          setUserId={setUserId}
          setMode={setMode}
        />
      )}

      {/* Main Content */}
      {mode === null && (
        <>
          {loading ? (
            <LoadingCard />
          ) : error ? (
            <ErrorCard message={error} />
          ) : (
            <>
              <MainCard
                setThoughts={setThoughts}
                newThought={newThought}
                setNewThought={setNewThought}
                accessToken={accessToken}
              />
              <ThoughtCard
                thought={thought}
                setThoughts={setThoughts}
                accessToken={accessToken}
                loggedInUserId={loggedInUserId}
              />
            </>
          )}
        </>
      )}
    </main>
  );
};