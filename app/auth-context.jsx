import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async () => {
      const res = await fetch("http://127.0.0.1:5000/api/auth/me", {
        credentials: "include",
      });
      if (res.ok) setUser(await res.json());
    };
  }, []);

  const login = async (email, password) => {
    const res = await fetch("http://127.0.0.1:5000/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email: email, passwordHash: password }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const me = await fetch("http://127.0.0.1:5000/api/auth/me", {
      credentials: include,
    });
    if (me.ok) setUser(await me.json());
    return true;
  };

  const logout = async () => {
    await fetch("http://127.0.0.1:5000/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
