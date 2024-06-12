import Header from "./Header";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

import { ThemeProvider } from "./ThemeProvider";
import { Toaster } from "react-hot-toast";

const RootLayout = () => {
  return (
    <div className="grid grid-cols-[1fr_7fr] grid-rows-[auto_1fr] min-h-screen">
      <Header />
      <Sidebar />
      <main className="bg-gray-100 dark:bg-gray-900 p-16 overflow-y-auto  flex flex-col items-center gap-8">
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <Toaster />
          <Outlet />
        </ThemeProvider>
      </main>
    </div>
  );
};

export default RootLayout;
