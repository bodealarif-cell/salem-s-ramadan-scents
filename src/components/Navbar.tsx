import { useState } from "react";
import { useScrollVisibility } from "@/hooks/useScrollVisibility";
import { useAuthStore } from '../store/authStore';
import { auth } from '../firebase/config';
import { signOut } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import LoginModal from './LoginModal';
import React from 'react';

const [showLoginModal, setShowLoginModal] = useState(false);
interface NavbarProps {
  cartCount: number;
  onCartClick: () => void;
  onTopClick: () => void;
  onMenuClick: () => void;
}

const Navbar = ({ cartCount, onCartClick, onTopClick, onMenuClick }: NavbarProps) => {
  const visible = useScrollVisibility();
  const [scrolled, setScrolled] = useState(false);
  const { user } = useAuthStore();
  const navigate = useNavigate();

  useState(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  });

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/');
  };

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

        {/* Icons + Auth */}
        <div className="flex items-center gap-4">
          {/* أيقونة الأكثر طلباً */}
          <button onClick={onTopClick} className="text-primary text-lg hover:scale-110 transition-transform" title="الأكثر طلباً">
            <i className="fas fa-crown" />
          </button>

          {/* أيقونة السلة */}
          <button onClick={onCartClick} className="relative text-primary text-lg hover:scale-110 transition-transform">
            <i className="fas fa-shopping-cart" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </button>

          {/* حالة المستخدم */}{user ? (
  <div className="relative group">
    <button className="flex items-center gap-1 text-primary hover:text-primary/80">
      <i className="fas fa-user-circle text-xl"></i>
      <span className="hidden md:inline">حسابي</span>
      <i className="fas fa-chevron-down text-xs"></i>
    </button>
    <div className="absolute left-0 mt-2 w-48 bg-background border border-border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
      <Link to="/orders" className="block px-4 py-2 text-card-foreground hover:bg-primary/10 hover:text-primary">طلباتي</Link>
      <button onClick={handleLogout} className="block w-full text-right px-4 py-2 text-card-foreground hover:bg-primary/10 hover:text-primary">
        تسجيل خروج
      </button>
    </div>
  </div>
) : (
  <>
    <button onClick={() => setShowLoginModal(true)} className="text-primary font-bold hover:text-primary/80 transition-colors">
      تسجيل دخول
    </button>
    <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
  </>
)}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
