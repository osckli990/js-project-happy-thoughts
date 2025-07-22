import { MainCard } from "./mainCard";
import { ThoughtCard } from "./thoughtCard";
import { useState, useEffect } from "react";
import { LoadingCard } from "./LoadingCard";
import { ErrorCard } from "./ErrorCard";
import { API_URL } from "../api";

export const MainSection = () => {
  /*
  old url for earlier school period.
  const url_old = "https://happy-thoughts-api-4ful.onrender.com/thoughts";
  */
  const url = API_URL;

  const [loading, setLoading] = useState(true);
  const [thought, setThoughts] = useState([]);
  const [newThought, setNewThought] = useState("");

  const fetchData = async () => {
    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setThoughts(data.results);
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
