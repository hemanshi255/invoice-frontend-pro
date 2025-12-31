// App.jsx
import React, { useContext, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";
import { AppProvider, AppContext } from "./context/AppContext";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Invoices from "./pages/Invoices";
import InvoiceDetail from "./pages/InvoiceDetail";

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

      <Route path="/dashboard" component={Dashboard} />

      <Route path="/invoices/:id" component={InvoiceDetail} />
      <Route path="/invoices" component={Invoices} />

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
      </Router>
    </AppProvider>
  );
}

export default App;
