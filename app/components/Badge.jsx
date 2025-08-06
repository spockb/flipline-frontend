import { FaBed, FaBath } from "react-icons/fa";
import { MdOutlineSquareFoot } from "react-icons/md";

export default function Badge({ type, children }) {
  return (
    <div className="flex items-center justify-center gap-1 px-3 py-2 text-sm border border-gray-200 rounded-lg bg-gray-50">
      {type === "bed" && <FaBed className="w-4 h-4 text-gray-500" />}
      {type === "bath" && <FaBath className="w-4 h-4 text-gray-500" />}
      {type === "sqf" && (
        <MdOutlineSquareFoot className="w-4 h-4 text-gray-500" />
      )}
      <span className="font-medium text-gray-700">{children}</span>
    </div>
  );
}
