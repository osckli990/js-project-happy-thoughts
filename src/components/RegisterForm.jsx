import { useState } from "react";
import { BASE_URL } from "../api";

// Simple email regex: basic format check
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const RegisterForm = ({ setAccessToken, setUserId }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    general: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({ email: "", password: "", general: "" });

    // Client-side email format validation
    if (!EMAIL_REGEX.test(email)) {
      setErrors((prev) => ({
        ...prev,
        email: "Please enter a valid email address.",
      }));
      return;
    }

    try {
      const res = await fetch(`${BASE_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.errors) {
          const fieldErrors = {};
          for (const key of Object.keys(data.errors)) {
            fieldErrors[key] = data.errors[key].message;
          }
          setErrors((prev) => ({ ...prev, ...fieldErrors }));
        } else if (data.error) {
          setErrors((prev) => ({ ...prev, general: data.error }));
        }
        return;
      }

      setAccessToken(data.accessToken);
      setUserId(data.id);
    } catch {
      setErrors((prev) => ({
        ...prev,
        general: "Registration failed. Try again.",
      }));
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-4 border p-6 rounded shadow bg-white"
    >
      <h2 className="text-xl font-semibold">Register</h2>

      {errors.general && (
        <div className="text-red-600 text-sm bg-red-100 p-2 rounded">
          {errors.general}
        </div>
      )}

      <label className="text-sm flex flex-col">
        Email
        <input
          type="email"
          className="block w-full mt-1 p-2 border border-gray-300 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {errors.email && (
          <span className="text-red-600 text-xs mt-1">{errors.email}</span>
        )}
      </label>

      <label className="text-sm flex flex-col">
        Password
        <input
          type="password"
          className="block w-full mt-1 p-2 border border-gray-300 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {errors.password && (
          <span className="text-red-600 text-xs mt-1">{errors.password}</span>
        )}
      </label>

      <button
        type="submit"
        className="bg-black text-white px-4 py-2 rounded-full w-fit"
      >
        Register
      </button>
    </form>
  );
};
