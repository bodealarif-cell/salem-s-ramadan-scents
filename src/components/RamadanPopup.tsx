import { useEffect, useState } from 'react';

const RamadanPopup = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // تحقق مما إذا تم عرض النافذة من قبل في هذه الجلسة
    const hasSeenPopup = sessionStorage.getItem('ramadanPopupSeen');
    if (!hasSeenPopup) {
      setShow(true);
      sessionStorage.setItem('ramadanPopupSeen', 'true');
    }
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70" onClick={() => setShow(false)}>
      <div className="bg-gray-900 p-8 rounded-2xl border border-gold/30 max-w-md w-full relative" onClick={e => e.stopPropagation()}>
        <button onClick={() => setShow(false)} className="absolute left-4 top-4 text-gray-400 hover:text-gold text-xl">
          <i className="fas fa-times"></i>
        </button>
        <i className="fas fa-star-and-crescent text-gold text-5xl mb-4 block text-center"></i>
        <h2 className="text-3xl font-bold text-gold mb-2 text-center">🌙 عرض التراويح</h2>
        <p className="text-lg text-white mb-4 text-center">عطر التراويح الجديد بخصم 30% لفترة محدودة</p>
        <button
          onClick={() => setShow(false)}
          className="w-full bg-gold text-black py-3 rounded font-bold hover:bg-yellow-500 transition"
        >
          تسوق الآن
        </button>
      </div>
    </div>
  );
};

export default RamadanPopup;
