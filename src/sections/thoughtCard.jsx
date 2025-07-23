import { Heart } from "../components/Heart";
import { Thought } from "../components/Thought";
import { Time } from "../components/Time";
import { motion } from "framer-motion";

export const ThoughtCard = ({
  thought,
  setThoughts,
  accessToken,
  loggedInUserId,
}) => {
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:8080/thoughts/${id}`, {
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
      const res = await fetch(`http://localhost:8080/thoughts/${id}`, {
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
    } catch (err) {
      alert("Error editing thought");
    }
  };

  return (
    <>
      {thought.map((item) => (
        <motion.article
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          key={item._id}
          className="grid grid-cols-2 w-full border-1 border-bordergrey shadow-smallscreenbox sm:shadow-box p-[20px] items-center"
          tabIndex={0}
        >
          <Thought message={item.message} />
          <Heart
            id={item._id}
            hearts={item.hearts}
            setThoughts={setThoughts}
            accessToken={accessToken}
          />
          <Time time={item.createdAt} />

          {/* Owner-only edit/delete buttons */}
          {item.createdBy === loggedInUserId && (
            <div className="col-span-2 mt-2 flex gap-4 justify-center">
              <button
                onClick={() => handleEdit(item._id, item.message)}
                className="bg-yellow-300 px-3 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(item._id)}
                className="bg-red-400 px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          )}
        </motion.article>
      ))}
    </>
  );
};
