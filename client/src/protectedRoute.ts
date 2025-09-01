import { useEffect, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface ProtectedRoutesProps {
  children: ReactNode;
}
export const ProtectedRoutes: React.FC<ProtectedRoutesProps> = ({
  children,
}) => {
  const user = localStorage.getItem("accessToken");
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login", { replace: true });
    }
  }, [user, navigate]);
  if (!user) {
    return null;
  }
  return children;
};
