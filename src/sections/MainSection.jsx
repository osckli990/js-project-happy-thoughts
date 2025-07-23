import { MainCard } from "./mainCard";
import { ThoughtCard } from "./ThoughtCard";
import { useState, useEffect } from "react";
import { LoadingCard } from "./LoadingCard";
import { ErrorCard } from "./ErrorCard";
import { API_URL } from "../api";
import { LoginForm } from "./components/LoginForm";
import { RegisterForm } from "./components/RegisterForm";

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
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/thoughts`);
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
    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setAccessToken(null);
    setUserId(null);
  };

  return (
    <main className="w-full sm:w-[500px] mx-auto grid grid-cols-1 gap-[40px] mt-[40px] mb-[50px]">
      {/* 🔐 Auth toggle buttons */}
      <div className="flex justify-between items-center mb-4">
        {!accessToken ? (
          <>
            <button
              className="bg-blue-500 text-white px-4 py-1 rounded"
              onClick={() => {
                setShowLogin(true);
                setShowRegister(false);
              }}
            >
              Login
            </button>
            <button
              className="bg-green-500 text-white px-4 py-1 rounded"
              onClick={() => {
                setShowRegister(true);
                setShowLogin(false);
              }}
            >
              Register
            </button>
          </>
        ) : (
          <button
            className="bg-gray-300 px-4 py-1 rounded font-bold"
            onClick={handleLogout}
          >
            Logout
          </button>
        )}
      </div>

      {/* 🔽 Toggle login/register forms inline */}
      {showLogin && !accessToken && (
        <LoginForm
          setAccessToken={setAccessToken}
          setUserId={setUserId}
          setView={() => setShowLogin(false)}
        />
      )}
      {showRegister && !accessToken && (
        <RegisterForm
          setAccessToken={setAccessToken}
          setUserId={setUserId}
          setView={() => setShowRegister(false)}
        />
      )}

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
    </main>
  );
};
