import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { signOut } from "firebase/auth";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import AdminLayout from "./AdminLayout";
import AdminLogin from "./pages/AdminLogin";

import Dashboard from "./pages/Dashboard";
import Orders from "./pages/Orders";
import Category from "./pages/Category";
import Menu from "./pages/Menu";
import Waiters from "./pages/Waiters";
import Kitchen from "./pages/Kitchen";
import Bills from "./pages/Bills";
import Tables from "./pages/Tables";
import Settings from "./pages/Settings";
import Categories from "./pages/Category";
import Offers from "./pages/Offers";
import KOT from "./pages/KOT";

export default function AdminApp() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      async (user) => {
        if (!user) {
          localStorage.removeItem("adminToken");
          localStorage.removeItem("adminUid");
          setIsAuthenticated(false);
          return;
        }

        try {
          const tokenResult = await user.getIdTokenResult(true);
          if (tokenResult.claims.admin) {
            const idToken = await user.getIdToken(true);
            localStorage.setItem("adminToken", idToken);
            localStorage.setItem("adminUid", user.uid);
            setIsAuthenticated(true);
          } else {
            localStorage.removeItem("adminToken");
            localStorage.removeItem("adminUid");
            setIsAuthenticated(false);
          }
        } catch (error) {
          console.error("Failed to refresh admin token:", error);
          localStorage.removeItem("adminToken");
          setIsAuthenticated(false);
        }
      }
    );

    return unsubscribe;
  }, []);

  const handleLoginSuccess = () => {
  setIsAuthenticated(true);
};

  
  const handleLogout = async () => {
  await signOut(auth);
  setIsAuthenticated(false);
};

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-[#111827] flex flex-col items-center justify-center text-white">
        <div className="w-10 h-10 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-sm font-medium tracking-wider uppercase text-gray-400">
          Verifying Admin Credentials...
        </p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AdminLogin onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <Routes>
      <Route element={<AdminLayout onLogout={handleLogout} />}>
        <Route index element={<Dashboard />} />
        <Route path="orders" element={<Orders />} />
        <Route path="category" element={<Category />} />
        <Route path="menu" element={<Menu />} />
        <Route path="waiters" element={<Waiters />} />
        <Route path="kitchen" element={<Kitchen />} />
        <Route path="bills" element={<Bills />} />
        <Route path="tables" element={<Tables />} />
        <Route path="settings" element={<Settings />} />
        <Route path="kot" element={<KOT />} />
        <Route path="categories" element={<Categories />} />
        <Route path="offers" element={<Offers />} />
      </Route>
    </Routes>
  );
}