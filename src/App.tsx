import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/config';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Products from './components/Products';
import Faq from './components/Faq';
import Contact from './components/Contact';
import Footer from './components/Footer';
// وأي مكونات تانية زي ProductModal, CartModal إلخ
import { useAuthStore } from './store/authStore';
import Login from './pages/Login';
// استيراد باقي مكونات موقعك القديم (مثل Products, Navbar, إلخ)

function App() {
  const setUser = useAuthStore(state => state.setUser);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={
          <>
            {/* هنا ضع كل محتوى موقعك القديم (الرئيسية، المنتجات، إلخ) */}
            <div>import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import HreidiAI from './components/HreidiAI';
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
       <HreidiAI />
  </QueryClientProvider>
);

export default App;</div>
          </>
        } />
        {/* يمكنك إضافة مسارات أخرى محمية لاحقًا */}
      </Routes>
    </BrowserRouter>
  );
}
