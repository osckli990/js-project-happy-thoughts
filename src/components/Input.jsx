import { useState } from "react";

export const Input = ({ setThoughts, newThought, setNewThought }) => {
  const [loading, setLoading] = useState(false);

  const maxChars = 140;
  const minChars = 5;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newThought.trim().length < minChars || newThought.length > maxChars)
      return;

    setLoading(true);

    try {
      const response = await fetch(
        "https://happy-thoughts-api-4ful.onrender.com/thoughts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message: newThought }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to post the thought");
      }

      const createdThought = await response.json();

      // Add new thought to the top of the list
      setThoughts((prev) => [createdThought, ...prev]);

      // Clear input field
      setNewThought("");
    } catch (error) {
      console.error("Error posting thought:", error);
    } finally {
      setLoading(false); //end loading. will run no matter what though
    }
  };

  const charCount = newThought.length;
  const isTooShort = charCount > 0 && charCount < minChars;
  const isMax = charCount === maxChars;
  const isTooLong = charCount > maxChars;

  return (
    <form
      id="thoughtForm"
      className="grid grid-cols-1 gap-[10px]"
      onSubmit={handleSubmit}
    >
      <label form="thoughtFrom" for="thoughtForm" className="text-[16px]">
        What's making you happy right now?
      </label>
      <textarea
        maxLength={maxChars}
        placeholder="React is making me happy!"
        id="textArea"
        value={newThought}
        className=" bg-white p-[10px] h-[60px] pb-[30px] border-1 border-bordergrey text-[16px]"
        onChange={(e) => {
          const value = e.target.value;
          if (value.length <= maxChars) {
            setNewThought(value);
          }
        }}
        rows={4}
      />

      {/* Character counter & validation feedback */}
      <p
        className={`text-sm ${
          isTooShort || isMax ? "text-red-500" : "text-extragrey"
        }`}
      >
        {charCount}/{maxChars} characters
        {isTooShort && " — too short!"}
        {isTooLong && " — too long!"}
        {/*since the textarea is capped, this currently doesn't display*/}
        {isMax && " — limit reached!"}
      </p>

      <button
        type="submit"
        id="buttonBox"
        disabled={isTooShort || isTooLong || loading}
        className={`flex px-[25px] mt-[10px] gap-[5px] bg-heartgrey hover:bg-heartred place-items-center h-[50px] rounded-full w-fit text-[16px] ${
          isTooShort || isTooLong || loading
            ? "opacity-50 cursor-not-allowed"
            : "cursor-pointer"
        }`}
      >
        <img src="./heart.png" alt="" role="presentation" />
        {loading ? "Sending..." : "Send Happy Thought"}
        <img src="./heart.png" alt="" role="presentation" />
      </button>
    </form>
  );
};

/*
add counter for input character length  
*/
