import { useState } from "react";
import { API_URL, LOGIN_URL } from "../API";

export const LoginForm = ({ setAccessToken, setUserId, setView }) => {
  const [email, setEmail] = useState(""); // Changed to email!
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(LOGIN_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setAccessToken(data.accessToken);
        setUserId(data.id);
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("userId", data.id);
        setView(null); // Close form
      } else {
        setError(data.error || "Login failed");
      }
    } catch {
      setError("Something went wrong");
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className="border-1 border-black bg-maingrey text-black p-4 rounded shadow-smallscreenbox grid gap-3"
    >
      <h2 className="text-lg font-bold">Login</h2>
      {error && <p className="text-red-500 text-sm">{error}</p>}

      <input
        type="email"
        placeholder="Email"
        className="border p-2 rounded"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder="Password"
        className="border p-2 rounded"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <button
        type="submit"
        className="bg-black text-white p-2 rounded shadow-md hover:bg-gray-800 transition"
      >
        Log In
      </button>
    </form>
  );
};
