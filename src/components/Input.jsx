import { useState } from "react";

export const Input = () => {
  const [inputs, setInputs] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
  };

  return (
    <form
      id="thoughtForm"
      className="grid grid-cols-1 gap-[10px]"
      onSubmit={handleSubmit}
    >
      <label for="Thought" className="">
        What's making you happy right now?
      </label>
      <input
        type="text"
        placeholder="React is making me happy! (false)"
        id="Thought"
        className=" bg-white p-[10px] h-[60px] pb-[30px] border-1 border-bordergrey"
        onChange={(e) => setInputs(e.target.value)}
      />
    </form>
  );
};

/*
// Assuming you have this kind of state in your component:
const [thoughts, setThoughts] = useState([])

// Later, in your code which handles the form submission, you
// could have something which looks like this to send the new
// message, get the response from the API, and then add it to
// the thoughts array:
const handleFormSubmit = (event) => {
  event.preventDefault()

  // Send the POST request with the input from your form (instead
  // of 'Hello world' like this example does):
  fetch("<https://technigo-thoughts.herokuapp.com/>", {
    method: "POST",
    body: JSON.stringify({
      message: "Hello world",
    }),
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.json())
    .then((newThought) => {
      // Now you have `newThought` which is the response from the
      // API as documented at the top of this readme. You can use
      // it to update the `thoughts` array:
      setThoughts((previousThoughts) => [newThought, ...previousThoughts])
    })
}
    */
