import { Heart } from "../components/Heart";
import { Thought } from "../components/Thought";
import { Time } from "../components/Time";

export const ThoughtCard = () => {
  return (
    <article
      id="ThoughtCard"
      className="grid grid-cols-2 w-full border-1 border-bordergrey  shadow-smallscreenbox sm:shadow-box p-[20px]"
    >
      <Thought />
      <Heart />
      <Time />
    </article>
  );
};
