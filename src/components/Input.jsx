import { useState } from "react";
import { API_URL } from "../API";

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

    if (!accessToken) return; // block if not logged in

    if (newThought.trim().length < minChars || newThought.length > maxChars)
      return;

    setLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken, // add token here
        },
        body: JSON.stringify({ message: newThought }),
      });

      if (!response.ok) {
        throw new Error("Failed to post the thought");
      }

      const createdThought = await response.json();
      setThoughts((prev) => [createdThought, ...prev]);
      setNewThought("");
    } catch (error) {
      console.error("Error posting thought:", error);
    } finally {
      setLoading(false);
    }
  };

  const charCount = newThought.length;
  const isTooShort = charCount > 0 && charCount < minChars;
  const isMax = charCount === maxChars;
  const isTooLong = charCount > maxChars;

  const isDisabled = isTooShort || isTooLong || loading || !accessToken;

  return (
    <form
      id="thoughtForm"
      className="grid grid-cols-1 gap-[10px]"
      onSubmit={handleSubmit}
    >
      <label htmlFor="thoughtForm" className="text-[16px] text-white">
        What's making you happy right now?
      </label>
      <textarea
        maxLength={maxChars}
        placeholder="React is making me happy!"
        id="textArea"
        value={newThought}
        className="bg-white p-[10px] h-[60px] pb-[30px] border-1 border-gray-300 text-[16px] text-white"
        onChange={(e) => {
          const value = e.target.value;
          if (value.length <= maxChars) {
            setNewThought(value);
          }
        }}
        rows={4}
        disabled={!accessToken}
      />

      <p
        className={`text-sm ${
          isTooShort || isMax ? "text-red-500" : "text-extragrey"
        }`}
      >
        {charCount}/{maxChars} characters
        {isTooShort && " — too short!"}
        {isTooLong && " — too long!"}
        {isMax && " — limit reached!"}
        {!accessToken && " — please log in to post"}
      </p>

      <button
        type="submit"
        id="buttonBox"
        disabled={isDisabled}
        className={`flex px-[25px] mt-[10px] gap-[5px] bg-black hover:bg-neutral-800 place-items-center h-[50px] rounded-full w-fit text-[16px] text-white ${
          isDisabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
        }`}
      >
        <img src="./heart.png" alt="" role="presentation" />
        {loading ? "Sending..." : "Send Happy Thought"}
        <img src="./heart.png" alt="" role="presentation" />
      </button>
    </form>
  );
};
