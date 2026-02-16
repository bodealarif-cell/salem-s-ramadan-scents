import React, { useState } from 'react';

interface Message {
  text: string;
  user: boolean;
}

const HreidiAI: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  // الأسئلة الجاهزة (عدلها أو زودها)
  const quickQuestions = [
    { id: 1, text: "ما أفضل عطر للعيد؟" },
    { id: 2, text: "عاوز عطر ثقيل يدوم طويل" },
    { id: 3, text: "عندكم عطور منعشة للصيف؟" },
    { id: 4, text: "إيه الفرق بين العود والعنبر؟" },
    { id: 5, text: "عاوز أشتري هدية لمراتي" }
  ];

  // ردود هريدي (تقدر تغيرها براحتك)
  const getReply = (question: string): string => {
    const q = question.trim();
    if (q.includes("العيد")) {
      return "وعليكم السلام، يا معلم أحسن حاجة للعيد عطر 'شموخ' أو 'عطر العيد' - ريحتهم فخمة وتثبت طول اليوم.";
    } else if (q.includes("ثقيل") || q.includes("يدوم")) {
      return "العطور الثقيلة اللي تدوم: 'خشب العود' و'عطر ليلة العمر' و'عود ملكي' – دول أصلين وممتازين.";
    } else if (q.includes("منعشة") || q.includes("الصيف")) {
      return "للصيف عندنا 'نسيم البحر' و'الحمضيات المنعشة' و'زهور الياسمين' – ريحة خفيفة ونظيفة.";
    } else if (q.includes("العود") && q.includes("العنبر")) {
      return "باختصار يا باشا: العود خشبي ودافي، العنبر حلو وريحته زي العسل شوية. الاتنين مع بعض تحفة!";
    } else if (q.includes("هدية") && q.includes("مراتي")) {
      return "للمدام، جرب 'عطر عروس' أو 'فانيلا ديلايت' أو 'مسك الريم' – ريحة ناعمة ورومانسية.";
    } else {
      return "آسف يا معلم، مش فاهم السؤال. ممكن توضح؟ أو اختار سؤال من اللي تحت.";
    }
  };

  const sendQuestion = (questionText: string) => {
    const userMsg: Message = { text: questionText, user: true };
    setMessages(prev => [...prev, userMsg]);

    setTimeout(() => {
      const replyText = getReply(questionText);
      const replyMsg: Message = { text: replyText, user: false };
      setMessages(prev => [...prev, replyMsg]);
    }, 600);
  };

  return (
    <>
      {/* أيقونة هريدي */}
      <div 
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          background: '#ffd700',
          color: '#000',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '24px',
          cursor: 'pointer',
          boxShadow: '0 4px 15px rgba(255,215,0,0.3)',
          zIndex: 1000
        }}
      >
        <i className="fas fa-robot"></i>
      </div>

      {/* نافذة المحادثة */}
      {isOpen && (
        <div style={{
          position: 'fixed',
          bottom: '90px',
          right: '20px',
          width: '320px',
          maxWidth: '90%',
          background: '#1a1a1a',
          border: '2px solid #ffd700',
          borderRadius: '15px',
          padding: '15px',
          zIndex: 1001,
          boxShadow: '0 5px 25px rgba(0,0,0,0.5)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', borderBottom: '1px solid #333', paddingBottom: '5px' }}>
            <span style={{ color: '#ffd700', fontWeight: 'bold', fontSize: '1.2rem' }}>هريدي الصعيدي 🤖</span>
            <span onClick={() => setIsOpen(false)} style={{ cursor: 'pointer', color: '#ffd700', fontSize: '1.2rem' }}>✕</span>
          </div>

          <div style={{ height: '250px', overflowY: 'auto', marginBottom: '10px', background: '#0a0a0a', padding: '10px', borderRadius: '5px' }}>
            {messages.length === 0 && (
              <div style={{ color: '#888', textAlign: 'center', marginTop: '20px' }}>
                <i className="fas fa-hand-sparkles" style={{ fontSize: '2rem', color: '#ffd700' }}></i>
                <p>اسأل هريدي وختار من الأسئلة الجاهزة</p>
              </div>
            )}
            {messages.map((msg, idx) => (
              <div key={idx} style={{ textAlign: msg.user ? 'left' : 'right', margin: '5px 0' }}>
                <span style={{
                  background: msg.user ? '#ffd700' : '#333',
                  color: msg.user ? '#000' : '#fff',
                  padding: '5px 10px',
                  borderRadius: '15px',
                  display: 'inline-block',
                  maxWidth: '80%'
                }}>
                  {msg.text}
                </span>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginBottom: '10px' }}>
            {quickQuestions.map(q => (
              <button
                key={q.id}
                onClick={() => sendQuestion(q.text)}
                style={{
                  background: 'transparent',
                  border: '1px solid #ffd700',
                  color: '#ffd700',
                  borderRadius: '20px',
                  padding: '5px 10px',
                  fontSize: '0.8rem',
                  cursor: 'pointer',
                  transition: '0.2s'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = '#ffd700'; e.currentTarget.style.color = '#000'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#ffd700'; }}
              >
                {q.text}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default HreidiAI;
