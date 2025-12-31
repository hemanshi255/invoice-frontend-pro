import { createContext, useState, useEffect } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [lastInvoiceNumber, setLastInvoiceNumber] = useState(0);

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return JSON.parse(localStorage.getItem("isLoggedIn")) || false;
  });

  const [products, setProducts] = useState(() => {
    return JSON.parse(localStorage.getItem("products")) || [];
  });

  const [inventory, setInventory] = useState(() => {
    return JSON.parse(localStorage.getItem("inventory")) || [];
  });

  const [customers, setCustomers] = useState(() => {
    return JSON.parse(localStorage.getItem("customers")) || [];
  });

  const [invoices, setInvoices] = useState(() => {
    return JSON.parse(localStorage.getItem("invoices")) || [];
  });

  useEffect(() => {
    localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
  }, [isLoggedIn]);

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem("inventory", JSON.stringify(inventory));
  }, [inventory]);

  useEffect(() => {
    localStorage.setItem("customers", JSON.stringify(customers));
  }, [customers]);

  useEffect(() => {
    localStorage.setItem("invoices", JSON.stringify(invoices));
  }, [invoices]);

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
        lastInvoiceNumber,
        setLastInvoiceNumber,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
