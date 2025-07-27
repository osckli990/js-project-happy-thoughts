import { motion } from "framer-motion";
import { Heart } from "../components/Heart";
import { Thought } from "../components/Thought";
import { Time } from "../components/Time";
import { BASE_URL } from "../api";

/* Displays a single thought with animation and edit/delete if it's the user's own */
export const ThoughtCard = ({
  thought,
  setThoughts,
  accessToken,
  loggedInUserId,
}) => {
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${BASE_URL}/thoughts/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: accessToken,
        },
      });

      if (res.status === 204) {
        setThoughts((prev) => prev.filter((t) => t._id !== id));
      } else {
        const data = await res.json();
        alert(data.error);
      }
    } catch (err) {
      alert("Error deleting thought");
    }
  };

  const handleEdit = async (id, oldMessage) => {
    const newMessage = prompt("Edit your thought:", oldMessage);
    if (!newMessage) return;

    try {
      const res = await fetch(`${BASE_URL}/thoughts/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken,
        },
        body: JSON.stringify({ message: newMessage }),
      });

      if (res.ok) {
        const updated = await res.json();
        setThoughts((prev) => prev.map((t) => (t._id === id ? updated : t)));
      } else {
        const data = await res.json();
        alert(data.error);
      }
    } catch {
      alert("Error editing thought");
    }
  };

  return (
    <motion.article
      key={thought._id}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="grid grid-cols-2 w-full border-1 border-bordergrey shadow-smallscreenbox sm:shadow-box p-[20px] items-center"
      tabIndex={0}
    >
      <Thought message={thought.message} />
      <Heart
        id={thought._id}
        hearts={thought.hearts}
        setThoughts={setThoughts}
        accessToken={accessToken}
      />
      <Time time={thought.createdAt} />

      {thought.createdBy === loggedInUserId && (
        <div className="col-span-2 mt-2 flex gap-3 justify-center">
          <button
            onClick={() => handleEdit(thought._id, thought.message)}
            className="bg-black text-white text-sm px-4 py-1 rounded-full"
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(thought._id)}
            className="bg-black text-white text-sm px-4 py-1 rounded-full"
          >
            Delete
          </button>
        </div>
      )}
    </motion.article>
  );
};
