import Header from "./Header";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

import { Toaster } from "react-hot-toast";
import { useUser } from "@/hooks/useUser";
import { useEffect } from "react";

const RootLayout = () => {
  const { user } = useUser();

  useEffect(() => {
    document.title = "The Wild Oasis | " + user?.user_metadata.full_name;
  }, [user?.user_metadata]);

  return (
    <div className="grid grid-cols-[1fr_7fr] grid-rows-[auto_1fr] min-h-screen">
      <Header />
      <Sidebar />
      <main className="bg-gray-200 dark:bg-gray-900 p-16 overflow-y-auto  flex flex-col items-center gap-8">
        <Toaster />
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
