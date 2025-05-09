import { MainCard } from "./mainCard";
import { ThoughtCard } from "./thoughtCard";
import { ErrorCard } from "./ErrorCard";
import { useState, useEffect } from "react";

export const MainSection = () => {
  //Should all code go here?
  const url = "https://happy-thoughts-ux7hkzgmwa-uc.a.run.app/thoughts";

  const [thought, setThoughts] = useState([]);
  const [newThought, setNewThought] = useState("");

  const fetchData = async () => {
    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        // set the state to pokemons array
        setThoughts(data);
        console.log("data", data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      // this block executes no matter what, wheter there was an error or not.
    }
  };

  useEffect(() => {
    fetchData();
  }, [setThoughts]);

  return (
    <main className="w-full sm:w-[500px] mx-auto grid grid-cols-1 gap-[40px] mt-[40px] mb-[50px]">
      <MainCard
        thought={thought}
        setThoughts={setThoughts}
        newThought={newThought}
        setNewThought={setNewThought}
      />
      <ThoughtCard thought={thought} setThoughts={setThoughts} />
    </main>
  );
};
