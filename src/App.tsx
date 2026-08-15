import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import CustomerApp from "./pages/CustomerApp";
import KitchenDashboard from "./pages/KitchenDashboard";
import KitchenLogin from "./pages/KitchenLogin";
import AdminApp from "./admin/AdminApp";
import WaiterApp from "./waiter/WaiterApp";

function KitchenWrapper() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem("kitchenAuth") === "true";
  });

  if (!isAuthenticated) {
    return <KitchenLogin onLoginSuccess={() => setIsAuthenticated(true)} />;
  }

  return <KitchenDashboard onLogout={() => setIsAuthenticated(false)} />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<CustomerApp />} />
      <Route path="/kitchen" element={<KitchenWrapper />} />
      <Route path="/admin/*" element={<AdminApp />} />
      <Route path="/waiter/*" element={<WaiterApp />} />
    </Routes>
  );
}