import { createContext, useState, useEffect } from "react";
import { getUserProfile } from "../services/api";
import initialUser from "./initialUser";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(initialUser);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getUserProfile();
        setUser(res.data);
      } catch (err) {
        setUser(initialUser); // fallback to Guest
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};
