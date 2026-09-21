import { NavLink } from "react-router-dom";
import { Search, Heart, ShoppingCart, User, Menu, X } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "Categories", path: "/categories" },
    { name: "New Arrivals", path: "/new-arrivals" },
    { name: "Offers", path: "/offers" },
  ];

  const navLinkStyle = ({ isActive }) =>
    `relative py-2 text-sm font-medium transition-all duration-300 ${
      isActive
        ? "text-black after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:bg-black"
        : "text-gray-500 hover:text-black"
    }`;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/95 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Main Navbar */}
        <div className="flex h-20 items-center justify-between">

          {/* Logo + Mobile Menu */}
          <div className="flex items-center gap-3">

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-full text-gray-700 transition hover:bg-gray-100 lg:hidden"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>

            {/* Logo */}
            <NavLink to="/" className="group">
              <span className="text-2xl font-bold tracking-tight text-black">
                Zoviora
              </span>
              <span className="ml-1 inline-block h-1.5 w-1.5 rounded-full bg-black transition-transform group-hover:scale-150" />
            </NavLink>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:block">
            <ul className="flex items-center gap-8">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <NavLink to={link.path} className={navLinkStyle}>
                    {link.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-2 sm:gap-3">

            {/* Search */}
            <button
              className="flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-gray-100"
              aria-label="Search"
            >
              <Search className="h-5 w-5 text-gray-700" />
            </button>

            {/* Wishlist */}
            <NavLink
              to="/wishlist"
              className="relative flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-gray-100"
              aria-label="Wishlist"
            >
              <Heart className="h-5 w-5 text-gray-700" />

              <span className="absolute right-1 top-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-black px-1 text-[10px] font-semibold text-white">
                0
              </span>
            </NavLink>

            {/* Cart */}
            <NavLink
              to="/cart"
              className="relative flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-gray-100"
              aria-label="Shopping Cart"
            >
              <ShoppingCart className="h-5 w-5 text-gray-700" />

              <span className="absolute right-1 top-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-black px-1 text-[10px] font-semibold text-white">
                0
              </span>
            </NavLink>

            {/* Login */}
            <NavLink
              to="/auth/login"
              className="ml-1 hidden items-center gap-2 rounded-full bg-black px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800 sm:flex"
            >
              <User className="h-4 w-4" />
              Login
            </NavLink>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`overflow-hidden transition-all duration-300 lg:hidden ${
            isOpen ? "max-h-125 pb-5 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <nav className="border-t border-gray-100 pt-4">
            <ul className="flex flex-col gap-1">

              {navLinks.map((link) => (
                <li key={link.path}>
                  <NavLink
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      `block rounded-lg px-4 py-3 text-sm font-medium transition ${
                        isActive
                          ? "bg-black text-white"
                          : "text-gray-600 hover:bg-gray-100 hover:text-black"
                      }`
                    }
                  >
                    {link.name}
                  </NavLink>
                </li>
              ))}

              {/* Mobile Login */}
              <li className="mt-2 border-t border-gray-100 pt-3">
                <NavLink
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2 rounded-lg bg-black px-4 py-3 text-sm font-medium text-white"
                >
                  <User className="h-4 w-4" />
                  Login / Register
                </NavLink>
              </li>

            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
