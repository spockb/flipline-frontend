import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const API = import.meta.env.VITE_API_URL || "";
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const res = await fetch(`${API}/api/auth/me`, {
          credentials: "include",
          cache: "no-store",
        });
        if (!alive) return;
        if (res.ok) {
          const data = await res.json();
          setUser(data);
        } else {
          setUser(null);
        }
      } catch {
        if (alive) setUser(null);
      } finally {
        if (alive) setReady(true);
      }
    })();
    return () => {
      alive = false;
    };
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
    try {
      const res = await fetch(`${API}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
      });

      if (res.ok) {
        setUser(null);
      } else {
        console.error("Logout failed on server", res.status);
        setUser(null);
      }
    } catch (err) {
      console.error("Logout network error:", err);
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, signup, ready }}>
      {children}
    </AuthContext.Provider>
  );
}
