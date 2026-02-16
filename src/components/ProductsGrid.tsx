import { products, getOldPrice } from "@/data/products";

interface ProductsGridProps {
  onProductClick: (id: number) => void;
}

const ProductsGrid = ({ onProductClick }: ProductsGridProps) => {
  return (
    <section id="products" className="py-20 px-4">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-12">
          منتجاتنا المميزة
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => {
            const outOfStock = product.specialTag?.includes("خلص");
            return (
              <div
                key={product.id}
                className="group bg-card border border-border rounded-xl overflow-hidden hover:border-primary/50 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                onClick={() => onProductClick(product.id)}
              >
                {/* Image */}
                <div className="relative overflow-hidden h-56">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                  {/* Discount badge */}
                  <span className="absolute top-3 left-3 bg-destructive text-destructive-foreground text-xs font-bold px-2 py-1 rounded-full">
                    -30%
                  </span>
                  {/* Special badge */}
                  {(product.badge || product.specialTag) && (
                    <span
                      className={`absolute top-3 right-3 text-xs font-bold px-3 py-1 rounded-full ${
                        outOfStock
                          ? "bg-muted text-muted-foreground"
                          : "bg-primary text-primary-foreground"
                      }`}
                    >
                      {product.badge || product.specialTag}
                    </span>
                  )}
                </div>

                {/* Info */}
                <div className="p-4">
                  <h3 className="text-lg font-bold text-card-foreground mb-2">{product.name}</h3>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-primary font-bold text-xl">{product.price} ج.م</span>
                    <span className="text-muted-foreground line-through text-sm">{getOldPrice(product.price)} ج.م</span>
                  </div>
                  <button
                    disabled={outOfStock}
                    className={`w-full py-2 rounded-lg font-bold transition-colors ${
                      outOfStock
                        ? "bg-muted text-muted-foreground cursor-not-allowed"
                        : "bg-primary text-primary-foreground hover:bg-gold-dark"
                    }`}
                  >
                    {outOfStock ? "غير متاح" : "التفاصيل"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProductsGrid;
