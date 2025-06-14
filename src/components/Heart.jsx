export const Heart = ({ id, hearts, setThoughts }) => {
  const handleLike = async () => {
    try {
      const response = await fetch(
        `https://happy-thoughts-api-4ful.onrender.com/thoughts/${id}/like`,
        {
          method: "POST",
        }
      );

      if (!response.ok) throw new Error("Failed to like the thought");

      // Optimistically update ui
      setThoughts((prev) =>
        prev.map((thought) =>
          thought._id === id
            ? { ...thought, hearts: thought.hearts + 1 }
            : thought
        )
      );
    } catch (err) {
      console.error("Liking failed:", err);
    }
  };

  return (
    <div className="flex items-center gap-[5px] like-class">
      <div
        onClick={handleLike}
        className="bg-heartgrey size-[50px] rounded-full flex items-center justify-center cursor-pointer hover:bg-heartred"
        tabIndex={0}
      >
        <img src="./heart.png" alt="" role="presentation" />
      </div>
      <p className="text-[10px] text-extragrey">X</p>
      <p className="text-[16px] text-extragrey">{hearts}</p>
    </div>
  );
};

/*if heart has likes, turn background red*/
