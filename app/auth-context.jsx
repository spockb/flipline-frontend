import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const API = "http://127.0.0.1:5000";
  const [user, setUser] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API}/api/auth/me`, {
          credentials: "include",
        });

        if (res.ok) {
          const data = await res.json();
          setUser(data);
        } else {
          setUser(null);
        }
      } catch {
        setUser(null);
      }
    })();
  }, []);

  const signup = async (email, password, name) => {
    const res = await fetch(`${API}/api/auth/signup`, {
      method: "POST",
      body: JSON.stringify({ email, password, name }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const me = await fetch(`${API}/api/auth/me`, {
      credentials: "include",
    });
    if (me.ok) setUser(await me.json());
    return true;
  };

  const login = async (email, password) => {
    const res = await fetch(`${API}/api/auth/login`, {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const me = await fetch(`${API}/api/auth/me`, {
      credentials: "include",
    });
    if (me.ok) setUser(await me.json());
    return true;
  };

  const logout = async () => {
    await fetch(`${API}/api/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
}
