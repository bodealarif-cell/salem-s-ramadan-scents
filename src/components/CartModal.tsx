import type { CartItem } from "@/hooks/useCart";

interface CartModalProps {
  items: CartItem[];
  total: number;
  shipping: number;
  onClose: () => void;
  onRemove: (id: number, size: string) => void;
  onCheckout: () => void;
}

const CartModal = ({ items, total, shipping, onClose, onRemove, onCheckout }: CartModalProps) => {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-card border border-border rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-primary">
              <i className="fas fa-shopping-cart ml-2" /> سلة التسوق
            </h3>
            <button onClick={onClose} className="text-muted-foreground hover:text-destructive transition-colors">
              <i className="fas fa-times text-xl" />
            </button>
          </div>

          {items.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">السلة فارغة</p>
          ) : (
            <>
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={`${item.id}-${item.size}`} className="flex items-center gap-4 bg-secondary/50 rounded-lg p-3">
                    <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover" />
                    <div className="flex-1">
                      <h4 className="text-card-foreground font-bold">{item.name}</h4>
                      <p className="text-sm text-muted-foreground">{item.size} × {item.quantity}</p>
                      <p className="text-primary font-bold">{item.price * item.quantity} ج.م</p>
                    </div>
                    <button onClick={() => onRemove(item.id, item.size)} className="text-destructive hover:text-destructive/80">
                      <i className="fas fa-trash" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="border-t border-border pt-4 space-y-2">
                <div className="flex justify-between text-card-foreground">
                  <span>المجموع:</span><span>{total} ج.م</span>
                </div>
                <div className="flex justify-between text-card-foreground">
                  <span>التوصيل:</span>
                  <span className={shipping === 0 ? "text-green-500" : ""}>
                    {shipping === 0 ? "مجاني ✨" : `${shipping} ج.م`}
                  </span>
                </div>
                <div className="flex justify-between text-primary font-bold text-xl pt-2 border-t border-border">
                  <span>الإجمالي:</span><span>{total + shipping} ج.م</span>
                </div>
              </div>

              <button onClick={onCheckout} className="w-full mt-6 bg-primary text-primary-foreground py-3 rounded-lg font-bold hover:bg-gold-dark transition-colors">
                إتمام الطلب
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartModal;
