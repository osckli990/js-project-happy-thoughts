import { useState } from "react";
import { API_URL, BASE_URL } from "../api";

export const Input = ({
  setThoughts,
  newThought,
  setNewThought,
  accessToken,
}) => {
  const [loading, setLoading] = useState(false);
  const maxChars = 140;
  const minChars = 5;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newThought.trim().length < minChars || newThought.length > maxChars)
      return;

    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/thoughts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken || "", // optional for anonymous
        },
        body: JSON.stringify({ message: newThought }),
      });

      if (!response.ok) throw new Error("Failed to post the thought");

      const created = await response.json();
      setThoughts((prev) => [created, ...prev]);
      setNewThought("");
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const charCount = newThought.length;
  const isTooShort = charCount > 0 && charCount < minChars;
  const isTooLong = charCount > maxChars;
  const isDisabled = isTooShort || isTooLong || loading;

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-[10px]">
      <label htmlFor="textArea" className="text-[16px]">
        What's making you happy right now?
      </label>

      <textarea
        id="textArea"
        value={newThought}
        onChange={(e) => setNewThought(e.target.value)}
        maxLength={maxChars}
        rows={4}
        className="bg-white p-[10px] h-[60px] pb-[30px] border-1 border-bordergrey text-[16px]"
        placeholder="React is making me happy!"
      />

      <p
        className={`text-sm ${
          isTooShort || isTooLong ? "text-red-500" : "text-extragrey"
        }`}
      >
        {charCount}/{maxChars} characters
        {isTooShort && " — too short!"}
        {isTooLong && " — too long!"}
      </p>

      <button
        type="submit"
        disabled={isDisabled}
        className={`flex gap-2 px-6 py-3 rounded-full text-white font-medium transition ${
          isDisabled
            ? "bg-heartgrey cursor-not-allowed opacity-50"
            : "bg-black hover:bg-gray-800 cursor-pointer"
        }`}
      >
        <img src="./heart.png" alt="heart" className="w-5 h-5" />
        {loading ? "Sending..." : "Send Happy Thought"}
        <img src="./heart.png" alt="heart" className="w-5 h-5" />
      </button>
    </form>
  );
};
