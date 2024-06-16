import { useUser } from "@/hooks/useUser";
import { ReactNode, useEffect } from "react";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { isLoading, user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    function f() {
      if (user?.role !== "authenticated" && !isLoading) navigate("/login");
    }
    f();
  }, [navigate, isLoading, user]);

  if (isLoading) return <Spinner />;

  if (user?.role === "authenticated") return children;
};

export default ProtectedRoute;
