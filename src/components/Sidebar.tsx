import { AiOutlineHome } from "react-icons/ai";
import { HiHomeModern } from "react-icons/hi2";
import { HiOutlineCalendarDays } from "react-icons/hi2";
import { PiUserCircleDuotone } from "react-icons/pi";
import { Link, useLocation } from "react-router-dom";
import { CiSettings } from "react-icons/ci";
import { useState } from "react";
import { cn } from "@/lib/utils";

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
  // stores the correct active link after refreshing page
  const location = useLocation();
  const [path, setPath] = useState(location.pathname);

  return (
    <div className=" flex-col gap-6 p-3 text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 rounded-md max-w-[90rem] hidden sm:flex">
      <div className="flex items-center flex-col flex-1">
        <img
          src="/logo-light.png"
          alt="Wild oasis logo"
          className="object-contain w-40 h-40 "
        />
        <div className="flex flex-col items-center gap-8">
          {links.map((link, idx) => (
            <Link onClick={() => setPath(link.path)} to={link.path} key={idx}>
              <span
                className={cn(
                  "flex items-center flex-1 space-x-6 hover:bg-gray-100 dark:hover:bg-gray-100/30  px-4 py-2 rounded-lg w-full transition-all duration-300 cursor-pointer",
                  path === link.path && "dark:text-gray-100 text-gray-800"
                )}
              >
                <span className="mx-4">{link.icon}</span>
                {link.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
