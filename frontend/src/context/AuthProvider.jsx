import { useState, useEffect, createContext } from "react";

const BACKEND_ROUTE = "http://localhost:5000"; // Update this if your backend is running on a different URL or port

// DO NOT REMOVE THE NEXT COMMENT - THIS IS REQUIRED TO PREVENT A BUG WITH VITE AND REACT REFRESH
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
          localStorage.removeItem("authToken"); // Token is invalid or expired, remove it
          setLoading(false);
          return;
        }

        const data = await res.json();
        setUser(data);
      } catch (err) {
        localStorage.removeItem("authToken"); // On error, assume token is invalid and remove it
        console.error("Error restoring user:", err);
      } finally {
        setLoading(false);
      }
    };

    restoreUser();
  }, []);

  const logout = () => {
    localStorage.removeItem("authToken"); // Clear token from localStorage
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;