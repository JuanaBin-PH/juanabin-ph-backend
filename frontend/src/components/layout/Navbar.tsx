import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Leaf, Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import { primaryNavigation, siteConfig } from "../../config/site";
import { useScrollToSection } from "../../hooks/useScrollToSection";
import juanabinLogo from "../../assets/juanabin-logo.png";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const scrollToSection = useScrollToSection();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavigation = (href: string) => {
    setIsOpen(false);
    // Only scroll to section if it's a hash link
    if (href.startsWith("#")) {
      scrollToSection(href);
    }
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/95 backdrop-blur shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <a
          href="#top"
          className="flex items-center gap-3 flex-shrink-0"
          aria-label="JuanaBin PH home"
        >
          <img
            src={juanabinLogo}
            alt="JuanaBin PH"
            className="w-8 h-8"
          />
          <div className="flex flex-col">
            <span className="text-lg font-bold text-slate-900 leading-tight">
              JuanaBin PH
            </span>
            <span className="text-xs text-emerald-600 font-medium leading-tight">
              Buslo Builders
            </span>
          </div>
        </a>

        <div className="hidden lg:flex items-center gap-4 xl:gap-8">
          {primaryNavigation.map((link) =>
            link.href.startsWith("#") ? (
              <button
                key={link.href}
                onClick={() => handleNavigation(link.href)}
                className="text-sm text-slate-600 hover:text-emerald-600 transition-colors whitespace-nowrap"
              >
                {link.label}
              </button>
            ) : (
              <Link
                key={link.href}
                to={link.href}
                className="text-sm text-slate-600 hover:text-emerald-600 transition-colors whitespace-nowrap"
              >
                {link.label}
              </Link>
            )
          )}
        </div>

        <button
          onClick={() => handleNavigation("#activity")}
          className="hidden lg:block px-4 py-2 rounded-lg bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700 transition-colors whitespace-nowrap flex-shrink-0"
        >
          Launch Pilot
        </button>

        <button
          type="button"
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isOpen}
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2 text-slate-900"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-white border-t"
        >
          <div className="px-4 py-4 space-y-3">
            {primaryNavigation.map((link) =>
              link.href.startsWith("#") ? (
                <button
                  key={link.href}
                  onClick={() => handleNavigation(link.href)}
                  className="block w-full text-left py-2 text-slate-600 hover:text-emerald-600"
                >
                  {link.label}
                </button>
              ) : (
                <Link
                  key={link.href}
                  to={link.href}
                  className="block w-full text-left py-2 text-slate-600 hover:text-emerald-600"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              )
            )}
            <button
              onClick={() => handleNavigation("#activity")}
              className="w-full mt-4 px-4 py-2 rounded-lg bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700"
            >
              Launch Pilot
            </button>
          </div>
        </motion.div>
      )}
    </nav>
  );
}
