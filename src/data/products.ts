export interface Product {
  id: number;
  name: string;
  price: number; // base price for 100ml
  description: string;
  layers: {
    top: string;
    heart: string;
    base: string;
  };
  source: string;
  image: string;
  badge?: string;
  specialTag?: string;
}

export const products: Product[] = [
  {
    id: 1,
    name: "عطر التراويح",
    price: 99.99,
    description: "عطر مميز بأجواء رمضانية روحانية، مزيج من العود والمسك الأبيض مع لمسات من العنبر.",
    layers: { top: "العود الكمبودي", heart: "المسك الأبيض", base: "العنبر الملكي" },
    source: "كمبوديا والهند",
    image: "https://i.ibb.co/Gfxj4RKn/d0e7fe27-e53d-44f1-82ff-c3b5e5405faf.jpg",
    badge: "أفضل منتج",
  },
  {
    id: 2,
    name: "عطر ليلة العمر",
    price: 250,
    description: "عطر فاخر للمناسبات الخاصة، يجمع بين الورد الدمشقي والعود مع قاعدة من خشب الصندل.",
    layers: { top: "الورد الدمشقي", heart: "العود الهندي", base: "خشب الصندل" },
    source: "سوريا والهند",
    image: "https://i.ibb.co/5W24XW6h/d137db26-18b8-42fc-8a50-9ec3f3391aea-thumbnail-1000x1000-70.jpg",
  },
  {
    id: 3,
    name: "عطر الورد الطائفي",
    price: 200,
    description: "عطر ورد طائفي أصيل من أجود أنواع الورد السعودي مع لمسات من المسك.",
    layers: { top: "الورد الطائفي", heart: "الياسمين", base: "المسك الأبيض" },
    source: "الطائف، السعودية",
    image: "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?w=400",
  },
  {
    id: 4,
    name: "عطر خشب العود",
    price: 350,
    description: "عود كمبودي فاخر من أندر الأنواع، رائحة قوية وثابتة تدوم طوال اليوم.",
    layers: { top: "العود الكمبودي", heart: "خشب الأرز", base: "الراتنج" },
    source: "كمبوديا",
    image: "https://i.ibb.co/zTzp1YkR/430618826-7260200654027347-364486546344387881-n.jpg",
    specialTag: "للأسف خلص يا برو",
  },
  {
    id: 5,
    name: "عطر المسك الأبيض",
    price: 150,
    description: "مسك أبيض نقي بنفحات ناعمة ومنعشة، مثالي للاستخدام اليومي.",
    layers: { top: "الليمون", heart: "المسك الأبيض", base: "الفانيليا" },
    source: "فرنسا",
    image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=400",
  },
  {
    id: 6,
    name: "عطر العنبر الملكي",
    price: 280,
    description: "عنبر ملكي فاخر مع مزيج من التوابل الشرقية والعود.",
    layers: { top: "الزعفران", heart: "العنبر", base: "العود" },
    source: "عمان والهند",
    image: "https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=400",
    badge: "الأكثر مبيعاً",
  },
  {
    id: 7,
    name: "عطر شموخ",
    price: 320,
    description: "عطر يعكس الفخامة والرقي، مزيج من العود والبخور مع لمسات من الزعفران.",
    layers: { top: "الزعفران", heart: "البخور", base: "العود المعتق" },
    source: "الإمارات",
    image: "https://i.ibb.co/WNgwSmkt/image.webp",
  },
  {
    id: 8,
    name: "عطر الفخامة",
    price: 400,
    description: "من أرقى العطور الشرقية، يجمع بين العود والورد مع قاعدة دخانية.",
    layers: { top: "الورد البلغاري", heart: "العود", base: "دخان البخور" },
    source: "بلغاريا والهند",
    image: "https://i.ibb.co/RkZLVnYs/61-Ak-Rdrgy-WL-AC-UF894-1000-QL80.jpg",
  },
  {
    id: 9,
    name: "عطر ليالي الشرق",
    price: 180,
    description: "عطر شرقي كلاسيكي بنفحات دافئة من الفانيليا والعنبر.",
    layers: { top: "البرغموت", heart: "الفانيليا", base: "العنبر" },
    source: "فرنسا",
    image: "https://images.unsplash.com/photo-1563170351-be82bc888aa4?w=400",
  },
  {
    id: 10,
    name: "عطر سحر الليل",
    price: 220,
    description: "عطر مسائي فاخر بنفحات غامضة من الباتشولي والعود.",
    layers: { top: "البرغموت", heart: "الباتشولي", base: "العود" },
    source: "إندونيسيا",
    image: "https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?w=400",
  },
  {
    id: 11,
    name: "عطر نسمة الصباح",
    price: 130,
    description: "عطر صباحي منعش بنفحات الحمضيات والزهور البيضاء.",
    layers: { top: "الليمون والبرتقال", heart: "الياسمين", base: "المسك" },
    source: "إيطاليا",
    image: "https://i.ibb.co/3y9XDLy3/4.jpg",
  },
  {
    id: 12,
    name: "عطر تاج العروس",
    price: 300,
    description: "عطر مخصص للعرائس، مزيج أنثوي فاخر من الورد والمسك والعنبر.",
    layers: { top: "الورد", heart: "المسك", base: "العنبر والفانيليا" },
    source: "تركيا وفرنسا",
    image: "https://images.unsplash.com/photo-1608528577891-eb055944f2e7?w=400",
  },
  {
    id: 13,
    name: "عطر الأمير",
    price: 380,
    description: "عطر ملكي فاخر يجمع بين أندر المكونات الشرقية.",
    layers: { top: "الزعفران والهيل", heart: "العود الملكي", base: "المسك والعنبر" },
    source: "السعودية والهند",
    image: "https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=400",
    specialTag: "للأسف خلص يا برو",
  },
];

