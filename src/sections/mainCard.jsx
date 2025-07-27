import { Input } from "../components/Input";

export const MainCard = ({
  setThoughts,
  newThought,
  setNewThought,
  accessToken,
}) => {
  return (
    <article
      id="MainCard"
      className="border-1 border-bordergrey w-full bg-maingrey shadow-smallscreenbox sm:shadow-box p-[20px] grid grid-cols-1 gap-[10px]"
    >
      {!accessToken && (
        <p className="text-center text-sm text-red-500">
          You must be logged in to edit, delete, or like a thought.
        </p>
      )}
      <Input
        setThoughts={setThoughts}
        newThought={newThought}
        setNewThought={setNewThought}
        accessToken={accessToken}
      />
    </article>
  );
};
