import { seasonalPerfumes, getOldPrice } from "@/data/products";

const SeasonalSection = () => {
  const categories = [
    { title: "العطور الموسمية 🌸", items: seasonalPerfumes.seasonal, gradient: "from-primary/20 to-gold-dark/10" },
    { title: "العطور الشتوية ❄️", items: seasonalPerfumes.winter, gradient: "from-blue-900/30 to-primary/10" },
  ];

  return (
    <section id="seasonal" className="py-20 px-4">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-12">
          العطور الموسمية والشتوية
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {categories.map((cat) => (
            <div
              key={cat.title}
              className={`bg-gradient-to-br ${cat.gradient} border border-primary/30 rounded-xl p-8 hover:border-primary/60 transition-all`}
            >
              <h3 className="text-2xl font-bold text-primary mb-6">{cat.title}</h3>
              <div className="space-y-4">
                {cat.items.map((item) => (
                  <div key={item.name} className="flex justify-between items-center border-b border-primary/10 pb-3">
                    <span className="text-card-foreground font-medium">{item.name}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-muted-foreground line-through text-sm">{getOldPrice(item.price)} ج.م</span>
                      <span className="text-primary font-bold">{item.price} ج.م</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SeasonalSection;
