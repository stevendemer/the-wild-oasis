// import Logout from "./Logout";

import { useLogout } from "@/hooks/useLogout";
import { Button } from "./ui/button";

const Header = () => {
  const { isPending, logOut } = useLogout();
  return (
    <div className="h-full flex items-center w-full bg-gray-50 dark:bg-gray-800 p-6 border-b-[1px] border-slate-600 col-span-full">
      Header component
      <div className="inline-block p-4">
        <Button disabled={isPending} onClick={logOut}>
          Log out
        </Button>
      </div>
    </div>
  );
};

export default Header;
