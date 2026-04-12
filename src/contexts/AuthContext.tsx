import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { authApi } from "@/api/auth";
import type { User, LoginRequest } from "@/api/types";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (data: LoginRequest) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (data: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    const savedUser = localStorage.getItem("auth_user");
    if (token && savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch {
        localStorage.removeItem("auth_token");
        localStorage.removeItem("auth_user");
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (data: LoginRequest) => {
    const response = await authApi.login(data);
    localStorage.setItem("auth_token", response.token);
    localStorage.setItem("auth_user", JSON.stringify(response.user));
    setUser(response.user);
  };

  const logout = async () => {
    try {
      await authApi.logout();
    } catch {
      // Continue logout even if API fails
    }
    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_user");
    setUser(null);
  };

  const updateUser = (data: Partial<User>) => {
    if (user) {
      const updated = { ...user, ...data };
      setUser(updated);
      localStorage.setItem("auth_user", JSON.stringify(updated));
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
