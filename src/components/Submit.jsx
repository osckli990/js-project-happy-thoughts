export const Submit = () => {
  return (
    <div
      id="buttonBox"
      className="flex px-[25px] mt-[10px] gap-[5px] bg-heartred place-items-center h-[50px] rounded-full w-fit cursor-pointer"
    >
      <img src="./heart.png" alt="" role="presentation" />
      <input type="submit" form="ThoughtForm" value="Send Happy Thought" />
      <img src="./heart.png" alt="" role="presentation" />
    </div>
  );
};
