import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Rating from "./pages/Rating";
import WaiterLayout from "./components/WaiterLayout";

export default function WaiterApp() {
  return (
    <Routes>
      <Route
        path="/"
        element={<Login />}
      />
      <Route element={<WaiterLayout />}>
        <Route
          path="dashboard"
          element={<Dashboard />}
        />
        <Route
          path="rating"
          element={<Rating />}
        />
      </Route>
    </Routes>
  );
}