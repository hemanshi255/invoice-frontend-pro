import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Company from "./pages/Company";
import Products from "./pages/Products";
import Inventory from "./pages/Inventory";
import Customers from "./pages/Customers";
import CreateInvoice from "./pages/CreateInvoice";
import Invoices from "./pages/Invoices";
import { AppProvider } from "./context/AppContext";
import { AppBar, Toolbar, Button } from "@mui/material";

function App() {
  return (
    <>
      <div className="App">
        <AppProvider>
          <Router>
            <AppBar position="static">
              <Toolbar>
                <Button color="inherit" href="/products">
                  Products
                </Button>
                <Button color="inherit" href="/inventory">
                  Inventory
                </Button>
                <Button color="inherit" href="/customers">
                  Customers
                </Button>
                <Button color="inherit" href="/create-invoice">
                  Invoice
                </Button>
              </Toolbar>
            </AppBar>
            <Switch>
              <Route path="/invoices">
                <Invoices />
              </Route>
              <Route path="/create-invoice">
                <CreateInvoice />
              </Route>
              <Route path="/customers">
                <Customers />
              </Route>
              <Route path="/inventory">
                <Inventory />
              </Route>
              <Route path="/products">
                <Products />
              </Route>
              <Route path="/company">
                <Company />
              </Route>
              <Route path="/dashboard">
                <Dashboard />
              </Route>
              <Route path="/">
                <Login />
              </Route>
            </Switch>
          </Router>
        </AppProvider>
      </div>
    </>
  );
}

export default App;
