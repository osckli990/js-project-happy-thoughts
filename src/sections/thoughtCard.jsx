import { Heart } from "../components/Heart";
import { Thought } from "../components/Thought";
import { Time } from "../components/Time";

import { motion } from "framer-motion";
/*using framer motion to easily add animation. not supported by eslint?*/

export const ThoughtCard = ({ thought, setThoughts }) => {
  return (
    <>
      {thought.map((item) => (
        <motion.article
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          key={item._id}
          className="grid grid-cols-2 w-full border-1 border-bordergrey  shadow-smallscreenbox sm:shadow-box p-[20px] items-center"
          tabIndex={0}
        >
          <Thought message={item.message} />
          <Heart id={item._id} hearts={item.hearts} setThoughts={setThoughts} />
          <Time time={item.createdAt} />
        </motion.article>
      ))}
    </>
  );
};
