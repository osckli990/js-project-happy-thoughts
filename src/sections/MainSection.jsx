import { MainCard } from "./mainCard";
import { ThoughtCard } from "./thoughtCard";
import { useState, useEffect } from "react";
import { LoadingCard } from "./LoadingCard";
import { ErrorCard } from "./ErrorCard";

export const MainSection = () => {
  //Should all code go here?
  const url = "https://happy-thoughts-api-4ful.onrender.com/thoughts";

  const [loading, setLoading] = useState(true);
  const [thought, setThoughts] = useState([]);
  const [newThought, setNewThought] = useState("");

  const fetchData = async () => {
    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setThoughts(data);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      <main className="w-full sm:w-[500px] mx-auto grid grid-cols-1 gap-[40px] mt-[40px] mb-[50px]">
        <ErrorCard />
      </main>;
    } finally {
      setLoading(false);
      // this block executes no matter what, wheter there was an error or not.
    }
  };

  useEffect(() => {
    fetchData();
  }, [setThoughts]);
  //useEffect eludes me, remember to do further research

  if (loading === true) {
    return (
      <main className="w-full sm:w-[500px] mx-auto grid grid-cols-1 gap-[40px] mt-[40px] mb-[50px]">
        <LoadingCard />
      </main>
    );
  }

  return (
    <main className="w-full sm:w-[500px] mx-auto grid grid-cols-1 gap-[40px] mt-[40px] mb-[50px]">
      <MainCard
        setThoughts={setThoughts}
        newThought={newThought}
        setNewThought={setNewThought}
      />
      <ThoughtCard thought={thought} setThoughts={setThoughts} />
    </main>
  );
};

//if you're reading this, have a good day
