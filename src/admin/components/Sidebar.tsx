import { useState } from "react";
import {
  LayoutDashboard,
  ShoppingBag,
  FolderTree, 
  UtensilsCrossed,
  Users,
  Receipt,
  Armchair,
  ChefHat,
  Settings,
  Menu,
  X,
  Tag,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const links = [
  { icon: LayoutDashboard, label: "Dashboard", to: "/admin" },
  { icon: ShoppingBag, label: "Orders", to: "/admin/orders" },
  { icon: FolderTree, label: "Category", to: "/admin/category"},
  { icon: UtensilsCrossed, label: "Menu", to: "/admin/menu" },
  { icon: Users, label: "Waiters", to: "/admin/waiters" },
  { icon: ChefHat, label: "Kitchen", to: "/admin/kitchen" },
  { icon: Receipt, label: "Bills", to: "/admin/bills" },
  { icon: Armchair, label: "Tables", to: "/admin/tables" },
  { icon: Tag, label: "Offers", to: "/admin/offers" },
  { icon: Settings, label: "Settings", to: "/admin/settings" },
];

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  const renderLinks = () => (
    <nav className="mt-4 flex flex-col">
      {links.map((link) => {
        const Icon = link.icon;

        return (
          <NavLink
            key={link.label}
            to={link.to}
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-6 py-4 transition ${
                isActive
                  ? "bg-yellow-500 text-black font-semibold"
                  : "hover:bg-gray-700"
              }`
            }
          >
            <Icon size={20} />
            {link.label}
          </NavLink>
        );
      })}
    </nav>
  );

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="lg:hidden fixed top-3 left-3 z-50 flex items-center gap-2 rounded-full bg-[#1f2937] px-3 py-2 text-white shadow-lg"
      >
        <Menu size={18} />
        <span className="text-sm font-semibold">Menu</span>
      </button>

      <aside className="hidden lg:flex w-64 shrink-0 bg-[#1f2937] text-white min-h-screen">
        <div className="w-full">
          <div className="p-6 text-2xl font-bold border-b border-gray-700">
            Rustic Charm
            <div className="text-sm font-normal text-gray-400">
              Admin Panel
            </div>
          </div>

          {renderLinks()}
        </div>
      </aside>

      {open && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/50" onClick={() => setOpen(false)}>
          <div
            className="h-full w-72 max-w-[85vw] bg-[#1f2937] text-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-gray-700 p-4">
              <div>
                <div className="text-lg font-bold">Rustic Charm</div>
                <div className="text-sm text-gray-400">Admin Panel</div>
              </div>
              <button onClick={() => setOpen(false)} className="rounded-full p-2 hover:bg-gray-700">
                <X size={18} />
              </button>
            </div>

            {renderLinks()}
          </div>
        </div>
      )}
    </>
  );
}