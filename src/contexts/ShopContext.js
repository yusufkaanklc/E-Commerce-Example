import { createContext, useState } from "react";

const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
  const [itemInfo, setItemInfo] = useState([]);

  const [itemBuy, setItemBuy] = useState([]);

  return (
    <>
      <ShopContext.Provider
        value={{ itemInfo, setItemInfo, itemBuy, setItemBuy }}
      >
        {children}
      </ShopContext.Provider>
    </>
  );
};

export default ShopContext;
