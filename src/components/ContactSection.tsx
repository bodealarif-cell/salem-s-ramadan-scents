import { useState } from "react";

const ContactSection = () => {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <section id="contact" className="py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-12">
          اتصل بنا
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {/* Info */}
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <i className="fas fa-map-marker-alt text-primary text-xl w-8" />
              <span className="text-card-foreground">مصر - القاهرة</span>
            </div>
            <div className="flex items-center gap-4">
              <i className="fas fa-phone text-primary text-xl w-8" />
              <span className="text-card-foreground">01012345678</span>
            </div>
            <div className="flex items-center gap-4">
              <i className="fas fa-envelope text-primary text-xl w-8" />
              <a href="mailto:bodealarif@gmail.com" className="text-card-foreground hover:text-primary transition-colors">
                bodealarif@gmail.com
              </a>
            </div>

            <div className="flex gap-4 pt-4">
              <a href="https://instagram.com/bodealarif" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-colors">
                <i className="fab fa-instagram text-xl" />
              </a>
              <a href="https://wa.me/01012345678" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-colors">
                <i className="fab fa-whatsapp text-xl" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-colors">
                <i className="fab fa-twitter text-xl" />
              </a>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="الاسم"
              required
              maxLength={100}
              className="w-full bg-secondary border border-border rounded-lg p-3 text-card-foreground"
            />
            <input
              type="email"
              placeholder="البريد الإلكتروني"
              required
              maxLength={255}
              className="w-full bg-secondary border border-border rounded-lg p-3 text-card-foreground"
            />
            <textarea
              placeholder="رسالتك"
              required
              maxLength={1000}
              rows={4}
              className="w-full bg-secondary border border-border rounded-lg p-3 text-card-foreground resize-none"
            />
            <button type="submit" className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-bold hover:bg-gold-dark transition-colors">
              {sent ? "✅ تم الإرسال" : "إرسال"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
