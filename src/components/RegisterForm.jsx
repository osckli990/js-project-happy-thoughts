import { useState } from "react";
import { API_URL, REG_URL } from "../API";

export const RegisterForm = ({ setAccessToken, setUserId, setView }) => {
  const [email, setEmail] = useState(""); // Switched to email
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(`${REG_URL}`, {
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
        setError(data.error || "Registration failed");
      }
    } catch {
      setError("Something went wrong");
    }
  };

  return (
    <form
      onSubmit={handleRegister}
      className="border-1 border-black bg-maingrey text-black p-4 rounded shadow-smallscreenbox grid gap-3"
    >
      <h2 className="text-lg font-bold">Register</h2>
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
        placeholder="Password (min 6 chars)"
        className="border p-2 rounded"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        minLength={6}
        required
      />

      <button
        type="submit"
        className="bg-black text-white p-2 rounded shadow-md hover:bg-gray-800 transition"
      >
        Register
      </button>
    </form>
  );
};
