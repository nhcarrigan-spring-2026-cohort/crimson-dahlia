import { useState, useEffect, createContext } from "react";
// import { AuthContext } from "./AuthContext";

const BACKEND_ROUTE = "http://localhost:5000";
const FRONTEND_ROUTE = "http://localhost:5173";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();



export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const restoreUser = async () => {
      const token = localStorage.getItem("authToken");

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`${BACKEND_ROUTE}/users/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          localStorage.removeItem("authToken");
          setLoading(false);
          return;
        }

        const data = await res.json();
        setUser(data);
      } catch (err) {
        localStorage.removeItem("authToken");
        console.error("Error restoring user:", err);
      } finally {
        setLoading(false);
      }
    };

    restoreUser();
  }, []);

  const logout = () => {
    localStorage.removeItem("authToken");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;