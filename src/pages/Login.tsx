import React, { useState } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/config';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      navigate('/');
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <div className="bg-gray-900 p-8 rounded-2xl border border-gold/30 w-full max-w-md">
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
          <button type="submit" className="w-full bg-gold text-black py-3 rounded font-bold">
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
  );
};

export default Login;
