
import {
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  CreditCard,
} from "lucide-react";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="mt-20 bg-black text-white">

      {/* Newsletter Section */}
      <div className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">

            <div className="max-w-xl">
              <p className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-gray-400">
                Stay Connected
              </p>

              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Get 10% off your first order
              </h2>

              <p className="mt-3 text-sm leading-6 text-gray-400">
                Subscribe to our newsletter and get exclusive offers,
                new arrivals and fashion updates directly in your inbox.
              </p>
            </div>

            {/* Newsletter Form */}
            <form className="flex w-full max-w-md">
              <div className="flex w-full items-center rounded-full border border-white/20 bg-white/5 p-1 focus-within:border-white/50">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="min-w-0 flex-1 bg-transparent px-4 py-3 text-sm text-white outline-none placeholder:text-gray-500"
                />

                <button
                  type="submit"
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-black transition hover:bg-gray-200"
                  aria-label="Subscribe"
                >
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>
            </form>

          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-5">

          {/* Brand */}
          <div className="lg:col-span-2">

            <a
              href="/"
              className="inline-flex items-center text-3xl font-bold tracking-tight"
            >
              Zoviora
              <span className="ml-1 mt-3 h-1.5 w-1.5 rounded-full bg-white" />
            </a>

            <p className="mt-5 max-w-sm text-sm leading-7 text-gray-400">
              Discover timeless style, quality products and modern essentials
              curated for your everyday lifestyle.
            </p>

            {/* Contact */}
            <div className="mt-7 space-y-4">

              <div className="flex items-center gap-3 text-sm text-gray-400">
                <MapPin className="h-4 w-4 shrink-0 text-white" />
                <span>Dhaka, Bangladesh</span>
              </div>

              <div className="flex items-center gap-3 text-sm text-gray-400">
                <Phone className="h-4 w-4 shrink-0 text-white" />
                <span>+880 1234-567890</span>
              </div>

              <div className="flex items-center gap-3 text-sm text-gray-400">
                <Mail className="h-4 w-4 shrink-0 text-white" />
                <span>support@zoviora.com</span>
              </div>

            </div>

            {/* Social Icons */}
            <div className="mt-7 flex items-center gap-3">

              <a
                href="#"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 transition hover:bg-white hover:text-black"
              >
                <FaFacebookF className="h-4 w-4" />
              </a>

              <a
                href="#"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 transition hover:bg-white hover:text-black"
              >
                <FaInstagram className="h-4 w-4" />
              </a>

              <a
                href="#"
                aria-label="Twitter"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 transition hover:bg-white hover:text-black"
              >
                <FaTwitter className="h-4 w-4" />
              </a>

              <a
                href="#"
                aria-label="YouTube"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 transition hover:bg-white hover:text-black"
              >
                <FaYoutube className="h-4 w-4" />
              </a>

            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">
              Shop
            </h3>

            <ul className="mt-5 space-y-3 text-sm text-gray-400">

              <li>
                <a
                  href="/shop"
                  className="transition hover:text-white"
                >
                  All Products
                </a>
              </li>

              <li>
                <a
                  href="/new-arrivals"
                  className="transition hover:text-white"
                >
                  New Arrivals
                </a>
              </li>

              <li>
                <a
                  href="/best-sellers"
                  className="transition hover:text-white"
                >
                  Best Sellers
                </a>
              </li>

              <li>
                <a
                  href="/offers"
                  className="transition hover:text-white"
                >
                  Special Offers
                </a>
              </li>

              <li>
                <a
                  href="/categories"
                  className="transition hover:text-white"
                >
                  Categories
                </a>
              </li>

            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">
              Company
            </h3>

            <ul className="mt-5 space-y-3 text-sm text-gray-400">

              <li>
                <a
                  href="/about"
                  className="transition hover:text-white"
                >
                  About Us
                </a>
              </li>

              <li>
                <a
                  href="/contact"
                  className="transition hover:text-white"
                >
                  Contact Us
                </a>
              </li>

              <li>
                <a
                  href="/careers"
                  className="transition hover:text-white"
                >
                  Careers
                </a>
              </li>

              <li>
                <a
                  href="/blog"
                  className="transition hover:text-white"
                >
                  Our Blog
                </a>
              </li>

              <li>
                <a
                  href="/faq"
                  className="transition hover:text-white"
                >
                  FAQ
                </a>
              </li>

            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">
              Support
            </h3>

            <ul className="mt-5 space-y-3 text-sm text-gray-400">

              <li>
                <a
                  href="/shipping"
                  className="transition hover:text-white"
                >
                  Shipping & Delivery
                </a>
              </li>

              <li>
                <a
                  href="/returns"
                  className="transition hover:text-white"
                >
                  Returns & Refunds
                </a>
              </li>

              <li>
                <a
                  href="/privacy"
                  className="transition hover:text-white"
                >
                  Privacy Policy
                </a>
              </li>

              <li>
                <a
                  href="/terms"
                  className="transition hover:text-white"
                >
                  Terms & Conditions
                </a>
              </li>

              <li>
                <a
                  href="/track-order"
                  className="transition hover:text-white"
                >
                  Track Your Order
                </a>
              </li>

            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 px-4 py-6 sm:px-6 md:flex-row lg:px-8">

          <p className="text-center text-xs text-gray-500 md:text-left">
            © {new Date().getFullYear()} Zoviora. All rights reserved.
          </p>

          {/* Payment Methods */}
          <div className="flex items-center gap-3 text-gray-500">
            <CreditCard className="h-4 w-4" />

            <span className="text-xs">
              Secure payments
            </span>

            <span className="hidden text-xs sm:inline">
              •
            </span>

            <span className="text-xs">
              SSL Encrypted
            </span>
          </div>

        </div>
      </div>

    </footer>
  );
};

export default Footer;
