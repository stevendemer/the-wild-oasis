import { useLogout } from "@/hooks/useLogout";
import { Avatar } from "./ui/avatar";
import { Button } from "./ui/button";
import { CiUser } from "react-icons/ci";
import { MdOutlineWbSunny } from "react-icons/md";
import { IoLogInOutline } from "react-icons/io5";
import { IoMoonOutline } from "react-icons/io5";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useUser } from "@/hooks/useUser";
import { Skeleton } from "./ui/skeleton";
import { useNavigate } from "react-router-dom";
import { useTheme } from "./ThemeProvider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";

const Header = () => {
  const { setTheme, theme } = useTheme();
  const { isPending, logOut } = useLogout();
  const navigate = useNavigate();

  const { user, isLoading } = useUser();

  console.log(user?.user_metadata);

  const { avatar, full_name } = user?.user_metadata;

  return (
    <div className="h-full flex justify-end items-center w-full bg-gray-50 dark:bg-gray-800 p-4 border-b-[1px] border-slate-600 col-span-full space-x-2">
      <div className="flex justify-between items-center flex-1">
        <span className="font-mono hidden sm:text-xl sm:block">
          Welcome {full_name}{" "}
        </span>
        <div className="flex items-center space-x-2">
          <Avatar className="w-8 h-8 object-contain">
            {isLoading ? (
              <Skeleton className="rounded-full w-[120px] h-20" />
            ) : (
              <div>
                <AvatarImage src={avatar || "default-user.jpg"} />
              </div>
            )}
          </Avatar>
          <span className="text-sm p-2">{full_name}</span>

          <Button
            onClick={() => navigate("/account")}
            size="icon"
            variant="ghost"
          >
            <CiUser
              size={25}
              className="text-indigo-600 hover:text-indigo-500"
            />
          </Button>

          <Button variant="link" size="icon">
            {theme === "light" ? (
              <MdOutlineWbSunny
                onClick={() => setTheme("dark")}
                className="h-[1.2rem] w-[1.2rem]  transition-all dark:-rotate-90"
              />
            ) : (
              <IoMoonOutline
                onClick={() => setTheme("light")}
                className="absolute h-[1.2rem] w-[1.2rem] transition-all  dark:scale-100"
              />
            )}
          </Button>

          <Button
            size="icon"
            variant="ghost"
            disabled={isPending}
            onClick={() => logOut()}
          >
            <IoLogInOutline
              size={25}
              className="text-indigo-600 hover:text-indigo-500"
            />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Header;
