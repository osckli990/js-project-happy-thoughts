export const Heart = () => {
  return (
    <div id="fullBox" className="flex place-items-center gap-[5px]">
      <div id="heartBox" className="bg-heartgrey size-[50px] rounded-full">
        <img src="./heart.png" alt="" role="presentation" />
      </div>
      <p className="text-[8px]">X</p>
      <p className="color-heartgrey">10</p>
    </div>
  );
};
