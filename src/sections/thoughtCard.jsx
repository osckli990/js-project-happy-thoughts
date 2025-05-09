import { Heart } from "../components/Heart";
import { Thought } from "../components/Thought";
import { Time } from "../components/Time";

export const ThoughtCard = ({ thought, setThoughts }) => {
  return (
    <>
      {thought.map((item) => (
        <article
          key={item._id}
          id="ThoughtCard"
          className="grid grid-cols-2 w-full border-1 border-bordergrey  shadow-smallscreenbox sm:shadow-box p-[20px] items-center"
        >
          <Thought message={item.message} />
          <Heart id={item._id} hearts={item.hearts} setThoughts={setThoughts} />
          <Time time={item.createdAt} />
        </article>
      ))}
    </>
  );
};
