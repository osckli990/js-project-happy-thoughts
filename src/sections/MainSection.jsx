import { useEffect, useState, useCallback } from "react";
import { API_URL, BASE_URL } from "../api";
import { MainCard } from "./mainCard";
import { ThoughtCard } from "./thoughtCard";
import { LoginForm } from "../components/LoginForm";
import { RegisterForm } from "../components/RegisterForm";
import { LoadingCard } from "./LoadingCard";
import { ErrorCard } from "./ErrorCard";

export const MainSection = ({
  accessToken,
  setAccessToken,
  loggedInUserId,
  setUserId,
}) => {
  const [thoughts, setThoughts] = useState([]);
  const [newThought, setNewThought] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const LIMIT = 5;

  const fetchData = useCallback(
    async (pageToFetch = 1) => {
      setLoading(true);
      try {
        const res = await fetch(
          `${BASE_URL}/thoughts?page=${pageToFetch}&limit=${LIMIT}`
        );
        if (!res.ok) throw new Error("Failed to fetch thoughts");
        const data = await res.json();

        setThoughts((prev) =>
          pageToFetch === 1 ? data.results : [...prev, ...data.results]
        );
        setHasMore(data.results.length === LIMIT);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    },
    [LIMIT]
  );

  // initial load
  useEffect(() => {
    fetchData(1);
  }, [fetchData]);

  // infinite scroll
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.scrollY + window.innerHeight >=
          document.documentElement.scrollHeight - 100 &&
        hasMore &&
        !loading
      ) {
        setPage((p) => p + 1);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore, loading]);

  // fetch on page bump
  useEffect(() => {
    if (page > 1) fetchData(page);
  }, [page, fetchData]);

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userId");
    setAccessToken(null);
    setUserId(null);
    setThoughts([]);
    setPage(1);
    setHasMore(true);
    setLoading(true);
    fetchData(); // reload fresh thoughts
  };

  return (
    <main className="w-full sm:w-[500px] mx-auto grid grid-cols-1 gap-[40px] mt-[40px] mb-[50px]">
      <div className="flex justify-center gap-4">
        <button
          onClick={() => {
            setShowLogin(!showLogin);
            setShowRegister(false);
          }}
          className="bg-black text-white px-4 py-2 rounded-full text-sm"
        >
          {showLogin ? "Close Login" : "Login"}
        </button>
        <button
          onClick={() => {
            setShowRegister(!showRegister);
            setShowLogin(false);
          }}
          className="bg-black text-white px-4 py-2 rounded-full text-sm"
        >
          {showRegister ? "Close Register" : "Register"}
        </button>
        {accessToken && (
          <button
            onClick={logout}
            className="bg-red-600 text-white px-4 py-2 rounded-full text-sm"
          >
            Logout
          </button>
        )}
      </div>

      {showLogin && (
        <LoginForm setAccessToken={setAccessToken} setUserId={setUserId} />
      )}
      {showRegister && <RegisterForm />}

      {!showLogin && !showRegister && (
        <>
          <MainCard
            setThoughts={setThoughts}
            newThought={newThought}
            setNewThought={setNewThought}
            accessToken={accessToken}
          />

          {error && <ErrorCard message={error} />}

          {thoughts.map((t) => (
            <ThoughtCard
              key={t._id}
              thought={t}
              setThoughts={setThoughts}
              accessToken={accessToken}
              loggedInUserId={loggedInUserId}
            />
          ))}

          {hasMore && loading && <LoadingCard />}
        </>
      )}
    </main>
  );
};