export const seasonalPerfumes = {
  seasonal: [
    { name: "عطر الربيع", price: 160 },
    { name: "عطر الصيف المنعش", price: 140 },
    { name: "عطر نسيم البحر", price: 175 },
    { name: "عطر زهور الربيع", price: 190 },
  ],
  winter: [
    { name: "عطر الشتاء الدافئ", price: 210 },
    { name: "عطر ليالي الشتاء", price: 240 },
    { name: "عطر العود الشتوي", price: 280 },
    { name: "عطر المسك الدافئ", price: 195 },
  ],
};

export const faqData = [
  { q: "ما هي سياسة الإرجاع؟", a: "يمكنك إرجاع المنتج خلال 7 أيام من الاستلام بشرط أن يكون مغلقاً ولم يُستخدم." },
  { q: "كم تستغرق مدة التوصيل؟", a: "التوصيل يستغرق من 2 إلى 5 أيام عمل حسب المنطقة. نوفر أسرع دليفري في مصر!" },
  { q: "هل العطور أصلية؟", a: "نعم، هههه أكيد مش أصليه بس هاي هاي كوبي." },
  { q: "هل يوجد دفع عند الاستلام؟", a: "نعم، نوفر خدمة الدفع عند الاستلام في جميع المحافظات.عدا المنوفية ونجع عبدالرسول" },
  { q: "ما هي تكلفة الشحن؟", a: "الشحن مجاني للطلبات فوق 350 ج.م. وإلا تكون تكلفة الشحن 60 ج.م فقط." },
  { q: "هل يمكنني اختيار حجم العطر؟", a: "نعم، نوفر 3 أحجام: 100ml و 150ml و 220ml لمعظم العطور." },
];

export const topProducts = [1, 3, 7]; // IDs of top products

export function getOldPrice(price: number): number {
  return Math.round(price / 0.7);
}

export function getSizePrice(basePrice: number, size: string): number {
  switch (size) {
    case "150ml": return basePrice + 70;
    case "220ml": return basePrice + 115;
    default: return basePrice;
  }
}
