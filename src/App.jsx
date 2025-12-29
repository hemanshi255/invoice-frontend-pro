import {
  BrowserRouter as Router,
  Switch,
  Routes,
  Route,
} from "react-router-dom";
import { AppProvider } from "./context/AppContext";

import Products from "./pages/Products";
import Inventory from "./pages/Inventory";
import Customers from "./pages/Customers";
import CreateInvoice from "./pages/CreateInvoice";
import Header from "./components/Header";
import InvoiceDetail from "./pages/InvoiceDetail";

function App() {
  return (
    <AppProvider>
      <Router>
        <Header />

        <Switch>
          <Route path="/invoices/:id">
            <InvoiceDetail />
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
        </Switch>
      </Router>
    </AppProvider>
  );
}

export default App;
