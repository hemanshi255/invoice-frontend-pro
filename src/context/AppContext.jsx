import { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [products, setProducts] = useState([
    {
      name: "Hydrochloric Acid",
      category: "Chemical",
      casNumber: "7647-01-0",
      price: 500,
      tax: 18,
      hazardLevel: "High",
      safetyNotes: "Corrosive",
    },
    {
      name: "Sodium Hydroxide",
      category: "Chemical",
      casNumber: "1310-73-2",
      price: 400,
      tax: 18,
      hazardLevel: "High",
      safetyNotes: "Handle with gloves",
    },
    {
      name: "Ethanol",
      category: "Reagent",
      casNumber: "64-17-5",
      price: 300,
      tax: 12,
      hazardLevel: "Medium",
      safetyNotes: "Flammable",
    },
  ]);

  const [inventory, setInventory] = useState([
    {
      product: "Hydrochloric Acid",
      batch: "HCL-2025-A",
      expiry: "2027-06-30",
      quantity: 50,
      location: "Shelf A1",
    },
    {
      product: "Sodium Hydroxide",
      batch: "NAOH-2025-B",
      expiry: "2026-12-31",
      quantity: 40,
      location: "Shelf B2",
    },
    {
      product: "Ethanol",
      batch: "ETH-2025-C",
      expiry: "2027-03-15",
      quantity: 100,
      location: "Shelf C3",
    },
  ]);

  const [customers, setCustomers] = useState([
    {
      name: "John Doe",
      organization: "ABC Labs",
      phone: "9876543210",
      gst: "27ABCDE1234F1Z5",
    },
    {
      name: "Jane Smith",
      organization: "XYZ Pharma",
      phone: "9123456780",
      gst: "27XYZAB5678F1Z3",
    },
  ]);

  const [invoices, setInvoices] = useState([
    {
      customer: "John Doe",
      items: [
        {
          product: "Hydrochloric Acid",
          batch: "HCL-2025-A",
          quantity: 5,
          price: 500,
          total: 2500,
        },
        {
          product: "Ethanol",
          batch: "ETH-2025-C",
          quantity: 10,
          price: 300,
          total: 3000,
        },
      ],
      date: "2025-12-29",
    },
  ]);

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
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
