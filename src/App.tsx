import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/config";
import { useAuthStore } from "./store/authStore";
import Index from "./pages/Index";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import HreidiAI from './components/HreidiAI';
import Orders from './pages/Orders';

const queryClient = new QueryClient();

const App = () => {
  const setUser = useAuthStore(state => state.setUser);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            {<Route path="/orders" element={<Orders />} />}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        <HreidiAI />
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
