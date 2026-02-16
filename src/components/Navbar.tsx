import { useState } from "react";
import { useScrollVisibility } from "@/hooks/useScrollVisibility";

interface NavbarProps {
  cartCount: number;
  onCartClick: () => void;
  onTopClick: () => void;
  onMenuClick: () => void;
}

const Navbar = ({ cartCount, onCartClick, onTopClick, onMenuClick }: NavbarProps) => {
  const visible = useScrollVisibility();
  const [scrolled, setScrolled] = useState(false);

  useState(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  });

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const links = [
    { label: "الرئيسية", id: "hero" },
    { label: "المنتجات", id: "products" },
    { label: "الموسمية", id: "seasonal" },
    { label: "الأسئلة", id: "faq" },
    { label: "اتصل بنا", id: "contact" },
  ];

  return (
    <nav
      className={`fixed top-10 left-0 right-0 z-40 transition-all duration-300 ${
        visible ? "translate-y-0" : "-translate-y-[calc(100%+2.5rem)]"
      } ${scrolled ? "bg-background/90 backdrop-blur-md shadow-lg shadow-primary/5" : "bg-transparent"}`}
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Mobile menu */}
        <button onClick={onMenuClick} className="md:hidden text-primary text-xl">
          <i className="fas fa-bars" />
        </button>

        {/* Logo */}
        <h1
          className="text-2xl font-bold text-primary cursor-pointer"
          onClick={() => scrollTo("hero")}
        >
          عطور سالم
        </h1>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-6">
          {links.map((link) => (
            <li key={link.id}>
              <button
                onClick={() => scrollTo(link.id)}
                className="text-card-foreground hover:text-primary transition-colors font-medium"
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Icons */}
        <div className="flex items-center gap-4">
          <button onClick={onTopClick} className="text-primary text-lg hover:scale-110 transition-transform" title="الأكثر طلباً">
            <i className="fas fa-crown" />
          </button>
          <button onClick={onCartClick} className="relative text-primary text-lg hover:scale-110 transition-transform">
            <i className="fas fa-shopping-cart" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
