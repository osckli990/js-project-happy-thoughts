import { API_URL } from "../API";

export const Heart = ({ id, hearts, setThoughts, accessToken }) => {
  const handleLike = async () => {
    if (!accessToken) return; // block if not logged in

    try {
      const response = await fetch(`${API_URL}/thoughts/${id}/like`, {
        method: "POST",
        headers: {
          Authorization: accessToken,
        },
      });

      if (!response.ok) throw new Error("Failed to like the thought");

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
        className={`bg-heartgrey size-[50px] rounded-full flex items-center justify-center ${
          accessToken
            ? "cursor-pointer hover:bg-heartred"
            : "opacity-50 cursor-not-allowed"
        }`}
        tabIndex={0}
      >
        <img src="./heart.png" alt="" role="presentation" />
      </div>
      <p className="text-[10px] text-extragrey">X</p>
      <p className="text-[16px] text-extragrey">{hearts}</p>
    </div>
  );
};
