import { useState } from "react";
import type { Order } from "@/hooks/useCart";

interface SideMenuProps {
  open: boolean;
  onClose: () => void;
  orders: Order[];
  debt: number;
}

const SideMenu = ({ open, onClose, orders, debt }: SideMenuProps) => {
  const [tab, setTab] = useState<"orders" | "debt" | "rate">("orders");
  const [rating, setRating] = useState(0);
  const [rated, setRated] = useState(false);

  const handleRate = () => {
    if (rating > 0) {
      setRated(true);
      setTimeout(() => setRated(false), 3000);
    }
  };

  return (
    <>
      {open && <div className="fixed inset-0 z-[55] bg-background/60" onClick={onClose} />}
      <div
        className={`fixed top-0 right-0 h-full w-80 max-w-[90vw] bg-card border-l border-border z-[56] transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        } overflow-y-auto`}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-primary">القائمة</h3>
            <button onClick={onClose} className="text-muted-foreground hover:text-destructive">
              <i className="fas fa-times text-xl" />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-6">
            {[
              { key: "orders" as const, label: "طلباتي", icon: "fa-box" },
              { key: "debt" as const, label: "مديون بكام", icon: "fa-money-bill" },
              { key: "rate" as const, label: "قيمنا", icon: "fa-star" },
            ].map((t) => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`flex-1 py-2 rounded-lg text-xs font-bold transition-colors ${
                  tab === t.key ? "bg-primary text-primary-foreground" : "bg-secondary text-card-foreground"
                }`}
              >
                <i className={`fas ${t.icon} ml-1`} /> {t.label}
              </button>
            ))}
          </div>

          {/* Orders */}
          {tab === "orders" && (
            <div className="space-y-4">
              {orders.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">لا توجد طلبات سابقة</p>
              ) : (
                orders.map((order) => (
                  <div key={order.id} className="bg-secondary/50 rounded-lg p-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{order.date}</span>
                      <span className={order.paid ? "text-green-500" : "text-destructive"}>
                        {order.paid ? "مدفوع" : "غير مدفوع"}
                      </span>
                    </div>
                    <p className="text-card-foreground font-bold">{order.name}</p>
                    {order.items.map((item, i) => (
                      <p key={i} className="text-sm text-muted-foreground">
                        {item.name} ({item.size}) × {item.quantity}
                      </p>
                    ))}
                    <p className="text-primary font-bold">{order.total + order.shipping} ج.م</p>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Debt */}
          {tab === "debt" && (
            <div className="text-center py-8">
              <i className="fas fa-money-bill-wave text-4xl text-primary mb-4" />
              <p className="text-muted-foreground mb-2">إجمالي المديونية</p>
              <p className="text-4xl font-bold text-primary">{debt} ج.م</p>
              {debt === 0 && <p className="text-green-500 mt-2">🎉 مافيش عليك حاجة</p>}
            </div>
          )}

          {/* Rating */}
          {tab === "rate" && (
            <div className="text-center py-8 space-y-4">
              <p className="text-card-foreground font-bold">قيم تجربتك معانا</p>
              <div className="flex justify-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    className={`text-3xl transition-colors ${
                      star <= rating ? "text-primary" : "text-muted"
                    }`}
                  >
                    <i className="fas fa-star" />
                  </button>
                ))}
              </div>
              <button
                onClick={handleRate}
                disabled={rating === 0}
                className="bg-primary text-primary-foreground px-8 py-2 rounded-lg font-bold hover:bg-gold-dark transition-colors disabled:opacity-50"
              >
                {rated ? "✅ شكراً لتقييمك!" : "إرسال التقييم"}
              </button>
            </div>
          )}

          {/* Mobile nav links */}
          <div className="mt-8 border-t border-border pt-6 space-y-3 md:hidden">
            {["hero:الرئيسية", "products:المنتجات", "seasonal:الموسمية", "faq:الأسئلة", "contact:اتصل بنا"].map((link) => {
              const [id, label] = link.split(":");
              return (
                <button
                  key={id}
                  onClick={() => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); onClose(); }}
                  className="block w-full text-right text-card-foreground hover:text-primary py-2 font-medium transition-colors"
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default SideMenu;
