"use client";

import { api } from "@/lib/axios";
import axios from "axios";
import { useRouter } from "next/navigation";
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "sonner";

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  signout: () => void;
  getMe: () => Promise<void>;
  updateUser: () => Promise<void>;
  messageL: string | null;
};

type User = {
  _id: string;
  email: string;
  role: string;
  address: string;
};
type LoginRes = {
  user: User;
  accessToken: string;
  message: string;
};

export const AuthContext = createContext({} as AuthContextType);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [messageL, setMessage] = useState<string | null>(null);
  const router = useRouter();
  const login = async (email: string, password: string): Promise<void> => {
    try {
      const { data } = await api.post<LoginRes>("/auth/login", {
        email,
        password,
      });

      const { user, accessToken } = data;

      localStorage.setItem("accessToken", accessToken);
      setUser(user);

      if (user.role === "admin") {
        router.push("/admin");
        toast.success("Login successful", {
          position: "top-center",
        });
      } else {
        router.push("/");
        toast.success("Login successful", {
          position: "top-center",
        });
      }
    } catch (error) {
      const errorMessage =
        axios.isAxiosError<{ message?: string }>(error)
          ? error.response?.data?.message ||
            "Login failed. Please check your credentials."
          : "Login failed. Please check your credentials.";
      toast.error("Login failed", {
        position: "top-center",
      });
      setMessage(errorMessage);

      throw error;
    }
  };

  const register = async (email: string, password: string) => {
    try {
      await api.post("/auth/register", {
        email,
        password,
      });
      router.push("/Login");
      toast.success("Successfully registered", {
        position: "top-center",
      });
    } catch (error) {
      const message =
        axios.isAxiosError<{ message?: string }>(error) &&
        error.response?.data?.message
          ? error.response.data.message
          : "Registration failed";
      toast.error(message, {
        position: "top-center",
      });
      throw error;
    }
  };

  const updateUser = async () => {
    const { data } = await api.get<{ newUser: User }>("/auth/user");
    setUser(data.newUser);
  };

  const getMe = async () => {
    const accessToken = localStorage.getItem("accessToken");
    const { data } = await api.get<{ user: User }>("/auth/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    setUser(data.user);
  };

  useEffect(() => {
    const fetchMe = async () => {
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        setIsLoading(false);
        return;
      }

      try {
        await getMe();
      } catch {
        localStorage.removeItem("accessToken");
      } finally {
        setIsLoading(false);
      }
    };

    void fetchMe();
  }, []);

  const signout = () => {
    localStorage.removeItem("accessToken");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        register,
        signout,
        getMe,
        updateUser,
        messageL,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
