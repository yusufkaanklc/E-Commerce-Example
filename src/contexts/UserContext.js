import { createContext, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const userData = {
    username: "admin",
    password: "12345",
  };

  const [isLogin, setIsLogin] = useState(false);
  return (
    <>
      <UserContext.Provider value={{ userData, isLogin, setIsLogin }}>
        {children}
      </UserContext.Provider>
    </>
  );
};

export default UserContext;
