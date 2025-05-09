export const Input = ({ thought, setThoughts, newThought, setNewThought }) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(thought);

    if (!newThought.trim()) return; // Optional: avoid empty messages

    try {
      const response = await fetch(
        "https://happy-thoughts-ux7hkzgmwa-uc.a.run.app/thoughts",
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
    }
  };

  return (
    <form
      id="thoughtForm"
      className="grid grid-cols-1 gap-[10px]"
      onSubmit={handleSubmit}
    >
      <label form="Thought" className="text-[16px]">
        What's making you happy right now?
      </label>
      <input
        type="text"
        placeholder="React is making me happy!"
        id="Thought"
        className=" bg-white p-[10px] h-[60px] pb-[30px] border-1 border-bordergre text-[16px]"
        onChange={(e) => setNewThought(e.target.value)}
      />
      <button
        type="submit"
        id="buttonBox"
        className="flex px-[25px] mt-[10px] gap-[5px] bg-heartgrey hover:bg-heartred place-items-center h-[50px] rounded-full w-fit cursor-pointer text-[16px]"
      >
        <img src="./heart.png" alt="" role="presentation" />
        Send Happy Thought
        <img src="./heart.png" alt="" role="presentation" />
      </button>
    </form>
  );
};

/*
add counter for input character length  
*/
