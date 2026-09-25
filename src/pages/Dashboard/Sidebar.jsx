import { useState } from "react";
import { NavLink } from "react-router-dom";

const links = [
  { icon: "⌂", label: "Overview", to: "/dashboard/admin" },
  {
    icon: "▣",
    label: "Catalog",
    children: [
      ["Products", "/dashboard/admin/products"],
      ["Categories", "/dashboard/admin/categories"],
      ["Inventory", "/dashboard/admin/inventory"],
    ],
  },
  {
    icon: "◫",
    label: "Orders",
    children: [
      ["All orders", "/dashboard/admin/orders"],
      ["Pending", "/dashboard/admin/orders/pending"],
      ["Completed", "/dashboard/admin/orders/completed"],
      ["Returns & refunds", "/dashboard/admin/orders/returns"],
    ],
  },
  { icon: "♢", label: "Customers", to: "/dashboard/admin/customers" },
  {
    icon: "✦",
    label: "Marketing",
    children: [
      ["Offers", "/dashboard/admin/offers"],
      ["New arrivals", "/dashboard/admin/new-arrivals"],
      ["Coupons", "/dashboard/admin/coupons"],
    ],
  },
  {
    icon: "⚙",
    label: "Settings",
    children: [
      ["Store settings", "/dashboard/admin/settings"],
      ["Team members", "/dashboard/admin/settings/team"],
    ],
  },
];

const Sidebar = ({ open = false, onClose }) => {
  const [expanded, setExpanded] = useState(["Catalog", "Orders"]);
  const toggle = (label) =>
    setExpanded((current) =>
      current.includes(label)
        ? current.filter((item) => item !== label)
        : [...current, label],
    );

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col bg-[#1d2926] text-white transition-transform duration-300 lg:static lg:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}
    >
      <div className="flex h-20 items-center justify-between border-b border-white/10 px-7">
        <div>
          <p className="font-serif text-2xl tracking-tight">
            lumire<span className="text-[#d28b62]">.</span>
          </p>
          <p className="mt-0.5 text-[8px] uppercase tracking-[0.2em] text-white/40">
            Admin workspace
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="text-xl cursor-pointer hover:bg-red-900/70 py-2 px-6 rounded-lg font-bold text-white/50 lg:hidden"
        >
          X
        </button>
      </div>
      <div className="flex-1 overflow-y-auto px-4 py-7">
        <p className="mb-3 px-3 text-[9px] font-semibold uppercase tracking-[0.18em] text-white/35">
          Manage store
        </p>
        <nav className="space-y-1">
          {links.map((item) =>
            item.children ? (
              <div key={item.label}>
                <button
                  type="button"
                  onClick={() => toggle(item.label)}
                  className="flex w-full items-center gap-3 rounded-sm px-3 py-3 text-left text-xs text-white/60 transition hover:bg-white/10 hover:text-white"
                >
                  <span className="w-5 text-center text-base">{item.icon}</span>
                  <span className="flex-1">{item.label}</span>
                  <span
                    className={`text-[10px] transition ${expanded.includes(item.label) ? "rotate-180" : ""}`}
                  >
                    ⌄
                  </span>
                </button>
                {expanded.includes(item.label) && (
                  <div className="ml-8 border-l border-white/10 pb-1 pl-3">
                    {item.children.map(([label, to]) => (
                      <NavLink
                        key={to}
                        to={to}
                        onClick={onClose}
                        className={({ isActive }) =>
                          `block rounded-sm px-3 py-2 text-[10px] transition ${isActive ? "bg-white/15 text-[#e8b18e]" : "text-white/45 hover:text-white"}`
                        }
                      >
                        {label}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <NavLink
                key={item.label}
                to={item.to}
                end={item.to === "/dashboard"}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-sm px-3 py-3 text-xs transition ${isActive ? "bg-[#b85b32] text-white" : "text-white/60 hover:bg-white/10 hover:text-white"}`
                }
              >
                <span className="w-5 text-center text-base">{item.icon}</span>
                {item.label}
              </NavLink>
            ),
          )}
        </nav>
      </div>
      <div className="border-t border-white/10 p-5">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#d6a47c] text-xs font-semibold text-[#1d2926]">
            A
          </div>
          <div>
            <p className="text-xs font-medium">Admin account</p>
            <p className="mt-0.5 text-[9px] text-white/40">Store manager</p>
          </div>
        </div>
      </div>
    </aside>
  );
};
export default Sidebar;
