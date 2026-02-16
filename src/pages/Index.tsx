import { useState } from "react";
import { useCart } from "@/hooks/useCart";
import RamadanStrip from "@/components/RamadanStrip";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import SeasonalSection from "@/components/SeasonalSection";
import ProductsGrid from "@/components/ProductsGrid";
import ProductModal from "@/components/ProductModal";
import CartModal from "@/components/CartModal";
import CheckoutModal from "@/components/CheckoutModal";
import FAQSection from "@/components/FAQSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import SideMenu from "@/components/SideMenu";
import TopProductsModal from "@/components/TopProductsModal";
import RamadanPopup from "@/components/RamadanPopup";
import { useScrollVisibility } from "@/hooks/useScrollVisibility";

const Index = () => {
  const cart = useCart();
  const visible = useScrollVisibility();

  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showTop, setShowTop] = useState(false);

  const handleCheckoutComplete = (name: string, phone: string, address: string) => {
    cart.addOrder({
      items: cart.items,
      total: cart.total,
      shipping: cart.shipping,
      name,
      phone,
      address,
    });
    cart.clearCart();
    setShowCheckout(false);
    setShowCart(false);
    alert("✅ تم إرسال طلبك بنجاح! شكراً لك.");
  };

  return (
    <div className="min-h-screen bg-background">
      <RamadanPopup />
      <RamadanStrip />
      <Navbar
        cartCount={cart.count}
        onCartClick={() => setShowCart(true)}
        onTopClick={() => setShowTop(true)}
        onMenuClick={() => setShowMenu(true)}
      />

      <main>
        <HeroSection />
        <SeasonalSection />
        <ProductsGrid onProductClick={setSelectedProduct} />
        <FAQSection />
        <ContactSection />
      </main>

      <Footer />

      {/* Floating delivery button */}
      <button
        onClick={() => setShowCart(true)}
        className={`fixed bottom-6 left-6 z-30 bg-primary text-primary-foreground px-5 py-3 rounded-full font-bold shadow-lg shadow-primary/30 hover:bg-gold-dark transition-all ${
          visible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
        }`}
      >
        <i className="fas fa-truck ml-2" /> أسرع دليفري في مصر
      </button>

      {/* Side menu toggle */}
      <button
        onClick={() => setShowMenu(true)}
        className={`fixed top-1/2 left-0 z-30 bg-primary text-primary-foreground w-10 h-10 rounded-r-full font-bold shadow-lg transition-all ${
          visible ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <i className="fas fa-bars" />
      </button>

      {/* Modals */}
      {selectedProduct && (
        <ProductModal
          productId={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={cart.addItem}
        />
      )}
      {showCart && (
        <CartModal
          items={cart.items}
          total={cart.total}
          shipping={cart.shipping}
          onClose={() => setShowCart(false)}
          onRemove={cart.removeItem}
          onCheckout={() => { setShowCart(false); setShowCheckout(true); }}
        />
      )}
      {showCheckout && (
        <CheckoutModal
          items={cart.items}
          total={cart.total}
          shipping={cart.shipping}
          onClose={() => setShowCheckout(false)}
          onComplete={handleCheckoutComplete}
        />
      )}
      <SideMenu
        open={showMenu}
        onClose={() => setShowMenu(false)}
        orders={cart.orders}
        debt={cart.debt}
      />
      <TopProductsModal
        open={showTop}
        onClose={() => setShowTop(false)}
        onAddToCart={cart.addItem}
      />
    </div>
  );
};

export default Index;
