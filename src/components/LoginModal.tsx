import React, { useState } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/config';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      onClose(); // إغلاق المودال بعد النجاح
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[60] bg-black/70"
      onClick={onClose}
    >
      <div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md p-4"
        onClick={e => e.stopPropagation()}
      >
        <div className="bg-gray-900 p-8 rounded-2xl border border-gold/30 relative">
          <button onClick={onClose} className="absolute left-4 top-4 text-gray-400 hover:text-gold text-xl">
            <i className="fas fa-times"></i>
          </button>
          <h2 className="text-3xl font-bold text-gold mb-6 text-center">
            {isLogin ? 'تسجيل الدخول' : 'إنشاء حساب'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              placeholder="البريد الإلكتروني"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 bg-black border border-gray-700 rounded text-white"
              required
            />
            <input
              type="password"
              placeholder="كلمة المرور"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 bg-black border border-gray-700 rounded text-white"
              required
            />
            <button type="submit" className="w-full bg-gold text-black py-3 rounded font-bold hover:bg-yellow-500 transition">
              {isLogin ? 'دخول' : 'تسجيل'}
            </button>
          </form>
          <p className="mt-4 text-center text-gray-400">
            {isLogin ? 'ليس لديك حساب؟ ' : 'لديك حساب بالفعل؟ '}
            <button onClick={() => setIsLogin(!isLogin)} className="text-gold hover:underline">
              {isLogin ? 'إنشاء حساب' : 'تسجيل الدخول'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
