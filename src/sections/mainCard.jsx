//import { Submit } from "../components/Submit";
import { Input } from "../components/Input";

export const MainCard = ({
  thought,
  setThoughts,
  newThought,
  setNewThought,
}) => {
  return (
    <article
      id="MainCard"
      className="border-1 border-bordergrey w-full bg-maingrey shadow-smallscreenbox sm:shadow-box p-[20px] grid grid-cols-1 gap-[10px]"
    >
      <Input
        thought={thought}
        setThoughts={setThoughts}
        newThought={newThought}
        setNewThought={setNewThought}
      />
    </article>
  );
};
