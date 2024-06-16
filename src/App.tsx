import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Dashboard from "./pages/Dashboard";
import Bookings from "./pages/Bookings";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import Account from "./pages/Account";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import RootLayout from "./components/RootLayout";
import Cabins from "./pages/Cabins";
import Booking from "./pages/Booking";
import Checkin from "./pages/Checkin";

import { ModalProvider } from "./context/MenuContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // staleTime: 60 * 1000,
    },
  },
});

export default function App() {
  return (
    <ModalProvider>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <BrowserRouter>
          <Routes>
            <Route element={<RootLayout />}>
              <Route index element={<Navigate replace to="/dashboard" />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="bookings" element={<Bookings />} />
              <Route path="checkin/:bookingId" element={<Checkin />} />
              <Route path="bookings/:bookingId" element={<Booking />} />
              <Route path="cabins" element={<Cabins />} />
              <Route path="users" element={<Users />} />
              <Route path="settings" element={<Settings />} />
              <Route path="account" element={<Account />} />
              <Route path="login" element={<Login />} />
              <Route path="*" element={<PageNotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </ModalProvider>
  );
}
