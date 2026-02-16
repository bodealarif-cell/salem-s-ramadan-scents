import { products } from "@/data/products";
import { topProducts, getOldPrice } from "@/data/products";
import type { CartItem } from "@/hooks/useCart";

interface TopProductsModalProps {
  open: boolean;
  onClose: () => void;
  onAddToCart: (item: Omit<CartItem, "quantity">) => void;
}

const TopProductsModal = ({ open, onClose, onAddToCart }: TopProductsModalProps) => {
  if (!open) return null;

  const topItems = products.filter((p) => topProducts.includes(p.id));

  const handleAdd = (product: typeof topItems[0]) => {
    onAddToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      size: "100ml",
      image: product.image,
    });
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-card border border-border rounded-2xl max-w-md w-full shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-primary">
              <i className="fas fa-crown ml-2" /> الأكثر طلباً
            </h3>
            <button onClick={onClose} className="text-muted-foreground hover:text-destructive">
              <i className="fas fa-times text-xl" />
            </button>
          </div>
          <div className="space-y-4">
            {topItems.map((product) => (
              <div key={product.id} className="flex items-center gap-4 bg-secondary/50 rounded-lg p-3">
                <img src={product.image} alt={product.name} className="w-20 h-20 rounded-lg object-cover" />
                <div className="flex-1">
                  <h4 className="text-card-foreground font-bold">{product.name}</h4>
                  <div className="flex items-center gap-2">
                    <span className="text-primary font-bold">{product.price} ج.م</span>
                    <span className="text-muted-foreground line-through text-sm">{getOldPrice(product.price)} ج.م</span>
                  </div>
                </div>
                <button
                  onClick={() => handleAdd(product)}
                  className="bg-primary text-primary-foreground px-3 py-2 rounded-lg text-sm font-bold hover:bg-gold-dark transition-colors"
                >
                  <i className="fas fa-plus" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopProductsModal;
