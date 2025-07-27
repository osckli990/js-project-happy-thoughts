import { useState } from "react";
import { API_URL, BASE_URL } from "../api";

export const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${BASE_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || "Registration failed");
        return;
      }

      setSuccess(true);
      setEmail("");
      setPassword("");
      setErrorMsg("");
    } catch (err) {
      setErrorMsg("Something went wrong.");
    }
  };

  return (
    <form
      onSubmit={handleRegister}
      className="grid gap-4 border p-6 rounded shadow bg-white"
    >
      <h2 className="text-xl font-semibold">Register</h2>

      <label className="text-sm">
        Username
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
      {success && (
        <p className="text-green-600 text-sm">Registration successful!</p>
      )}

      <button
        type="submit"
        className="bg-black text-white px-4 py-2 rounded-full w-fit"
      >
        Register
      </button>
    </form>
  );
};
