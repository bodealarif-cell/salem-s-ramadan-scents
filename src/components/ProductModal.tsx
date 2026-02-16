import { useState } from "react";
import { products, getOldPrice, getSizePrice } from "@/data/products";
import type { CartItem } from "@/hooks/useCart";

interface ProductModalProps {
  productId: number | null;
  onClose: () => void;
  onAddToCart: (item: Omit<CartItem, "quantity">) => void;
}

const ProductModal = ({ productId, onClose, onAddToCart }: ProductModalProps) => {
  const [size, setSize] = useState("100ml");
  const product = products.find((p) => p.id === productId);

  if (!product) return null;

  const outOfStock = product.specialTag?.includes("خلص");
  const currentPrice = getSizePrice(product.price, size);
  const oldPrice = getOldPrice(currentPrice);

  const handleAdd = () => {
    onAddToCart({
      id: product.id,
      name: product.name,
      price: currentPrice,
      size,
      image: product.image,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm" onClick={onClose}>
      <div
        className="bg-card border border-border rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl shadow-primary/10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image */}
        <div className="relative h-64 overflow-hidden rounded-t-2xl">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          <button onClick={onClose} className="absolute top-3 left-3 bg-background/80 text-card-foreground rounded-full w-8 h-8 flex items-center justify-center hover:bg-destructive hover:text-destructive-foreground transition-colors">
            <i className="fas fa-times" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <h3 className="text-2xl font-bold text-primary">{product.name}</h3>
          <p className="text-muted-foreground">{product.description}</p>

          {/* Layers */}
          <div className="bg-secondary/50 rounded-lg p-4 space-y-2">
            <h4 className="text-primary font-bold mb-2">طبقات العطر</h4>
            <div className="flex justify-between"><span className="text-muted-foreground">المقدمة:</span><span className="text-card-foreground">{product.layers.top}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">القلب:</span><span className="text-card-foreground">{product.layers.heart}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">القاعدة:</span><span className="text-card-foreground">{product.layers.base}</span></div>
          </div>

          <p className="text-sm text-muted-foreground">
            <i className="fas fa-globe-americas ml-1" /> مصدر المستخلص: {product.source}
          </p>

          {/* Size selector */}
          <div>
            <label className="text-card-foreground font-medium mb-2 block">اختر الحجم:</label>
            <select
              value={size}
              onChange={(e) => setSize(e.target.value)}
              className="w-full bg-secondary border border-border rounded-lg p-3 text-card-foreground"
            >
              <option value="100ml">100ml</option>
              <option value="150ml">150ml (+70 ج.م)</option>
              <option value="220ml">220ml (+115 ج.م)</option>
            </select>
          </div>

          {/* Price */}
          <div className="flex items-center gap-4">
            <span className="text-3xl font-bold text-primary">{currentPrice} ج.م</span>
            <span className="text-lg text-muted-foreground line-through">{oldPrice} ج.م</span>
          </div>

          {/* Add to cart */}
          {!outOfStock && (
            <button
              onClick={handleAdd}
              className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-bold text-lg hover:bg-gold-dark transition-colors"
            >
              <i className="fas fa-cart-plus ml-2" /> أضف إلى السلة
            </button>
          )}
          {outOfStock && (
            <div className="text-center text-muted-foreground bg-muted py-3 rounded-lg font-bold">
              هذا المنتج غير متاح حالياً
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
