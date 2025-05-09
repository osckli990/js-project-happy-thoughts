import { format } from "timeago.js";
//small library to display it as "... time ago"

export const Time = ({ time }) => {
  return (
    <div id="timeBox" className="text-end">
      <p className="text-extragrey">{format(time)}</p>
    </div>
  );
};
