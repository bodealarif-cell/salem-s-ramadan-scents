import { useEffect, useState } from 'react';
import { db } from '../firebase/config';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useAuthStore } from '../store/authStore';
import { Link } from 'react-router-dom';

const Orders = () => {
  const { user } = useAuthStore();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const q = query(collection(db, 'orders'), where('userId', '==', user.uid));
        const snapshot = await getDocs(q);
        const ordersList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setOrders(ordersList);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [user]);

  if (!user) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-xl">الرجاء <Link to="/login" className="text-gold">تسجيل الدخول</Link> لعرض طلباتك.</p>
      </div>
    );
  }

  if (loading) {
    return <div className="min-h-screen bg-black text-white flex items-center justify-center">جاري التحميل...</div>;
  }

  return (
    <div className="min-h-screen bg-black text-white p-8" dir="rtl">
      <div className="max-w-4xl mx-auto">
        {/* زر العودة للرئيسية */}
        <div className="mb-4">
          <Link to="/" className="text-gold hover:text-yellow-500">
            <i className="fas fa-arrow-right ml-2"></i>
            العودة للرئيسية
          </Link>
        </div>

        <h1 className="text-3xl font-bold text-gold mb-6">طلباتي</h1>

        {orders.length === 0 ? (
          <p className="text-gray-400">لا توجد طلبات سابقة.</p>
        ) : (
          <div className="space-y-4">
            {orders.map(order => (
              <div key={order.id} className="bg-gray-900 p-4 rounded-lg border border-gold/30">
                <p className="text-gold">طلب بتاريخ: {new Date(order.createdAt).toLocaleString('ar-EG')}</p>
                <ul className="mr-4 mt-2 space-y-1">
                  {order.items.map((item, idx) => (
                    <li key={idx} className="text-gray-300">
                      {item.name} ({item.size}) x {item.quantity} = {item.price * item.quantity} ج.م
                    </li>
                  ))}
                </ul>
                <p className="mt-2 text-lg">
                  الإجمالي: <span className="text-gold">{order.total} ج.م</span> - الحالة: <span className="text-gold">{order.status || 'جديد'}</span>
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
