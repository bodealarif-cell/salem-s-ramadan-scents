import { useState } from "react";
import { faqData } from "@/data/products";

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-20 px-4">
      <div className="container mx-auto max-w-3xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-12">
          الأسئلة الشائعة
        </h2>
        <div className="space-y-4">
          {faqData.map((item, i) => (
            <div key={i} className="border border-border rounded-xl overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-right hover:bg-secondary/50 transition-colors"
              >
                <span className="text-card-foreground font-bold">{item.q}</span>
                <i className={`fas fa-chevron-down text-primary transition-transform ${openIndex === i ? "rotate-180" : ""}`} />
              </button>
              {openIndex === i && (
                <div className="px-5 pb-5 text-muted-foreground animate-fade-in-up">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
