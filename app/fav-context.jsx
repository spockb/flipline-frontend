import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./auth-context";

const API = "http://127.0.0.1:5000";
const FavContext = createContext(null);
export const useFavorites = () => useContext(FavContext);

export function FavoritesProvider({ children }) {
  const { user, ready: authReady } = useAuth();
  const [favIds, setFavIds] = useState(() => new Set());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!authReady) return;
    if (!user) {
      setFavIds(new Set());
      return;
    }

    let alive = true;

    (async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API}/api/favorites`, {
          credentials: "include",
          cache: "no-store",
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();

        const next = new Set(
          (data.favorites || []).map((fav) => fav.propertyId)
        );
        if (alive) setFavIds(next);
      } catch (err) {
        console.error("Load favorites failed:", err);
      } finally {
        if (alive) setLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, [authReady, user?.id]);

  async function postFavorite(propertyId) {
    const res = await fetch(`${API}/api/favorites/${propertyId}`, {
      method: "POST",
      credentials: "include",
    });

    if (!res.ok) throw new Error(`Favorite failed (${res.status})`);
  }

  async function deleteFavorite(propertyId) {
    const res = await fetch(`${API}/api/favorites/${propertyId}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (!res.ok) throw new Error(`Unfavorite failed (${res.status})`);
  }

  function has(propertyId) {
    return favIds.has(Number(propertyId));
  }

  async function toggle(propertyId) {
    propertyId = Number(propertyId);
    if (!user) {
      console.error("You must be logged in to favorite properties");
      return;
    }

    const prev = new Set(favIds);
    const optimistic = new Set(favIds);

    if (optimistic.has(propertyId)) optimistic.delete(propertyId);
    else optimistic.add(propertyId);
    setFavIds(optimistic);

    try {
      if (prev.has(propertyId)) await deleteFavorite(propertyId);
      else await postFavorite(propertyId);
    } catch (err) {
      console.error("Toggle favorite error:", err);
      setFavIds(prev);
    }
  }

  const value = useMemo(
    () => ({ has, toggle, loading, count: ids.size, ids }),
    [favIds, loading]
  );

  return <FavContext.Provider value={value}>{children}</FavContext.Provider>;
}
