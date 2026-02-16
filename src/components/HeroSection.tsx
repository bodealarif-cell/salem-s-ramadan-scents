const HeroSection = () => {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1541643600914-78b084683601?w=1920&q=80')",
        }}
      />
      <div className="absolute inset-0 bg-background/85" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 animate-fade-in-up">
        <p className="text-primary text-lg mb-4 font-semibold">🌙 عروض رمضان الحصرية 🌙</p>
        <h2 className="text-4xl md:text-6xl font-bold text-card-foreground mb-6 leading-tight">
          عروض رمضان و<span className="text-primary">باكدج التراويح</span>
        </h2>
        <p className="text-xl md:text-2xl text-muted-foreground mb-8">
          خصومات تصل إلى <span className="text-primary font-bold">50%</span> على أفخم العطور الشرقية
        </p>
        <button
          onClick={() => document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })}
          className="bg-primary text-primary-foreground px-8 py-4 rounded-lg text-lg font-bold hover:bg-gold-dark transition-colors shadow-lg shadow-primary/30"
        >
          تسوق الآن <i className="fas fa-arrow-down mr-2" />
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
