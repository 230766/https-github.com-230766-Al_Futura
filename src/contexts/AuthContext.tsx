import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { AuthUser, getCurrentUser, setupAuthListener } from "../lib/auth";

type AuthContextType = {
  user: AuthUser | null;
  isLoading: boolean;
  isAdmin: boolean;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  isAdmin: false,
});

export const useAuth = () => useContext(AuthContext);

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for current user on initial load
    const loadUser = async () => {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        console.error("Error loading user:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();

    // Set up auth state listener
    const { data: authListener } = setupAuthListener((user) => {
      setUser(user);
      setIsLoading(false);
    });

    // Clean up listener on unmount
    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  const value = {
    user,
    isLoading,
    isAdmin: user?.role === "admin",
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
