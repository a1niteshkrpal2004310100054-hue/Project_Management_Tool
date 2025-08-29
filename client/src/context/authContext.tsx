import React, {
  createContext,
  useState,
  useEffect,
  type ReactNode,
  useContext,
} from "react";
import { api } from "../libs/api";
import type { User, AuthContext } from "../type/contextType";

interface AuthContextProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContext | undefined>(undefined);

export const AuthProvider: React.FC<AuthContextProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetch = async () => {
    try {
      const res = await api.get("/user/me");
      setUser(res.data.user);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

const User = () => {
  const context = useContext(AuthContext);
  if (!context) {
    console.log("User must be present in AuthCOntext");
  }
  return context;
};

export default User;
