import { AiOutlineHome } from "react-icons/ai";
import { HiHomeModern } from "react-icons/hi2";
import { HiOutlineCalendarDays } from "react-icons/hi2";
import { PiUserCircleDuotone } from "react-icons/pi";
import { Link } from "react-router-dom";
import { CiSettings } from "react-icons/ci";

const links = [
  {
    name: "Home",
    icon: <AiOutlineHome size={30} />,
    path: "/",
  },
  {
    name: "Bookings",
    icon: <HiOutlineCalendarDays size={30} />,
    path: "/bookings",
  },
  {
    name: "Cabins",
    icon: <HiHomeModern size={30} />,
    path: "/cabins",
  },
  {
    name: "Users",
    icon: <PiUserCircleDuotone size={30} />,
    path: "/users",
  },
  {
    name: "Settings",
    icon: <CiSettings size={30} />,
    path: "/settings",
  },
];

const Sidebar = () => {
  return (
    <div className="flex flex-col gap-6 p-3 text-gray-500 dark:text-gray-100 bg-gray-50 dark:bg-gray-800 rounded-md max-w-[90rem]">
      <div className="flex items-center flex-col flex-1">
        <img
          src="/logo-light.png"
          alt="Wild oasis logo"
          className="object-contain w-40 h-40 "
        />
        <div className="flex flex-col items-center gap-8">
          {links.map((link, idx) => (
            <span
              className="flex items-center flex-1 space-x-6 hover:bg-gray-200 dark:hover:bg-gray-200/30  px-4 py-2 rounded-lg w-full transition-all duration-300 cursor-pointer"
              key={idx}
            >
              <span>{link.icon}</span>
              <Link to={link.path}>{link.name}</Link>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
