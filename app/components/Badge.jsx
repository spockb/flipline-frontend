import { FaBed, FaBath } from "react-icons/fa";
import { MdOutlineSquareFoot } from "react-icons/md";

export default function Badge({ type, children }) {
  return (
    <div className="flex justify-center px-2 py-1 border rounded-lg">
      {type === "bed" ? <FaBed /> : null}
      {type === "bath" ? <FaBath /> : null}
      {type === "sqf" ? <MdOutlineSquareFoot /> : null}
      <span>{children}</span>
    </div>
  );
}
