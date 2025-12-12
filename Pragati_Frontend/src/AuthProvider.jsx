import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  // Restore user on refresh
  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    const storedToken = sessionStorage.getItem("token");

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
      setIsLoggedIn(true);
    }
  }, []);

  // LOGIN FIXED
  const login = (userObj, token) => {
    sessionStorage.setItem("user", JSON.stringify(userObj));
    sessionStorage.setItem("token", token);

    setUser(userObj);        // ← save full user, not just email
    setToken(token);
    setIsLoggedIn(true);
  };

  const logout = () => {
    sessionStorage.clear();
    setUser(null);
    setToken(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
