import { useState, useEffect } from "react";

const RamadanPopup = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm" onClick={() => setShow(false)}>
      <div className="bg-card border-2 border-primary rounded-2xl max-w-sm w-full shadow-2xl shadow-primary/20 text-center p-8" onClick={e => e.stopPropagation()}>
        <div className="text-5xl mb-4">🌙</div>
        <h3 className="text-2xl font-bold text-primary mb-3">عرض التراويح الخاص!</h3>
        <p className="text-card-foreground mb-2">عطر التراويح بخصم <span className="text-primary font-bold">30%</span></p>
        <p className="text-3xl font-bold text-primary mb-4">99.99 ج.م فقط!</p>
        <p className="text-muted-foreground text-sm mb-6">العرض لفترة محدودة - رمضان كريم 🏮</p>
        <button
          onClick={() => {
            setShow(false);
            document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
          }}
          className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-bold hover:bg-gold-dark transition-colors"
        >
          تسوق الآن
        </button>
      </div>
    </div>
  );
};

export default RamadanPopup;
