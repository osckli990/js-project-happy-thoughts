import { MainCard } from "./sections/mainCard";
import { ThoughtCard } from "./sections/thoughtCard";
import { ErrorCard } from "./sections/ErrorCard";

export const App = () => {
  //Should all code go here?

  return (
    <main className="w-full sm:w-[500px] mx-auto grid grid-cols-1 gap-[40px] mt-[40px]">
      <MainCard />
      <ThoughtCard />
      <ErrorCard />
    </main>
  );
};
