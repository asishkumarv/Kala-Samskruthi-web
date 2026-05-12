import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type AuthContextType = {
  user: { name: string; email: string } | null;
  login: (email: string, password: string, name?: string) => void;
  signup: (name: string, email: string, password: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<{ name: string; email: string } | null>(() => {
    const stored = localStorage.getItem("kala_user");
    return stored ? JSON.parse(stored) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("kala_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("kala_user");
    }
  }, [user]);

  const login = (email: string, _password: string, name?: string) => {
    setUser({ name: name || email.split("@")[0], email });
  };

  const signup = (name: string, email: string, _password: string) => {
    setUser({ name, email });
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
