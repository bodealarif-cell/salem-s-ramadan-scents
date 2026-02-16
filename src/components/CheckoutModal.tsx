import { useState } from "react";
import emailjs from "@emailjs/browser";
import type { CartItem } from "@/hooks/useCart";
import { db } from '../firebase/config';
import { collection, addDoc } from 'firebase/firestore';
import { useAuthStore } from '../store/authStore';

interface CheckoutModalProps {
  items: CartItem[];
  total: number;
  shipping: number;
  onClose: () => void;
  onComplete: (name: string, phone: string, address: string) => void;
}

const CheckoutModal = ({ items, total, shipping, onClose, onComplete }: CheckoutModalProps) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !address.trim()) return;

    setSending(true);

    const orderDetails = items
      .map((i) => `${i.name} (${i.size}) × ${i.quantity} = ${i.price * i.quantity} ج.م`)
      .join("\n");
       const user = useAuthStore.getState().user;

// حفظ الطلب في Firestore
const orderData = {
  userId: user?.uid || null,
  userName: name,
  userPhone: phone,
  userAddress: address,
  items: items.map(i => ({
    name: i.name,
    size: i.size,
    quantity: i.quantity,
    price: i.price
  })),
  subtotal: total,
  shipping: shipping,
  total: total + shipping,
  createdAt: new Date().toISOString(),
  status: 'جديد'
};

await addDoc(collection(db, 'orders'), orderData);
    try {
      await emailjs.send(
  "service_nyg72od",
  "template_achxet5",
  {
    // بيانات العميل – الأسماء دي لازم تطابق القالب بالضبط
    user_name: name,
    user_phone: phone,
    user_address: address,

    // تفاصيل الطلب
    order_details: orderDetails,

    // السعر
    subtotal: `${total} ج.م`,
    shipping_cost: shipping === 0 ? "مجاني" : `${shipping} ج.م`,
    total_price: `${total + shipping} ج.م`,   // بعض القوالب تستخدم total_price بدل total_amount
    total_amount: `${total + shipping} ج.م`,   // احتياطاً لو كان القالب يستخدم total_amount
  },
  "d6uaINDZn8lMtDhQq"
);
    } catch (error) {
      console.error("EmailJS error:", error);
    }

    onComplete(name, phone, address);
    setSending(false);
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-card border border-border rounded-2xl max-w-md w-full shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-primary">إتمام الطلب</h3>
            <button onClick={onClose} className="text-muted-foreground hover:text-destructive">
              <i className="fas fa-times text-xl" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-card-foreground font-medium block mb-1">الاسم</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-secondary border border-border rounded-lg p-3 text-card-foreground"
                placeholder="اسمك الكامل"
                required
                maxLength={100}
              />
            </div>
            <div>
              <label className="text-card-foreground font-medium block mb-1">الهاتف</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-secondary border border-border rounded-lg p-3 text-card-foreground"
                placeholder="رقم الهاتف"
                required
                maxLength={20}
              />
            </div>
            <div>
              <label className="text-card-foreground font-medium block mb-1">العنوان</label>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full bg-secondary border border-border rounded-lg p-3 text-card-foreground resize-none"
                placeholder="العنوان بالتفصيل"
                rows={3}
                required
                maxLength={500}
              />
            </div>

            <div className="bg-secondary/50 rounded-lg p-3 text-sm">
              <div className="flex justify-between text-card-foreground">
                <span>الإجمالي مع التوصيل:</span>
                <span className="text-primary font-bold">{total + shipping} ج.م</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={sending}
              className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-bold hover:bg-gold-dark transition-colors disabled:opacity-50"
            >
              {sending ? "جاري الإرسال..." : "تأكيد الطلب"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;
