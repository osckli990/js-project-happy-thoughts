import { useState } from "react";
import { API_URL, BASE_URL } from "../api";

export const LoginForm = ({ setAccessToken, setUserId }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || "Something went wrong");
        return;
      }

      setAccessToken(data.accessToken);
      setUserId(data.id);
      setErrorMsg("");
    } catch (err) {
      setErrorMsg("Something went wrong. Please try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-4 border p-6 rounded shadow bg-white"
    >
      <h2 className="text-xl font-semibold">Login</h2>

      <label className="text-sm">
        Email
        <input
          type="text"
          className="block w-full mt-1 p-2 border border-gray-300 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>

      <label className="text-sm">
        Password
        <input
          type="password"
          className="block w-full mt-1 p-2 border border-gray-300 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>

      {errorMsg && <p className="text-red-600 text-sm">{errorMsg}</p>}

      <button
        type="submit"
        className="bg-black text-white px-4 py-2 rounded-full w-fit"
      >
        Login
      </button>
    </form>
  );
};
