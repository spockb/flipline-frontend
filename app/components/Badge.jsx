import { FaBed, FaBath, FaCalendarAlt } from "react-icons/fa";
import { MdOutlineSquareFoot } from "react-icons/md";
import { IoIosResize } from "react-icons/io";

export default function Badge({ type, children }) {
  const iconClass = "w-4 h-4 text-gray-500";
  return (
    <div className="gap-1 py-3 border border-gray-200 badge bg-gray-50">
      {type === "bed" && <FaBed className={iconClass} />}
      {type === "bath" && <FaBath className={iconClass} />}
      {type === "sqf" && <MdOutlineSquareFoot className={iconClass} />}
      {type === "lot" && <IoIosResize className={iconClass} />}
      {type === "year" && <FaCalendarAlt className={iconClass} />}
      <span className="font-medium text-gray-700">{children}</span>
    </div>
  );
}
