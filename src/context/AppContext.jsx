// ==AppContext.jsx===

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

  const [companyProfile, setCompanyProfile] = useState({
    name: "ChemLedger Solutions",
    gst: "27ABCDE1234F1Z5",
    phone: "+91 98765 43210",
    email: "support@chemledger.com",
    address: "Mumbai, Maharashtra, India",
  });

  useEffect(() => {
    const storedProfile = localStorage.getItem("companyProfile");
    if (storedProfile) {
      setCompanyProfile(JSON.parse(storedProfile));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("companyProfile", JSON.stringify(companyProfile));
  }, [companyProfile]);

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
        companyProfile,
        setCompanyProfile,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
