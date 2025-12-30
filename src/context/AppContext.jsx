import { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [products, setProducts] = useState([]);

  const [inventory, setInventory] = useState([]);

  const [customers, setCustomers] = useState([]);

  const [invoices, setInvoices] = useState([]);

  return (
    <AppContext.Provider
      value={{
        products,
        setProducts,
        inventory,
        setInventory,
        customers,
        setCustomers,
        invoices,
        setInvoices,
        isLoggedIn,
        setIsLoggedIn,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
