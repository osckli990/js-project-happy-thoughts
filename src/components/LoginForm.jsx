import { useState } from "react";
import { API_URL } from "../API";

export const LoginForm = ({ setAccessToken, setUserId, setView }) => {
  const [email, setEmail] = useState(""); // Changed to email!
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(`${API_URL}/login`, {
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
      className="bg-white border p-4 rounded shadow grid gap-3"
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
        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        Log In
      </button>
    </form>
  );
};
