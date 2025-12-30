// App.jsx
import React, { useContext, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";
import { AppProvider, AppContext } from "./context/AppContext";

import Products from "./pages/Products";
import Inventory from "./pages/Inventory";
import Customers from "./pages/Customers";
import CreateInvoice from "./pages/CreateInvoice";
import Invoices from "./pages/Invoices";
import InvoiceDetail from "./pages/InvoiceDetail";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Header from "./components/Header";

function AppRoutes() {
  const { isLoggedIn } = useContext(AppContext);
  const history = useHistory();

  useEffect(() => {
    if (!isLoggedIn) {
      history.push("/login");
    } else {
      history.push("/dashboard");
    }
  }, [isLoggedIn, history]);

  return (
    <Switch>
      <Route path="/login" component={Login} />
      <Route
        path="/dashboard"
        render={() => (isLoggedIn ? <Dashboard /> : history.push("/login"))}
      />
      <Route
        path="/products"
        render={() => (isLoggedIn ? <Products /> : history.push("/login"))}
      />
      <Route
        path="/inventory"
        render={() => (isLoggedIn ? <Inventory /> : history.push("/login"))}
      />
      <Route
        path="/customers"
        render={() => (isLoggedIn ? <Customers /> : history.push("/login"))}
      />
      <Route
        path="/create-invoice"
        render={() => (isLoggedIn ? <CreateInvoice /> : history.push("/login"))}
      />
      <Route
        path="/invoices/:id"
        render={() => (isLoggedIn ? <InvoiceDetail /> : history.push("/login"))}
      />
      <Route
        path="/invoices"
        render={() => (isLoggedIn ? <Invoices /> : history.push("/login"))}
      />
      <Route
        path="/"
        render={() =>
          isLoggedIn ? history.push("/dashboard") : history.push("/login")
        }
      />
    </Switch>
  );
}

function App() {
  return (
    <AppProvider>
      <Router>
        <AppRoutes />
        {/* <Header></Header>
        <Route path="/products">
          <Products></Products>
        </Route>

        <Route path="/inventory">
          <Inventory></Inventory>
        </Route>

        <Route path="/customers">
          <Customers></Customers>
        </Route>

        <Route path="/create-invoice">
          <CreateInvoice></CreateInvoice>
        </Route>

        <Route path="/invoices">
          <Invoices></Invoices>
        </Route>

        <Route path="/invoices/:id">
          <InvoiceDetail></InvoiceDetail>
        </Route> */}
        {/* <Dashboard></Dashboard> */}
      </Router>
    </AppProvider>
  );
}

export default App;
