import React, { useState } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/config';
import { sendPasswordResetEmail } from 'firebase/auth';

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
      onClose();
    } catch (error: any) {
      alert(error.message);
    }
  };

  // أنماط مضمونة للتوسيط - تم التعديل هنا
  const overlayStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 60,
  };

  const modalStyle: React.CSSProperties = {
    backgroundColor: '#111827', // gray-900
    padding: '2rem',
    borderRadius: '1rem',
    border: '1px solid rgba(255, 215, 0, 0.3)',
    width: '100%',
    maxWidth: '28rem',
    position: 'relative',
    maxHeight: '90vh',
    overflowY: 'auto',
  };
  const handleForgotPassword = async () => {
  if (!email) {
    alert('الرجاء إدخال بريدك الإلكتروني أولاً.');
    return;
  }
  try {
    await sendPasswordResetEmail(auth, email);
    alert('تم إرسال رابط إعادة تعيين كلمة السر إلى بريدك الإلكتروني.');
  } catch (error: any) {
    alert(error.message);
  }
};
  return (
    <div style={overlayStyle} onClick={onClose}>
      <div style={modalStyle} onClick={e => e.stopPropagation()}>
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            left: '1rem',
            top: '1rem',
            color: '#9CA3AF',
            fontSize: '1.5rem',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#FFD700')}
          onMouseLeave={(e) => (e.currentTarget.style.color = '#9CA3AF')}
        >
          <i className="fas fa-times"></i>
        </button>

        <h2 style={{
          fontSize: '1.875rem',
          fontWeight: 'bold',
          color: '#FFD700',
          marginBottom: '1.5rem',
          textAlign: 'center',
        }}>
          {isLogin ? 'تسجيل الدخول' : 'إنشاء حساب'}
        </h2>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <input
            type="email"
            placeholder="البريد الإلكتروني"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: '100%',
              padding: '0.75rem',
              backgroundColor: '#000',
              border: '1px solid #374151',
              borderRadius: '0.5rem',
              color: '#fff',
            }}
            required
          />
          <input
            type="password"
            placeholder="كلمة المرور"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: '100%',
              padding: '0.75rem',
              backgroundColor: '#000',
              border: '1px solid #374151',
              borderRadius: '0.5rem',
              color: '#fff',
            }}
            required
          />
          <button
            type="submit"
            style={{
              width: '100%',
              backgroundColor: '#FFD700',
              color: '#000',
              padding: '0.75rem',
              borderRadius: '0.5rem',
              fontWeight: 'bold',
              border: 'none',
              cursor: 'pointer',
              transition: 'background-color 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#E6C200')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#FFD700')}
          >
            {isLogin ? 'دخول' : 'تسجيل'}
          </button>
        </form>
    {isLogin && (
  <button
    onClick={handleForgotPassword}
    style={{
      color: '#FFD700',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      textDecoration: 'underline',
      fontSize: '0.9rem',
      marginTop: '0.5rem',
      display: 'block',
      width: '100%',
      textAlign: 'center',
    }}
  >
    نسيت كلمة السر؟
  </button>
)}        
        <p style={{ marginTop: '1rem', textAlign: 'center', color: '#9CA3AF' }}>
          {isLogin ? 'ليس لديك حساب؟ ' : 'لديك حساب بالفعل؟ '}
          <button
            onClick={() => setIsLogin(!isLogin)}
            style={{
              color: '#FFD700',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              textDecoration: 'underline',
            }}
          >
            {isLogin ? 'إنشاء حساب' : 'تسجيل الدخول'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginModal;
