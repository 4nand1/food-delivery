"use client";

import { api } from "@/lib/axios";

import { useRouter } from "next/navigation";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "sonner";

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (
    username: string,
    email: string,
    password: string,
  ) => Promise<void>;
 };

type User = {
  _id: string;
  email: string;
  name: string;
  role: string;
};

type LoginResponse = {
  user: User;
  accessToken: string;
};

export const AuthContext = createContext({} as AuthContextType);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const login = async (username: string, password: string) => {
    try {
      const { data } = await api.post<LoginResponse>("/auth/login", {
        username,
        password,
      });

      const { user, accessToken } = data;

      localStorage.setItem("accessToken", accessToken);

      setUser(user);

      router.push("/");
    } catch {
      toast.error("Invalid credentials");
    }
  };

  const register = async (
    username: string,
    email: string,
    password: string,
  ) => {
    try {
      await api.post("/auth/register", {
        username,
        email,
        password,
      });

      router.push("/auth/login");
    } catch {
      toast.error("Registration failed");
    }
  };

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      const fetchMe = async () => {
        try {
          const { data } = await api.get<{ user: User }>("/auth/me", {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });

          setUser(data.user);
        } catch {
          localStorage.removeItem("accessToken");
        }
      };

      fetchMe();
    } else {
      setUser(null);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
