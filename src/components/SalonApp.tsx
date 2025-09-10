"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Textarea } from "./ui/textarea";
import {
  Calendar,
  Users,
  Gift,
  BarChart3,
  MessageSquare,
  Settings,
  ArrowLeft,
  Plus,
  Edit,
  Trash2,
  Star,
  Clock,
  Phone,
  Mail,
  Package,
  Palette,
  X,
  ChevronLeft,
  ChevronRight,
  ShoppingCart,
  Heart,
  Play,
  Sparkles,
  Search,
  Filter,
  Trophy,
  Send,
  Camera,
  Bookmark,
  Share2,
  MoreHorizontal,
  ThumbsUp,
  MessageCircle,
  TrendingUp,
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import conlaceLogo from "figma:asset/8305e79e0ee519de65fc150d46efbeb4caf7abb2.png";
import wellaShampooImage from "figma:asset/23d1d3db0f50be6a01acf1b0fd268c793f84c91e.png";
import wellaConditionerImage from "figma:asset/f499ab6edf5be164058c7c83b8c89b3cf1ba983e.png";
import wellaMaskImage from "figma:asset/b896cb645ec7c66aecbdfeb17af4ce7ebb02c41f.png";

type SalonScreen =
  | "login"
  | "dashboard"
  | "clients"
  | "rewards"
  | "reports"
  | "client-detail"
  | "planner"
  | "social"
  | "layout-config"
  | "campaign-detail"
  | "product-detail"
  | "product-management"
  | "orders"
  | "analytics";

interface SalonAppProps {
  onBack: () => void;
}

export function SalonApp({ onBack }: SalonAppProps) {
  const [currentScreen, setCurrentScreen] =
    useState<SalonScreen>("login");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedClient, setSelectedClient] =
    useState<any>(null);
  const [selectedMonth, setSelectedMonth] = useState<any>(null);
  const [selectedProduct, setSelectedProduct] =
    useState<any>(null);
  const [selectedColor, setSelectedColor] = useState("#FF6B6B");

  const [showCampaignModal, setShowCampaignModal] =
    useState(false);
  const [campaignForm, setCampaignForm] = useState({
    title: "",
    startDate: "",
    endDate: "",
    status: "planned",
    actions: [""],
  });
  const [newPost, setNewPost] = useState("");
  const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set());
  const [savedPosts, setSavedPosts] = useState<Set<number>>(new Set());

  const mockSalon = {
    name: "Bella Vista Salão",
    owner: "Patrícia Santos",
  };

  const mockClients = [
    {
      id: 1,
      name: "Maria Silva",
      points: 450,
      level: "Gold",
      lastVisit: "15/08/2024",
      phone: "(11) 99999-9999",
      preferences: "Cortes curtos, produtos naturais",
    },
    {
      id: 2,
      name: "Ana Costa",
      points: 280,
      level: "Silver",
      lastVisit: "12/08/2024",
      phone: "(11) 88888-8888",
      preferences: "Coloração, tratamentos",
    },
    {
      id: 3,
      name: "Carla Mendes",
      points: 150,
      level: "Bronze",
      lastVisit: "10/08/2024",
      phone: "(11) 77777-7777",
      preferences: "Manicure, pedicure",
    },
  ];

  const mockAppointments = [
    {
      time: "09:00",
      client: "Maria Silva",
      service: "Corte + Escova",
      status: "confirmed",
    },
    {
      time: "11:00",
      client: "Ana Costa",
      service: "Coloração",
      status: "confirmed",
    },
    {
      time: "14:00",
      client: "Carla Mendes",
      service: "Manicure",
      status: "pending",
    },
    {
      time: "16:00",
      client: "Lucia Reis",
      service: "Hidratação",
      status: "confirmed",
    },
  ];

  const mockRewards = [
    {
      id: 1,
      name: "Desconto 20% Corte",
      points: 300,
      active: true,
    },
    { id: 2, name: "Escova Grátis", points: 200, active: true },
    {
      id: 3,
      name: "Tratamento Premium",
      points: 800,
      active: false,
    },
  ];

  const mockCampaigns = {
    1: {
      // Janeiro
      title: "Promoção Ano Novo",
      startDate: "01/01/2025",
      endDate: "31/01/2025",
      actions: [
        '✅ Lançar campanha "Novo Ano, Novo Visual"',
        "⏳ Criar posts para redes sociais",
        "✅ Configurar desconto 30% em coloração",
      ],
      status: "active",
    },
    2: {
      // Fevereiro
      title: "Especial Carnaval",
      startDate: "01/02/2025",
      endDate: "28/02/2025",
      actions: [
        "⏳ Preparar looks de carnaval",
        "⏳ Oferta especial em maquiagem",
        "⏳ Parcerias com blocos",
      ],
      status: "planned",
    },
    5: {
      // Maio
      title: "Mês das Mães",
      startDate: "01/05/2025",
      endDate: "31/05/2025",
      actions: [
        '✅ Criar pacotes "Mãe e Filha"',
        "✅ Decoração temática",
        "⏳ Promoção especial dia das mães",
      ],
      status: "completed",
    },
  };

  const mockOrders = [
    {
      id: 1,
      customerName: "Maria Silva",
      customerPhone: "(11) 99999-9999",
      items: [
        { productId: 1, quantity: 1, price: 68.9 },
        { productId: 3, quantity: 1, price: 89.9 },
      ],
      total: 158.8,
      status: "pending",
      date: "2025-01-15",
      time: "14:30",
    },
    {
      id: 2,
      customerName: "Ana Costa",
      customerPhone: "(11) 88888-8888",
      items: [{ productId: 5, quantity: 2, price: 128.9 }],
      total: 257.8,
      status: "confirmed",
      date: "2025-01-15",
      time: "15:45",
    },
    {
      id: 3,
      customerName: "Carla Mendes",
      customerPhone: "(11) 77777-7777",
      items: [{ productId: 9, quantity: 1, price: 149.9 }],
      total: 149.9,
      status: "delivered",
      date: "2025-01-14",
      time: "16:20",
    },
  ];

  const mockProductAnalytics = [
    {
      productId: 1,
      name: "Wella Invigo Brilliance Shampoo",
      sales: 24,
      revenue: 1653.6,
      trend: "+15%",
    },
    {
      productId: 5,
      name: "Kérastase Nutritive Bain Satin 1",
      sales: 18,
      revenue: 2320.2,
      trend: "+22%",
    },
    {
      productId: 9,
      name: "Kit Wella Fusion",
      sales: 12,
      revenue: 1798.8,
      trend: "+8%",
    },
    {
      productId: 3,
      name: "Wella Oil Reflections Máscara",
      sales: 15,
      revenue: 1348.5,
      trend: "+12%",
    },
    {
      productId: 7,
      name: "Kérastase Chronologiste Máscara",
      sales: 9,
      revenue: 1709.1,
      trend: "+5%",
    },
  ];

  const mockProducts = [
    // Wella Professionals
    {
      id: 1,
      brand: "Wella Professionals",
      line: "Invigo Brilliance",
      name: "Wella Professionals Shampoo Invigo Brilliance",
      volume: "250ml",
      fullName: "Wella Professionals Invigo Brilliance 250ml",
      price: 68.9,
      originalPrice: 85.0,
      category: "Cabelo",
      image: wellaShampooImage,
      stock: 4,
      rating: 4.8,
      reviews: 127,
      description:
        "Shampoo para cabelos coloridos, protege e realça o brilho da cor.",
    },
    {
      id: 2,
      brand: "Wella Professionals",
      line: "Fusion",
      name: "Wella Professionals Condicionador Fusion",
      volume: "200ml",
      fullName: "Wella Professionals Fusion 200ml",
      price: 72.5,
      originalPrice: null,
      category: "Cabelo",
      image: wellaConditionerImage,
      stock: 2,
      rating: 4.7,
      reviews: 89,
      description:
        "Condicionador reparador intensivo para cabelos danificados.",
    },
    {
      id: 3,
      brand: "Wella Professionals",
      line: "Oil Reflections",
      name: "Wella Professionals Máscara Oil Reflections",
      volume: "150ml",
      fullName: "Wella Professionals Oil Reflections 150ml",
      price: 89.9,
      originalPrice: 110.0,
      category: "Cabelo",
      image: wellaMaskImage,
      stock: 1,
      rating: 4.9,
      reviews: 156,
      description:
        "Máscara nutritiva para brilho luminoso e sedosidade intensa.",
    },
    {
      id: 4,
      brand: "Wella Professionals",
      line: "Oil Reflections",
      name: "Wella Professionals Óleo Oil Reflections",
      volume: "100ml",
      fullName: "Wella Professionals Oil Reflections 100ml",
      price: 95.9,
      originalPrice: 120.0,
      category: "Cabelo",
      image:
        "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYWlyJTIwb2lsJTIwdHJlYXRtZW50fGVufDF8fHx8MTc1NzQ4MjI3M3ww&ixlib=rb-4.1.0&q=80&w=1080",
      stock: 0,
      rating: 4.6,
      reviews: 94,
      description:
        "Óleo nutritivo para brilho e proteção instantâneos.",
    },
    // Kérastase
    {
      id: 5,
      brand: "Kérastase",
      line: "Nutritive Bain Satin 1",
      name: "Kérastase Shampoo Nutritive Bain Satin 1",
      volume: "250ml",
      fullName: "Kérastase Nutritive Bain Satin 1 250ml",
      price: 128.9,
      originalPrice: 145.0,
      category: "Cabelo",
      image:
        "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBoYWlyJTIwc2hhbXBvb3xlbnwxfHx8fDE3NTc0ODIyNzN8MA&ixlib=rb-4.1.0&q=80&w=1080",
      stock: 3,
      rating: 4.9,
      reviews: 203,
      description:
        "Shampoo nutritivo para cabelos normais a ligeiramente ressecados.",
    },
    {
      id: 6,
      brand: "Kérastase",
      line: "Résistance Ciment Anti-Usure",
      name: "Kérastase Condicionador Résistance Ciment Anti-Usure",
      volume: "200ml",
      fullName: "Kérastase Résistance Ciment Anti-Usure 200ml",
      price: 135.5,
      originalPrice: null,
      category: "Cabelo",
      image:
        "https://images.unsplash.com/photo-1556228720-195a672e8a03?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYWlyJTIwbWFzayUyMHRyZWF0bWVudHxlbnwxfHx8fDE3NTc0ODIyNzN8MA&ixlib=rb-4.1.0&q=80&w=1080",
      stock: 1,
      rating: 4.8,
      reviews: 76,
      description:
        "Condicionador reconstrutor para cabelos danificados e quebradiços.",
    },
    {
      id: 7,
      brand: "Kérastase",
      line: "Chronologiste",
      name: "Kérastase Máscara Chronologiste",
      volume: "200ml",
      fullName: "Kérastase Chronologiste 200ml",
      price: 189.9,
      originalPrice: 220.0,
      category: "Cabelo",
      image:
        "https://images.unsplash.com/photo-1556228720-195a672e8a03?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYWlyJTIwbWFzayUyMHRyZWF0bWVudHxlbnwxfHx8fDE3NTc0ODIyNzN8MA&ixlib=rb-4.1.0&q=80&w=1080",
      stock: 2,
      rating: 4.9,
      reviews: 124,
      description:
        "Máscara anti-idade para cabelos maduros, revitaliza e regenera.",
    },
    {
      id: 8,
      brand: "Kérastase",
      line: "Elixir Ultime",
      name: "Kérastase Óleo Elixir Ultime",
      volume: "100ml",
      fullName: "Kérastase Elixir Ultime 100ml",
      price: 165.9,
      originalPrice: 190.0,
      category: "Cabelo",
      image:
        "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYWlyJTIwb2lsJTIwdHJlYXRtZW50fGVufDF8fHx8MTc1NzQ4MjI3M3ww&ixlib=rb-4.1.0&q=80&w=1080",
      stock: 0,
      rating: 4.8,
      reviews: 187,
      description:
        "Óleo sublimador universal para todos os tipos de cabelos.",
    },
    // Kits
    {
      id: 9,
      brand: "Wella Professionals",
      line: "Fusion",
      name: "Kit Wella Fusion",
      volume: "Shampoo 250ml + Condicionador 200ml",
      fullName:
        "Kit Wella Fusion (Shampoo 250ml + Condicionador 200ml)",
      price: 149.9,
      originalPrice: 180.0,
      category: "Kit",
      image:
        "https://images.unsplash.com/photo-1624574966266-1cdd65b74500?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWF1dHklMjBwcm9kdWN0cyUyMGNvc21ldGljc3xlbnwxfHx8fDE3NTc0NzU0ODh8MA&ixlib=rb-4.1.0&q=80&w=1080",
      stock: 2,
      rating: 4.8,
      reviews: 92,
      description:
        "Kit completo Wella Fusion para cabelos danificados.",
    },
    {
      id: 10,
      brand: "Kérastase",
      line: "Nutritive",
      name: "Kit Kérastase Nutritive",
      volume: "Shampoo 250ml + Máscara 200ml + Óleo 100ml",
      fullName:
        "Kit Kérastase Nutritive (Shampoo 250ml + Máscara 200ml + Óleo 100ml)",
      price: 389.9,
      originalPrice: 450.0,
      category: "Kit",
      image:
        "https://images.unsplash.com/photo-1624574966266-1cdd65b74500?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWF1dHklMjBwcm9kdWN0cyUyMGNvc21ldGljc3xlbnwxfHx8fDE3NTc0NzU0ODh8MA&ixlib=rb-4.1.0&q=80&w=1080",
      stock: 0,
      rating: 4.9,
      reviews: 156,
      description:
        "Kit completo Kérastase para nutrição intensa dos cabelos.",
    },
  ];

  const colorPalette = [
    {
      name: "Bege Suave",
      color: "#FFF5E1",
      preview: "#FFF5E1",
    },
    {
      name: "Cinza Claro",
      color: "#F2F2F2",
      preview: "#F2F2F2",
    },
    { name: "Nude Rosé", color: "#F5D5D0", preview: "#F5D5D0" },
    {
      name: "Verde Oliva",
      color: "#A8B5A0",
      preview: "#A8B5A0",
    },
    {
      name: "Azul Acinzentado",
      color: "#B8C5D1",
      preview: "#B8C5D1",
    },
    {
      name: "Vinho Fechado",
      color: "#8B5A6B",
      preview: "#8B5A6B",
    },
  ];

  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentScreen("dashboard");
  };

  const viewClientDetail = (client: any) => {
    setSelectedClient(client);
    setCurrentScreen("client-detail");
  };

  const viewCampaignDetail = (month: number) => {
    setSelectedMonth(month);
    setCurrentScreen("campaign-detail");
  };



  const openCampaignModal = (month?: number) => {
    if (month && mockCampaigns[month]) {
      setCampaignForm({
        title: mockCampaigns[month].title,
        startDate: mockCampaigns[month].startDate,
        endDate: mockCampaigns[month].endDate,
        status: mockCampaigns[month].status,
        actions: mockCampaigns[month].actions.map((a) =>
          a.substring(2),
        ),
      });
    } else {
      setCampaignForm({
        title: "",
        startDate: "",
        endDate: "",
        status: "planned",
        actions: [""],
      });
    }
    setShowCampaignModal(true);
  };

  const addAction = () => {
    setCampaignForm((prev) => ({
      ...prev,
      actions: [...prev.actions, ""],
    }));
  };

  const updateAction = useCallback(
    (index: number, value: string) => {
      setCampaignForm((prev) => {
        const newActions = [...prev.actions];
        newActions[index] = value;
        return {
          ...prev,
          actions: newActions,
        };
      });
    },
    [],
  );

  const removeAction = useCallback((index: number) => {
    setCampaignForm((prev) => ({
      ...prev,
      actions: prev.actions.filter((_, i) => i !== index),
    }));
  }, []);

  const months = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  const mockSocialPosts = [
    {
      id: 1,
      type: 'client-photo',
      user: { name: 'Maria Silva', avatar: 'MS', level: 'Gold' },
      content: 'Apaixonada pelo meu novo visual! 😍 Obrigada @bellavista_salao ✨',
      image: 'https://images.unsplash.com/photo-1712641966879-63f3bc1a47e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWF1dHklMjBzYWxvbiUyMGhhaXIlMjBzdHlsaW5nfGVufDF8fHx8MTc1NjIxMjEwN3ww&ixlib=rb-4.1.0&q=80&w=1080',
      likes: 24,
      comments: 8,
      time: '2h',
      salon: 'Bella Vista Salão'
    },
    {
      id: 2,
      type: 'tip',
      user: { name: 'Ana Costa', avatar: 'AC', level: 'Silver' },
      content: 'Meninas, descobri que lavar o cabelo com água fria no final da lavagem deixa os fios mais brilhosos! Quem mais sabia dessa dica? 💡',
      likes: 15,
      comments: 12,
      time: '4h'
    },
    {
      id: 3,
      type: 'question',
      user: { name: 'Carla Mendes', avatar: 'CM', level: 'Bronze' },
      content: 'Gente, alguém tem dica de tratamento caseiro para cabelo ressecado? Meu cabelo tá pedindo socorro! 😭',
      likes: 8,
      comments: 18,
      time: '6h'
    },
    {
      id: 4,
      type: 'salon-promotion',
      user: { name: 'Bella Vista Salão', avatar: 'BV', level: 'Verified', isOfficial: true },
      content: '✨ FLASH SALE! Próximas 3 horas: 30% OFF em todos os tratamentos capilares! ⚡ Aproveitem meninas! 💆‍♀️',
      likes: 45,
      comments: 22,
      time: '1h',
      isFlash: true
    }
  ];

  const toggleLike = (postId: number) => {
    setLikedPosts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  const toggleSave = (postId: number) => {
    setSavedPosts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  const BottomNav = () => (
    <motion.div
      className="fixed bottom-6 left-6 right-6 safe-area-pb"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        delay: 0.5,
        duration: 0.8,
        type: "spring",
        stiffness: 100,
      }}
    >
      {/* Premium Pill Tab Bar */}
      <div className="relative">
        {/* Floating shadow for depth */}
        <div className="absolute inset-0 bg-black/8 rounded-full blur-lg scale-105"></div>

        {/* Main pill container */}
        <div className="relative bg-white/95 backdrop-blur-2xl border border-white/20 rounded-full px-3 py-4 shadow-2xl">
          <div className="flex justify-around items-center">
            {[
              {
                screen: "dashboard",
                icon: Calendar,
                label: "Agenda",
                color: "#B8A7E6",
              },
              {
                screen: "planner",
                icon: Sparkles,
                label: "PLANNER DE AÇÕES",
                color: "#F4C2A1",
              },
              {
                screen: "social",
                icon: Users,
                label: "Feed",
                color: "#FFB366",
              },
              {
                screen: "analytics",
                icon: BarChart3,
                label: "Relatórios",
                color: "#A8D8B9",
              },
              {
                screen: "layout-config",
                icon: Palette,
                label: "Cores",
                color: "#F2D2A9",
              },
            ].map((item, index) => {
              const isActive =
                currentScreen === item.screen ||
                (item.screen === "social" &&
                  currentScreen === "social") ||
                (item.screen === "planner" &&
                  currentScreen === "campaign-detail") ||
                (item.screen === "analytics" &&
                  (currentScreen === "analytics" || 
                   currentScreen === "orders")) ||
                (item.screen === "clients" &&
                  currentScreen === "client-detail") ||
                (item.screen === "layout-config" &&
                  currentScreen === "layout-config");

              return (
                <motion.button
                  key={item.screen}
                  onClick={() =>
                    setCurrentScreen(item.screen as SalonScreen)
                  }
                  className="relative flex flex-col items-center justify-center p-3 rounded-2xl transition-all duration-500"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{
                    scale: 0.95,
                    y: [0, -8, 0],
                    transition: {
                      duration: 0.3,
                      type: "spring",
                      stiffness: 400,
                    },
                  }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.1 * index,
                    duration: 0.6,
                  }}
                >
                  {/* Circular glow indicator for active item */}
                  {isActive && (
                    <motion.div
                      className="absolute inset-0 rounded-2xl"
                      style={{
                        background: `radial-gradient(circle, ${item.color}20 0%, ${item.color}10 50%, transparent 70%)`,
                        boxShadow: `0 0 20px ${item.color}40`,
                      }}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                      }}
                    />
                  )}

                  {/* Floating circular background for active item */}
                  {isActive && (
                    <motion.div
                      className="absolute w-12 h-12 rounded-full"
                      style={{
                        backgroundColor: item.color + "30",
                      }}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      layoutId="activeIndicator"
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 25,
                      }}
                    />
                  )}

                  {/* Icon with premium bounce animation */}
                  <motion.div
                    animate={
                      isActive
                        ? {
                            y: [0, -4, 0],
                            scale: [1, 1.15, 1],
                            rotate: [0, 5, -5, 0],
                          }
                        : { scale: 1 }
                    }
                    transition={{
                      duration: 0.6,
                      type: "spring",
                      stiffness: 300,
                      repeat: isActive ? Infinity : 0,
                      repeatDelay: 2,
                    }}
                    className="relative z-10"
                  >
                    <item.icon
                      size={24}
                      strokeWidth={1.5}
                      className={`transition-all duration-300 ${
                        isActive
                          ? "text-gray-700 drop-shadow-sm"
                          : "text-gray-400"
                      }`}
                    />
                  </motion.div>

                  {/* Label with elegant fade-in */}
                  {isActive && (
                    <motion.span
                      className="absolute -bottom-1 text-xs font-medium tracking-wide relative z-10"
                      style={{
                        color: item.color.replace(
                          "A7E6",
                          "6B6B",
                        ),
                      }}
                      initial={{
                        opacity: 0,
                        y: 10,
                        scale: 0.8,
                      }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.8 }}
                      transition={{ delay: 0.2, duration: 0.4 }}
                    >
                      {item.label}
                    </motion.span>
                  )}

                  {/* Subtle shine effect on hover */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/0 via-white/20 to-white/0"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Elegant border highlight */}
        <div
          className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none"
          style={{ height: "1px", top: 0 }}
        />
      </div>
    </motion.div>
  );

  const LoginScreen = () => (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-beige to-white flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-6 pt-12">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
        >
          <ArrowLeft size={24} />
          <span>Voltar</span>
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-center px-6">
        {/* Logo and Title */}
        <div className="text-center mb-10">
          <img
            src={conlaceLogo}
            alt="ConLace"
            className="w-20 h-20 mx-auto mb-6"
          />
          <h1 className="text-3xl font-bold text-purple mb-2">
            Bem-vinda, Patrícia!
          </h1>
          <p className="text-gray-600">
            Acesse o painel do seu salão
          </p>
        </div>

        {/* Login Form */}
        <Card className="border-0 shadow-xl bg-white/95 backdrop-blur">
          <CardContent className="p-8">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Email do Salão
                </label>
                <Input
                  type="email"
                  placeholder="contato@bellavista.com"
                  className="w-full h-14 text-lg rounded-xl"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Senha
                </label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  className="w-full h-14 text-lg rounded-xl"
                />
              </div>

              <Button
                onClick={handleLogin}
                className="w-full h-14 bg-purple hover:bg-purple-light text-white text-lg font-medium rounded-xl shadow-lg"
              >
                Entrar
              </Button>

              <div className="text-center">
                <button className="text-coral hover:text-coral-light transition-colors font-medium">
                  Esqueci minha senha
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );

  const DashboardScreen = () => (
    <motion.div
      className="min-h-screen bg-gray-soft pb-24"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-purple to-coral p-6 pt-12 text-white rounded-b-3xl">
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center space-x-3">
            <img
              src={conlaceLogo}
              alt="ConLace"
              className="w-8 h-8"
            />
            <div>
              <h1 className="text-xl font-bold">
                {mockSalon.name}
              </h1>
              <p className="opacity-90 text-sm">
                Olá, {mockSalon.owner}!
              </p>
            </div>
          </div>
          <button
            onClick={onBack}
            className="text-white/80 hover:text-white p-2"
          >
            <ArrowLeft size={24} />
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-4">
          <Card className="bg-white/15 backdrop-blur border-0">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-white">
                28
              </p>
              <p className="text-white/80 text-xs">
                Clientes Ativos
              </p>
            </CardContent>
          </Card>
          <Card className="bg-white/15 backdrop-blur border-0">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-white">
                12
              </p>
              <p className="text-white/80 text-xs">
                Agendamentos
              </p>
            </CardContent>
          </Card>
          <Card className="bg-white/15 backdrop-blur border-0">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-white">
                85%
              </p>
              <p className="text-white/80 text-xs">
                Satisfação
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Today's Schedule */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Calendar className="text-purple" size={24} />
                <span>Agenda de Hoje</span>
              </div>
              <Badge className="bg-mint text-white">
                4 agendamentos
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockAppointments.map((appointment, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-beige rounded-2xl"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-purple rounded-full flex items-center justify-center">
                      <Clock className="text-white" size={20} />
                    </div>
                    <div>
                      <p className="font-medium">
                        {appointment.client}
                      </p>
                      <p className="text-sm text-gray-600">
                        {appointment.service}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-purple text-lg">
                      {appointment.time}
                    </p>
                    <Badge
                      className={
                        appointment.status === "confirmed"
                          ? "bg-mint text-white"
                          : "bg-coral text-white"
                      }
                    >
                      {appointment.status === "confirmed"
                        ? "Confirmado"
                        : "Pendente"}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-800">
            Ações Rápidas
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <Button
              onClick={() => setCurrentScreen("orders")}
              className="bg-coral hover:bg-coral-light text-white p-6 h-auto flex flex-col space-y-3 rounded-2xl shadow-lg"
            >
              <ShoppingCart size={36} />
              <span className="text-base font-medium">
                Ver Pedidos
              </span>
            </Button>
            <Button
              onClick={() => setCurrentScreen("planner")}
              className="bg-mint hover:bg-mint-light text-white p-6 h-auto flex flex-col space-y-3 rounded-2xl shadow-lg"
            >
              <Sparkles size={36} />
              <span className="text-base font-medium">
                Campanhas
              </span>
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Button
              onClick={() =>
                setCurrentScreen("product-management")
              }
              className="bg-purple hover:bg-purple-light text-white p-6 h-auto flex flex-col space-y-3 rounded-2xl shadow-lg"
            >
              <Package size={36} />
              <span className="text-base font-medium">
                Gerenciar Produtos
              </span>
            </Button>
            <Button
              onClick={() => setCurrentScreen("layout-config")}
              className="bg-gradient-to-br from-purple to-coral hover:opacity-90 text-white p-6 h-auto flex flex-col space-y-3 rounded-2xl shadow-lg"
            >
              <Palette size={36} />
              <span className="text-base font-medium">
                Personalizar
              </span>
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Button
              onClick={() => setCurrentScreen("clients")}
              className="bg-gradient-to-br from-mint to-coral hover:opacity-90 text-white p-6 h-auto flex flex-col space-y-3 rounded-2xl shadow-lg"
            >
              <Users size={36} />
              <span className="text-base font-medium">
                Ver Clientes
              </span>
            </Button>
            <Button
              onClick={() => setCurrentScreen("rewards")}
              className="bg-gradient-to-br from-coral to-purple hover:opacity-90 text-white p-6 h-auto flex flex-col space-y-3 rounded-2xl shadow-lg"
            >
              <Gift size={36} />
              <span className="text-base font-medium">
                Recompensas
              </span>
            </Button>
          </div>
        </div>

        {/* Recent Activity */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Atividade Recente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-4 bg-beige rounded-2xl">
                <div className="w-3 h-3 bg-mint rounded-full"></div>
                <div>
                  <p className="font-medium">
                    Maria Silva resgatou uma recompensa
                  </p>
                  <p className="text-sm text-gray-600">
                    há 2 horas
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-4 bg-beige rounded-2xl">
                <div className="w-3 h-3 bg-coral rounded-full"></div>
                <div>
                  <p className="font-medium">
                    Novo agendamento de Ana Costa
                  </p>
                  <p className="text-sm text-gray-600">
                    há 4 horas
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Gestão Completa */}
        <Card className="shadow-lg border-l-4 border-l-coral">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Settings className="text-coral" size={24} />
              <span>Gestão Completa</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <Button
                onClick={() => setCurrentScreen("clients")}
                variant="outline"
                className="flex items-center space-x-2 p-4 h-auto border-coral text-coral hover:bg-coral hover:text-white"
              >
                <Users size={20} />
                <span className="text-sm">Clientes</span>
              </Button>
              <Button
                onClick={() => setCurrentScreen("rewards")}
                variant="outline"
                className="flex items-center space-x-2 p-4 h-auto border-mint text-mint hover:bg-mint hover:text-white"
              >
                <Gift size={20} />
                <span className="text-sm">Recompensas</span>
              </Button>
              <Button
                onClick={() => setCurrentScreen("reports")}
                variant="outline"
                className="flex items-center space-x-2 p-4 h-auto border-purple text-purple hover:bg-purple hover:text-white"
              >
                <BarChart3 size={20} />
                <span className="text-sm">Relatórios</span>
              </Button>
              <Button
                onClick={() => setCurrentScreen("layout-config")}
                variant="outline"
                className="flex items-center space-x-2 p-4 h-auto border-coral text-coral hover:bg-coral hover:text-white"
              >
                <Palette size={20} />
                <span className="text-sm">Cores</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );

  const ClientsScreen = () => (
    <motion.div
      className="min-h-screen bg-gray-soft pb-24"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="bg-coral p-6 pt-12 text-white rounded-b-3xl">
        <div className="flex items-center space-x-4">
          <img
            src={conlaceLogo}
            alt="ConLace"
            className="w-8 h-8"
          />
          <div>
            <h1 className="text-2xl font-bold">
              Gestão de Clientes
            </h1>
            <p className="opacity-90">
              Acompanhe seus clientes ativos
            </p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Clientes Ativos</h2>
          <Button className="bg-mint hover:bg-mint-light text-white px-4 py-2 rounded-xl">
            <Plus size={20} className="mr-2" />
            Adicionar
          </Button>
        </div>

        {mockClients.map((client) => (
          <Card
            key={client.id}
            className="hover:shadow-md transition-shadow shadow-lg"
          >
            <CardContent className="p-5">
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-16 w-16">
                    <AvatarFallback className="bg-purple text-white text-lg">
                      {client.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg">
                      {client.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Última visita: {client.lastVisit}
                    </p>
                    <div className="flex items-center space-x-2 mt-2">
                      <Badge
                        className={`text-white ${
                          client.level === "Gold"
                            ? "bg-coral"
                            : client.level === "Silver"
                              ? "bg-purple"
                              : "bg-mint"
                        }`}
                      >
                        {client.level}
                      </Badge>
                      <span className="text-sm font-medium text-purple">
                        {client.points} pts
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-3">
                  <Button
                    onClick={() => viewClientDetail(client)}
                    className="flex-1 bg-purple hover:bg-purple-light text-white py-3 rounded-xl"
                  >
                    Ver Perfil
                  </Button>
                  <Button className="bg-mint hover:bg-mint-light text-white p-3 rounded-xl">
                    <MessageSquare size={20} />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </motion.div>
  );

  const ClientDetailScreen = () => (
    <motion.div
      className="min-h-screen bg-gray-soft pb-24"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="bg-gradient-to-r from-purple to-coral p-6 pt-12 text-white rounded-b-3xl">
        <div className="flex items-center space-x-4 mb-6">
          <button
            onClick={() => setCurrentScreen("clients")}
            className="text-white/80 hover:text-white p-2"
          >
            <ArrowLeft size={24} />
          </button>
          <img
            src={conlaceLogo}
            alt="ConLace"
            className="w-8 h-8"
          />
          <div>
            <h1 className="text-xl font-bold">
              {selectedClient?.name}
            </h1>
            <p className="opacity-90 text-sm">
              Perfil do Cliente
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Card className="bg-white/15 backdrop-blur border-0">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-white">
                {selectedClient?.points}
              </p>
              <p className="text-white/80 text-sm">Pontos</p>
            </CardContent>
          </Card>
          <Card className="bg-white/15 backdrop-blur border-0">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-white">
                {selectedClient?.level}
              </p>
              <p className="text-white/80 text-sm">Nível</p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Contact Info */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Informações de Contato</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-4 p-3 bg-beige rounded-xl">
                <Phone className="text-purple" size={24} />
                <span className="text-lg">
                  {selectedClient?.phone}
                </span>
              </div>
              <div className="flex items-center space-x-4 p-3 bg-beige rounded-xl">
                <Mail className="text-purple" size={24} />
                <span className="text-lg">maria@email.com</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Preferences */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Preferências</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 text-lg leading-relaxed">
              {selectedClient?.preferences}
            </p>
          </CardContent>
        </Card>

        {/* Service History */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Histórico de Serviços</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-beige rounded-2xl">
                <div>
                  <p className="font-medium text-lg">
                    Corte + Escova
                  </p>
                  <p className="text-sm text-gray-600">
                    15/08/2024
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-mint text-lg">
                    +50 pts
                  </p>
                  <div className="flex text-coral">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        fill="currentColor"
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center p-4 bg-beige rounded-2xl">
                <div>
                  <p className="font-medium text-lg">
                    Manicure
                  </p>
                  <p className="text-sm text-gray-600">
                    08/08/2024
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-mint text-lg">
                    +25 pts
                  </p>
                  <div className="flex text-coral">
                    {[...Array(4)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        fill="currentColor"
                      />
                    ))}
                    <Star size={16} />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="space-y-4">
          <Button className="w-full h-14 bg-mint hover:bg-mint-light text-white text-lg font-medium rounded-2xl">
            <MessageSquare size={20} className="mr-3" />
            Enviar Mensagem
          </Button>
          <Button className="w-full h-14 bg-coral hover:bg-coral-light text-white text-lg font-medium rounded-2xl">
            <Plus size={20} className="mr-3" />
            Adicionar Pontos Manualmente
          </Button>
        </div>
      </div>
    </motion.div>
  );

  const RewardsScreen = () => (
    <motion.div
      className="min-h-screen bg-gray-soft pb-24"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="bg-mint p-6 pt-12 text-white rounded-b-3xl">
        <div className="flex items-center space-x-4">
          <img
            src={conlaceLogo}
            alt="ConLace"
            className="w-8 h-8"
          />
          <div>
            <h1 className="text-2xl font-bold">
              Configurar Recompensas
            </h1>
            <p className="opacity-90">
              Gerencie as recompensas do seu salão
            </p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">
            Recompensas Ativas
          </h2>
          <Button className="bg-coral hover:bg-coral-light text-white px-4 py-2 rounded-xl">
            <Plus size={20} className="mr-2" />
            Nova
          </Button>
        </div>

        {mockRewards.map((reward) => (
          <Card
            key={reward.id}
            className={`border-l-4 shadow-lg ${reward.active ? "border-l-mint" : "border-l-gray-300"}`}
          >
            <CardContent className="p-5">
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-lg">
                    {reward.name}
                  </h3>
                  <p className="text-gray-600">
                    {reward.points} pontos necessários
                  </p>
                  <Badge
                    className={`mt-2 ${reward.active ? "bg-mint text-white" : "bg-gray-300 text-gray-600"}`}
                  >
                    {reward.active ? "Ativa" : "Inativa"}
                  </Badge>
                </div>
                <div className="flex space-x-3">
                  <Button className="flex-1 bg-purple hover:bg-purple-light text-white py-3 rounded-xl">
                    <Edit size={16} className="mr-2" />
                    Editar
                  </Button>
                  <Button className="bg-coral hover:bg-coral-light text-white p-3 rounded-xl">
                    <Trash2 size={16} />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Reward Settings */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Configurações de Pontuação</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Pontos por R$ gasto
                </label>
                <Input
                  type="number"
                  defaultValue="1"
                  className="w-full h-12 text-lg rounded-xl"
                />
                <p className="text-xs text-gray-500 mt-2">
                  Ex: 1 ponto a cada R$ 1,00 gasto
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Bônus por indicação
                </label>
                <Input
                  type="number"
                  defaultValue="50"
                  className="w-full h-12 text-lg rounded-xl"
                />
                <p className="text-xs text-gray-500 mt-2">
                  Pontos extras para quem indica novos clientes
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );

  const ReportsScreen = () => (
    <motion.div
      className="min-h-screen bg-gray-soft pb-24"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="bg-gradient-to-r from-coral to-purple p-6 pt-12 text-white rounded-b-3xl">
        <div className="flex items-center space-x-4">
          <img
            src={conlaceLogo}
            alt="ConLace"
            className="w-8 h-8"
          />
          <div>
            <h1 className="text-2xl font-bold">
              Relatórios e Insights
            </h1>
            <p className="opacity-90">
              Acompanhe o desempenho do seu programa
            </p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="shadow-lg">
            <CardContent className="p-5 text-center">
              <p className="text-3xl font-bold text-coral">
                28
              </p>
              <p className="text-gray-600">Clientes Ativos</p>
              <p className="text-sm text-mint">
                ↑ 15% este mês
              </p>
            </CardContent>
          </Card>
          <Card className="shadow-lg">
            <CardContent className="p-5 text-center">
              <p className="text-3xl font-bold text-purple">
                1,250
              </p>
              <p className="text-gray-600">Pontos Resgatados</p>
              <p className="text-sm text-mint">↑ 8% este mês</p>
            </CardContent>
          </Card>
        </div>

        {/* Engagement Chart */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Engajamento dos Clientes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">
                    Clientes Gold
                  </span>
                  <span className="text-sm font-bold">60%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div
                    className="bg-coral h-4 rounded-full"
                    style={{ width: "60%" }}
                  ></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">
                    Clientes Silver
                  </span>
                  <span className="text-sm font-bold">30%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div
                    className="bg-purple h-4 rounded-full"
                    style={{ width: "30%" }}
                  ></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">
                    Clientes Bronze
                  </span>
                  <span className="text-sm font-bold">10%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div
                    className="bg-mint h-4 rounded-full"
                    style={{ width: "10%" }}
                  ></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Popular Rewards */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Recompensas Mais Populares</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-4 bg-beige rounded-2xl">
                <span className="font-medium">
                  Desconto 20% Corte
                </span>
                <Badge className="bg-coral text-white">
                  15 resgates
                </Badge>
              </div>
              <div className="flex justify-between items-center p-4 bg-beige rounded-2xl">
                <span className="font-medium">
                  Escova Grátis
                </span>
                <Badge className="bg-purple text-white">
                  12 resgates
                </Badge>
              </div>
              <div className="flex justify-between items-center p-4 bg-beige rounded-2xl">
                <span className="font-medium">
                  Manicure Grátis
                </span>
                <Badge className="bg-mint text-white">
                  8 resgates
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Monthly Revenue Impact */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Impacto na Receita</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-4">
              <p className="text-4xl font-bold text-mint mb-3">
                +R$ 3.240
              </p>
              <p className="text-gray-600 text-lg">
                Receita adicional este mês
              </p>
              <p className="text-sm text-gray-500 mt-3 leading-relaxed">
                Clientes com programa de fidelidade gastam 25%
                mais em média
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );

  const PlannerScreen = () => (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-white via-purple/5 to-mint/5 pb-24"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header Elegante */}
      <div className="bg-gradient-to-r from-white via-beige/30 to-white p-6 pt-12 border-b border-gray-100">
        <div className="text-center mb-8">
          <motion.h1
            className="text-3xl font-bold text-gray-800 mb-3 tracking-tight"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Planner de Ações
          </motion.h1>
          <motion.p
            className="text-gray-600 text-lg"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Organize suas ações mês a mês
          </motion.p>
        </div>

        {/* Botão Fixo Destacado */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button
            onClick={() => openCampaignModal()}
            className="w-full bg-gradient-to-r from-purple via-coral to-mint text-white px-8 py-5 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 font-bold text-lg"
          >
            <motion.div
              className="flex items-center justify-center space-x-3"
              whileHover={{ scale: 1.05 }}
            >
              <Plus size={24} />
              <span>Nova Campanha</span>
              <Sparkles size={20} />
            </motion.div>
          </Button>
        </motion.div>
      </div>

      {/* Grade Anual 3x4 Premium */}
      <div className="p-6">
        <div className="grid grid-cols-3 gap-5">
          {months.map((month, index) => {
            const monthNumber = index + 1;
            const campaign = mockCampaigns[monthNumber];

            return (
              <motion.div
                key={monthNumber}
                initial={{ opacity: 0, scale: 0.7, y: 60 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{
                  delay: index * 0.12,
                  duration: 0.8,
                  type: "spring",
                  stiffness: 120,
                  damping: 15,
                }}
                onClick={() => openCampaignModal(monthNumber)}
                className={`relative p-6 rounded-3xl cursor-pointer transition-all duration-500 shadow-lg overflow-hidden ${
                  campaign
                    ? campaign.status === "active"
                      ? "bg-gradient-to-br from-pink-50 via-coral/10 to-white border-2 border-coral/30"
                      : campaign.status === "completed"
                        ? "bg-gradient-to-br from-emerald-50 via-mint/10 to-white border-2 border-mint/30"
                        : "bg-gradient-to-br from-violet-50 via-purple/10 to-white border-2 border-purple/30"
                    : "bg-gradient-to-br from-gray-50 via-white to-gray-50 border-2 border-gray-200 hover:border-purple/30"
                }`}
                whileHover={{
                  scale: 1.08,
                  y: -12,
                  rotateY: 5,
                  boxShadow:
                    "0 25px 50px -12px rgba(0, 0, 0, 0.2)",
                }}
                whileTap={{ scale: 0.95 }}
                style={{
                  transformStyle: "preserve-3d",
                }}
              >
                {/* Decorative Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute -top-4 -right-4 w-16 h-16 bg-gray-300 rounded-full" />
                  <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-gray-200 rounded-full" />
                </div>

                <div className="relative text-center space-y-4">
                  {/* Nome do Mês Destacado */}
                  <motion.h3
                    className="text-xl font-black text-gray-800 tracking-widest uppercase mb-6"
                    whileHover={{
                      scale: 1.05,
                      y: [-2, -4, -2],
                    }}
                    transition={{ duration: 0.3 }}
                    style={{
                      fontFamily:
                        "Inter, system-ui, sans-serif",
                      letterSpacing: "0.15em",
                    }}
                  >
                    {month.toUpperCase()}
                  </motion.h3>

                  {campaign ? (
                    <motion.div
                      className="space-y-3"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      {/* Título da Campanha */}
                      <p className="text-sm font-bold text-gray-800 leading-tight px-2">
                        {campaign.title}
                      </p>

                      {/* Datas */}
                      <p className="text-xs text-gray-600 bg-white/60 px-3 py-1 rounded-full">
                        {campaign.startDate}
                      </p>

                      {/* Resumo com até 3 linhas */}
                      <div className="text-xs text-gray-600 space-y-1">
                        {campaign.actions
                          .slice(0, 3)
                          .map((action, idx) => (
                            <div
                              key={idx}
                              className="flex items-center space-x-2"
                            >
                              <div
                                className={`w-2 h-2 rounded-full ${
                                  action.startsWith("✅")
                                    ? "bg-mint"
                                    : "bg-gray-300"
                                }`}
                              />
                              <span className="truncate">
                                {action
                                  .substring(2)
                                  .slice(0, 25)}
                                ...
                              </span>
                            </div>
                          ))}
                      </div>

                      {/* Status Badge com Brilho */}
                      <motion.div
                        className="flex justify-center"
                        whileHover={{ scale: 1.1 }}
                      >
                        <Badge
                          className={`text-xs px-4 py-2 rounded-full shadow-xl font-bold ${
                            campaign.status === "active"
                              ? "bg-gradient-to-r from-coral to-pink-500 text-white"
                              : campaign.status === "completed"
                                ? "bg-gradient-to-r from-mint to-emerald-500 text-white"
                                : "bg-gradient-to-r from-purple to-violet-500 text-white"
                          }`}
                        >
                          {campaign.status === "active"
                            ? "🔥 Ativo"
                            : campaign.status === "completed"
                              ? "✅ Concluído"
                              : "📋 Planejado"}
                        </Badge>
                      </motion.div>
                    </motion.div>
                  ) : (
                    <motion.div
                      className="space-y-4"
                      whileHover={{ scale: 1.05 }}
                    >
                      {/* Placeholder Suave */}
                      <p className="text-sm text-gray-400 font-medium">
                        + Adicionar campanha
                      </p>
                      <motion.div
                        className="w-12 h-12 mx-auto bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl flex items-center justify-center"
                        whileHover={{ rotate: 90 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Plus
                          size={18}
                          className="text-gray-500"
                        />
                      </motion.div>
                    </motion.div>
                  )}
                </div>

                {/* Efeito de Brilho Suave */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 pointer-events-none"
                  whileHover={{ opacity: 1 }}
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6 }}
                />
              </motion.div>
            );
          })}
        </div>

        {/* Resumo Anual Acolhedor */}
        <motion.div
          className="mt-10 bg-gradient-to-r from-beige via-white to-beige p-8 rounded-3xl shadow-xl border border-gray-100"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
        >
          <div className="text-center mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Resumo do Ano
            </h3>
            <p className="text-gray-600">
              Acompanhe o progresso das suas campanhas
            </p>
          </div>

          <div className="grid grid-cols-3 gap-6">
            <motion.div
              className="text-center p-4 bg-white rounded-2xl shadow-md"
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <p className="text-3xl font-bold bg-gradient-to-r from-coral to-pink-500 bg-clip-text text-transparent mb-2">
                1
              </p>
              <p className="text-sm text-gray-600 font-medium">
                Campanhas Ativas
              </p>
            </motion.div>

            <motion.div
              className="text-center p-4 bg-white rounded-2xl shadow-md"
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <p className="text-3xl font-bold bg-gradient-to-r from-mint to-emerald-500 bg-clip-text text-transparent mb-2">
                1
              </p>
              <p className="text-sm text-gray-600 font-medium">
                Concluídas
              </p>
            </motion.div>

            <motion.div
              className="text-center p-4 bg-white rounded-2xl shadow-md"
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <p className="text-3xl font-bold bg-gradient-to-r from-purple to-violet-500 bg-clip-text text-transparent mb-2">
                1
              </p>
              <p className="text-sm text-gray-600 font-medium">
                Planejadas
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );

  const CampaignDetailScreen = () => (
    <motion.div
      className="min-h-screen bg-gray-soft pb-24"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="bg-gradient-to-r from-purple to-coral p-6 pt-12 text-white rounded-b-3xl">
        <div className="flex items-center space-x-4 mb-6">
          <button
            onClick={() => setCurrentScreen("planner")}
            className="text-white/80 hover:text-white p-2"
          >
            <ArrowLeft size={24} />
          </button>
          <img
            src={conlaceLogo}
            alt="ConLace"
            className="w-8 h-8"
          />
          <div>
            <h1 className="text-xl font-bold">
              {months[selectedMonth - 1].toUpperCase()}
            </h1>
            <p className="opacity-90 text-sm">
              Campanha do mês
            </p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {mockCampaigns[selectedMonth] ? (
          <>
            {/* Campaign Info */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>
                    {mockCampaigns[selectedMonth].title}
                  </span>
                  <Button
                    size="sm"
                    className="bg-purple hover:bg-purple-light text-white"
                  >
                    <Edit size={16} className="mr-2" />
                    Editar
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        Data de Início
                      </p>
                      <p className="text-lg font-bold">
                        {mockCampaigns[selectedMonth].startDate}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        Data de Fim
                      </p>
                      <p className="text-lg font-bold">
                        {mockCampaigns[selectedMonth].endDate}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Actions Checklist */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Lista de Ações</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockCampaigns[selectedMonth].actions.map(
                    (action, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-3 p-3 bg-beige rounded-xl"
                      >
                        <div
                          className={`w-4 h-4 rounded-full ${
                            action.startsWith("✅")
                              ? "bg-mint"
                              : "bg-gray-300"
                          }`}
                        ></div>
                        <span
                          className={`flex-1 ${
                            action.startsWith("✅")
                              ? "line-through text-gray-500"
                              : "text-gray-800"
                          }`}
                        >
                          {action.substring(2)}
                        </span>
                      </div>
                    ),
                  )}
                  <Button className="w-full bg-mint hover:bg-mint-light text-white mt-4">
                    <Plus size={16} className="mr-2" />
                    Adicionar Nova Ação
                  </Button>
                </div>
              </CardContent>
            </Card>
          </>
        ) : (
          <Card className="shadow-lg">
            <CardContent className="p-8 text-center">
              <div
                className="text-4xl font-black text-gray-800 mb-6 tracking-widest uppercase"
                style={{ letterSpacing: "0.15em" }}
              >
                {months[selectedMonth - 1].toUpperCase()}
              </div>
              <h2 className="text-xl font-bold mb-4">
                Criar Nova Campanha
              </h2>
              <p className="text-gray-600 mb-6">
                Organize suas ações para{" "}
                {months[selectedMonth - 1]}
              </p>

              <div className="space-y-4">
                <Input
                  placeholder="Título da campanha"
                  className="w-full"
                />
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    placeholder="Data de início"
                    type="date"
                  />
                  <Input
                    placeholder="Data de fim"
                    type="date"
                  />
                </div>
                <div className="flex space-x-3">
                  <Button className="flex-1 bg-purple hover:bg-purple-light text-white">
                    Salvar
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setCurrentScreen("planner")}
                    className="border-gray-300 text-gray-600"
                  >
                    Cancelar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </motion.div>
  );



  // Modal de Campanha Premium
  const CampaignModal = () => (
    <AnimatePresence>
      {showCampaignModal && (
        <motion.div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setShowCampaignModal(false)}
        >
          <motion.div
            className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden"
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{
              type: "spring",
              damping: 25,
              stiffness: 300,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header do Modal */}
            <div className="bg-gradient-to-r from-purple via-coral to-mint p-6 text-white">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">
                  Criar/Editar Campanha
                </h2>
                <Button
                  onClick={() => setShowCampaignModal(false)}
                  className="p-2 bg-white/20 hover:bg-white/30 rounded-full"
                >
                  <X size={20} />
                </Button>
              </div>
            </div>

            {/* Formulário */}
            <div className="p-6 space-y-6">
              {/* Título da Campanha */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Título da Campanha
                </label>
                <Input
                  type="text"
                  placeholder="Ex: Promoção de Verão"
                  value={campaignForm.title}
                  onChange={(e) =>
                    setCampaignForm((prev) => ({
                      ...prev,
                      title: e.target.value,
                    }))
                  }
                  className="w-full h-12 rounded-xl border-gray-200 focus:border-purple focus:ring-purple"
                />
              </div>

              {/* Datas */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Data de Início
                  </label>
                  <Input
                    type="date"
                    value={campaignForm.startDate}
                    onChange={(e) =>
                      setCampaignForm((prev) => ({
                        ...prev,
                        startDate: e.target.value,
                      }))
                    }
                    className="w-full h-12 rounded-xl border-gray-200 focus:border-purple focus:ring-purple"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Data de Fim
                  </label>
                  <Input
                    type="date"
                    value={campaignForm.endDate}
                    onChange={(e) =>
                      setCampaignForm((prev) => ({
                        ...prev,
                        endDate: e.target.value,
                      }))
                    }
                    className="w-full h-12 rounded-xl border-gray-200 focus:border-purple focus:ring-purple"
                  />
                </div>
              </div>

              {/* Status da Campanha */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Status da Campanha
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    {
                      value: "planned",
                      label: "PLANEJADO",
                      color: "from-purple to-violet-500",
                    },
                    {
                      value: "active",
                      label: "ATIVO",
                      color: "from-coral to-pink-500",
                    },
                    {
                      value: "completed",
                      label: "CONCLUÍDO",
                      color: "from-mint to-emerald-500",
                    },
                  ].map((status) => (
                    <motion.button
                      key={status.value}
                      type="button"
                      onClick={() =>
                        setCampaignForm((prev) => ({
                          ...prev,
                          status: status.value,
                        }))
                      }
                      className={`p-3 rounded-xl border-2 transition-all duration-300 ${
                        campaignForm.status === status.value
                          ? `bg-gradient-to-r ${status.color} text-white border-transparent shadow-lg`
                          : "bg-gray-50 text-gray-600 border-gray-200 hover:border-gray-300"
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="text-xs font-bold tracking-wide">
                        {status.label}
                      </span>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Lista de Ações */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ações da Campanha
                </label>
                <div className="space-y-3">
                  {campaignForm.actions.map((action, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-2"
                    >
                      <Input
                        type="text"
                        placeholder={`Ação ${index + 1}: Ex: Criar posts para redes sociais`}
                        value={action}
                        onChange={(e) =>
                          updateAction(index, e.target.value)
                        }
                        className="flex-1 h-10 rounded-xl border-gray-200 focus:border-mint focus:ring-mint"
                      />
                      {campaignForm.actions.length > 1 && (
                        <Button
                          onClick={() => removeAction(index)}
                          className="p-2 bg-coral/10 hover:bg-coral/20 text-coral rounded-xl"
                        >
                          <Trash2 size={16} />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button
                    onClick={addAction}
                    className="w-full bg-mint/10 hover:bg-mint/20 text-mint border border-mint/30 py-2 rounded-xl"
                  >
                    <Plus size={16} className="mr-2" />
                    Adicionar Ação
                  </Button>
                </div>
              </div>
            </div>

            {/* Botões de Ação */}
            <div className="bg-gray-50 px-6 py-4 flex space-x-3">
              <Button
                onClick={() => setShowCampaignModal(false)}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-xl font-medium"
              >
                Cancelar
              </Button>
              <Button
                onClick={() => {
                  // Aqui salvaria a campanha
                  setShowCampaignModal(false);
                }}
                className="flex-1 bg-gradient-to-r from-purple to-coral text-white py-3 rounded-xl font-bold shadow-lg"
              >
                Salvar
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );



  const ProductManagementScreen = () => (
    <motion.div
      className="min-h-screen bg-gray-soft pb-24"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-coral to-purple p-6 pt-12 text-white rounded-b-3xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img
              src={conlaceLogo}
              alt="ConLace"
              className="w-8 h-8"
            />
            <div>
              <h1 className="text-2xl font-bold">
                Gestão de Produtos
              </h1>
              <p className="opacity-90">
                Adicione e edite seus produtos
              </p>
            </div>
          </div>
          <Button className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-xl">
            <Plus size={20} className="mr-2" />
            Novo Produto
          </Button>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4">
          <Card className="shadow-lg">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-coral">
                {mockProducts.length}
              </p>
              <p className="text-gray-600 text-sm">
                Total Produtos
              </p>
            </CardContent>
          </Card>
          <Card className="shadow-lg">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-mint">
                {mockProducts.filter((p) => p.stock > 0).length}
              </p>
              <p className="text-gray-600 text-sm">
                Em Estoque
              </p>
            </CardContent>
          </Card>
          <Card className="shadow-lg">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-purple">
                {
                  mockProducts.filter((p) => p.stock === 0)
                    .length
                }
              </p>
              <p className="text-gray-600 text-sm">Esgotados</p>
            </CardContent>
          </Card>
        </div>

        {/* Product List */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Meus Produtos</h2>
            <div className="flex space-x-2">
              <Button
                size="sm"
                variant="outline"
                className="border-gray-300"
              >
                <Filter size={16} className="mr-2" />
                Filtrar
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="border-gray-300"
              >
                <Search size={16} className="mr-2" />
                Buscar
              </Button>
            </div>
          </div>

          {mockProducts.map((product) => (
            <Card
              key={product.id}
              className="hover:shadow-md transition-shadow shadow-lg"
            >
              <CardContent className="p-5">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-100">
                    <ImageWithFallback
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-lg">
                          {product.brand}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {product.line} - {product.volume}
                        </p>
                        <p className="text-lg font-bold text-purple">
                          R$ {product.price.toFixed(2)}
                        </p>
                      </div>

                      <div className="text-right">
                        <Badge
                          className={`${
                            product.stock > 5
                              ? "bg-mint text-white"
                              : product.stock > 0
                                ? "bg-coral text-white"
                                : "bg-gray-300 text-gray-700"
                          }`}
                        >
                          {product.stock > 0
                            ? `${product.stock} unidades`
                            : "Esgotado"}
                        </Badge>
                        <p className="text-xs text-gray-500 mt-1">
                          {product.reviews} avaliações
                        </p>
                      </div>
                    </div>

                    <div className="flex space-x-3">
                      <Button
                        size="sm"
                        className="bg-purple hover:bg-purple-light text-white"
                      >
                        <Edit size={16} className="mr-2" />
                        Editar
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-mint text-mint hover:bg-mint hover:text-white"
                      >
                        Ajustar Estoque
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-coral text-coral hover:bg-coral hover:text-white"
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Low Stock Alert */}
        <Card className="border-l-4 border-l-coral shadow-lg">
          <CardHeader>
            <CardTitle className="text-coral">
              ⚠️ Produtos com Estoque Baixo
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockProducts
                .filter((p) => p.stock > 0 && p.stock < 3)
                .map((product) => (
                  <div
                    key={product.id}
                    className="flex justify-between items-center p-3 bg-coral/5 rounded-xl"
                  >
                    <div>
                      <p className="font-medium">
                        {product.fullName}
                      </p>
                      <p className="text-sm text-gray-600">
                        Apenas {product.stock} unidades
                        restantes
                      </p>
                    </div>
                    <Button
                      size="sm"
                      className="bg-coral hover:bg-coral-light text-white"
                    >
                      Repor Estoque
                    </Button>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );

  const OrdersScreen = () => (
    <motion.div
      className="min-h-screen bg-gray-soft pb-24"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-mint to-coral p-6 pt-12 text-white rounded-b-3xl">
        <div className="flex items-center space-x-4">
          <img
            src={conlaceLogo}
            alt="ConLace"
            className="w-8 h-8"
          />
          <div>
            <h1 className="text-2xl font-bold">
              Pedidos das Clientes
            </h1>
            <p className="opacity-90">
              Gerencie os pedidos de produtos
            </p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Order Stats */}
        <div className="grid grid-cols-3 gap-4">
          <Card className="shadow-lg">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-coral">
                {
                  mockOrders.filter(
                    (o) => o.status === "pending",
                  ).length
                }
              </p>
              <p className="text-gray-600 text-sm">Pendentes</p>
            </CardContent>
          </Card>
          <Card className="shadow-lg">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-mint">
                {
                  mockOrders.filter(
                    (o) => o.status === "confirmed",
                  ).length
                }
              </p>
              <p className="text-gray-600 text-sm">
                Confirmados
              </p>
            </CardContent>
          </Card>
          <Card className="shadow-lg">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-purple">
                R${" "}
                {mockOrders
                  .reduce((acc, order) => acc + order.total, 0)
                  .toFixed(2)}
              </p>
              <p className="text-gray-600 text-sm">
                Total Vendas
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold">
            Pedidos Recentes
          </h2>

          {mockOrders.map((order) => (
            <Card
              key={order.id}
              className="hover:shadow-md transition-shadow shadow-lg"
            >
              <CardContent className="p-5">
                <div className="space-y-4">
                  {/* Order Header */}
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-lg">
                        Pedido #{order.id}
                      </h3>
                      <p className="text-gray-600">
                        {order.customerName}
                      </p>
                      <p className="text-sm text-gray-500">
                        {order.customerPhone}
                      </p>
                    </div>
                    <div className="text-right">
                      <Badge
                        className={`${
                          order.status === "pending"
                            ? "bg-coral text-white"
                            : order.status === "confirmed"
                              ? "bg-mint text-white"
                              : "bg-purple text-white"
                        }`}
                      >
                        {order.status === "pending"
                          ? "Pendente"
                          : order.status === "confirmed"
                            ? "Confirmado"
                            : "Entregue"}
                      </Badge>
                      <p className="text-sm text-gray-500 mt-1">
                        {order.date} às {order.time}
                      </p>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="space-y-2">
                    {order.items.map((item, index) => {
                      const product = mockProducts.find(
                        (p) => p.id === item.productId,
                      );
                      return (
                        <div
                          key={index}
                          className="flex justify-between items-center p-3 bg-beige rounded-xl"
                        >
                          <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 rounded-lg overflow-hidden bg-white">
                              <ImageWithFallback
                                src={product?.image || ""}
                                alt={product?.name || ""}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <p className="font-medium">
                                {product?.fullName}
                              </p>
                              <p className="text-sm text-gray-600">
                                Qtd: {item.quantity}
                              </p>
                            </div>
                          </div>
                          <p className="font-bold text-purple">
                            R${" "}
                            {(
                              item.price * item.quantity
                            ).toFixed(2)}
                          </p>
                        </div>
                      );
                    })}
                  </div>

                  {/* Order Total */}
                  <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                    <p className="text-lg font-bold">Total:</p>
                    <p className="text-xl font-bold text-purple">
                      R$ {order.total.toFixed(2)}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-3">
                    {order.status === "pending" && (
                      <>
                        <Button className="flex-1 bg-mint hover:bg-mint-light text-white">
                          Confirmar Pedido
                        </Button>
                        <Button
                          variant="outline"
                          className="border-coral text-coral hover:bg-coral hover:text-white"
                        >
                          Rejeitar
                        </Button>
                      </>
                    )}
                    {order.status === "confirmed" && (
                      <Button className="flex-1 bg-purple hover:bg-purple-light text-white">
                        Marcar como Entregue
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      className="border-gray-300 text-gray-600 hover:bg-gray-100"
                    >
                      <MessageSquare
                        size={16}
                        className="mr-2"
                      />
                      Contatar Cliente
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </motion.div>
  );

  const AnalyticsScreen = () => (
    <motion.div
      className="min-h-screen bg-gray-soft pb-24"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-purple to-mint p-6 pt-12 text-white rounded-b-3xl">
        <div className="flex items-center space-x-4">
          <img
            src={conlaceLogo}
            alt="ConLace"
            className="w-8 h-8"
          />
          <div>
            <h1 className="text-2xl font-bold">
              Relatórios Completos
            </h1>
            <p className="opacity-90">
              Dashboard completo do seu salão
            </p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* 1. RELATÓRIO DE CLIENTES */}
        <Card className="shadow-lg border-l-4 border-l-coral">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="text-coral" size={24} />
              <span>Relatório de Clientes</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="text-center p-4 bg-coral/10 rounded-2xl">
                <p className="text-3xl font-bold text-coral">
                  28
                </p>
                <p className="text-gray-600">
                  Total Cadastrados
                </p>
                <p className="text-sm text-coral">
                  ↑ 4 novos este mês
                </p>
              </div>
              <div className="text-center p-4 bg-mint/10 rounded-2xl">
                <p className="text-3xl font-bold text-mint">
                  24
                </p>
                <p className="text-gray-600">Clientes Ativos</p>
                <p className="text-sm text-mint">
                  86% de atividade
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-bold text-gray-800">
                Novos Cadastros - Janeiro 2025
              </h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center p-3 bg-beige rounded-xl">
                  <span>Semana 1</span>
                  <Badge className="bg-coral text-white">
                    2 novos
                  </Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-beige rounded-xl">
                  <span>Semana 2</span>
                  <Badge className="bg-coral text-white">
                    1 novo
                  </Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-beige rounded-xl">
                  <span>Semana 3</span>
                  <Badge className="bg-coral text-white">
                    1 novo
                  </Badge>
                </div>
              </div>

              <div className="mt-4">
                <h5 className="font-medium text-gray-700 mb-2">
                  Filtros por Frequência
                </h5>
                <div className="grid grid-cols-3 gap-3">
                  <div className="text-center p-3 bg-mint/10 rounded-xl">
                    <p className="text-xl font-bold text-mint">
                      24
                    </p>
                    <p className="text-xs text-gray-600">
                      Ativos
                    </p>
                  </div>
                  <div className="text-center p-3 bg-gray-200 rounded-xl">
                    <p className="text-xl font-bold text-gray-600">
                      4
                    </p>
                    <p className="text-xs text-gray-600">
                      Inativos
                    </p>
                  </div>
                  <div className="text-center p-3 bg-purple/10 rounded-xl">
                    <p className="text-xl font-bold text-purple">
                      8
                    </p>
                    <p className="text-xs text-gray-600">
                      VIPs
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 2. RELATÓRIO DE FIDELIDADE */}
        <Card className="shadow-lg border-l-4 border-l-purple">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Trophy className="text-purple" size={24} />
              <span>Relatório de Fidelidade</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="text-center p-4 bg-purple/10 rounded-2xl">
                <p className="text-3xl font-bold text-purple">
                  12.450
                </p>
                <p className="text-gray-600">
                  Pontos Acumulados
                </p>
                <p className="text-sm text-purple">
                  Total no sistema
                </p>
              </div>
              <div className="text-center p-4 bg-coral/10 rounded-2xl">
                <p className="text-3xl font-bold text-coral">
                  3.280
                </p>
                <p className="text-gray-600">
                  Pontos Resgatados
                </p>
                <p className="text-sm text-coral">Este mês</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-mint/10 rounded-2xl text-center">
                <p className="text-2xl font-bold text-mint">
                  445
                </p>
                <p className="text-gray-600">
                  Saldo Médio por Cliente
                </p>
                <p className="text-sm text-gray-500">
                  Pontos disponíveis
                </p>
              </div>

              <div>
                <h4 className="font-bold text-gray-800 mb-3">
                  Top 5 Clientes Mais Fiéis
                </h4>
                <div className="space-y-2">
                  {[
                    {
                      name: "Maria Silva",
                      points: 850,
                      level: "Gold",
                      visits: 12,
                    },
                    {
                      name: "Ana Costa",
                      points: 720,
                      level: "Gold",
                      visits: 10,
                    },
                    {
                      name: "Carla Mendes",
                      points: 580,
                      level: "Silver",
                      visits: 8,
                    },
                    {
                      name: "Lucia Santos",
                      points: 420,
                      level: "Silver",
                      visits: 7,
                    },
                    {
                      name: "Paula Lima",
                      points: 350,
                      level: "Bronze",
                      visits: 6,
                    },
                  ].map((client, index) => (
                    <div
                      key={client.name}
                      className="flex items-center justify-between p-3 bg-beige rounded-xl"
                    >
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                            index === 0
                              ? "bg-yellow-500"
                              : index === 1
                                ? "bg-gray-400"
                                : index === 2
                                  ? "bg-amber-600"
                                  : "bg-gray-300"
                          }`}
                        >
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-medium">
                            {client.name}
                          </p>
                          <p className="text-sm text-gray-600">
                            {client.visits} visitas
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-purple">
                          {client.points} pts
                        </p>
                        <Badge
                          className={`text-xs ${
                            client.level === "Gold"
                              ? "bg-coral text-white"
                              : client.level === "Silver"
                                ? "bg-purple text-white"
                                : "bg-mint text-white"
                          }`}
                        >
                          {client.level}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 3. RELATÓRIO DE PRODUTOS */}
        <Card className="shadow-lg border-l-4 border-l-mint">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Package className="text-mint" size={24} />
              <span>Relatório de Produtos</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center p-4 bg-mint/10 rounded-2xl">
                <p className="text-2xl font-bold text-mint">
                  {
                    mockProducts.filter((p) => p.stock > 0)
                      .length
                  }
                </p>
                <p className="text-gray-600 text-sm">
                  Em Estoque
                </p>
              </div>
              <div className="text-center p-4 bg-coral/10 rounded-2xl">
                <p className="text-2xl font-bold text-coral">
                  {
                    mockProducts.filter((p) => p.stock === 0)
                      .length
                  }
                </p>
                <p className="text-gray-600 text-sm">
                  Esgotados
                </p>
              </div>
              <div className="text-center p-4 bg-purple/10 rounded-2xl">
                <p className="text-2xl font-bold text-purple">
                  {
                    mockProducts.filter(
                      (p) => p.stock < 3 && p.stock > 0,
                    ).length
                  }
                </p>
                <p className="text-gray-600 text-sm">
                  Estoque Baixo
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="font-bold text-gray-800 mb-3">
                  Giro de Produtos (Últimos 30 dias)
                </h4>
                <div className="space-y-3">
                  {mockProductAnalytics.map((item, index) => {
                    const product = mockProducts.find(
                      (p) => p.id === item.productId,
                    );
                    return (
                      <div
                        key={item.productId}
                        className="flex items-center justify-between p-3 bg-beige rounded-xl"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 rounded-lg overflow-hidden bg-white">
                            <ImageWithFallback
                              src={product?.image || ""}
                              alt={product?.name || ""}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <p className="font-medium">
                              {product?.brand}
                            </p>
                            <p className="text-sm text-gray-600">
                              {product?.line}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-mint">
                            {item.sales}
                          </p>
                          <p className="text-xs text-gray-600">
                            vendas
                          </p>
                          <Badge
                            className={`text-xs mt-1 ${
                              product?.stock === 0
                                ? "bg-red-500 text-white"
                                : product?.stock &&
                                    product.stock < 3
                                  ? "bg-coral text-white"
                                  : "bg-mint text-white"
                            }`}
                          >
                            {product?.stock === 0
                              ? "Esgotado"
                              : product?.stock &&
                                  product.stock < 3
                                ? "Baixo"
                                : "OK"}
                          </Badge>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div>
                <h4 className="font-bold text-gray-800 mb-3">
                  Produtos Mais Populares
                </h4>
                <div className="space-y-2">
                  {mockProductAnalytics
                    .slice(0, 3)
                    .map((item, index) => {
                      const product = mockProducts.find(
                        (p) => p.id === item.productId,
                      );
                      return (
                        <div
                          key={item.productId}
                          className="flex items-center space-x-3 p-3 bg-purple/5 rounded-xl"
                        >
                          <div
                            className={`w-6 h-6 rounded-full flex items-center justify-center text-white font-bold text-xs ${
                              index === 0
                                ? "bg-yellow-500"
                                : index === 1
                                  ? "bg-gray-400"
                                  : "bg-amber-600"
                            }`}
                          >
                            {index + 1}
                          </div>
                          <div className="flex-1">
                            <p className="font-medium">
                              {product?.fullName}
                            </p>
                            <p className="text-sm text-gray-600">
                              {product?.reviews} avaliações •{" "}
                              {product?.rating}⭐
                            </p>
                          </div>
                          <Badge className="bg-purple text-white">
                            {item.trend}
                          </Badge>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 4. RELATÓRIO DE RESGATES */}
        <Card className="shadow-lg border-l-4 border-l-coral">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Gift className="text-coral" size={24} />
              <span>Relatório de Resgates</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="text-center p-4 bg-coral/10 rounded-2xl">
                <p className="text-3xl font-bold text-coral">
                  45
                </p>
                <p className="text-gray-600">
                  Resgates Realizados
                </p>
                <p className="text-sm text-coral">Este mês</p>
              </div>
              <div className="text-center p-4 bg-purple/10 rounded-2xl">
                <p className="text-3xl font-bold text-purple">
                  3.280
                </p>
                <p className="text-gray-600">
                  Pontos Convertidos
                </p>
                <p className="text-sm text-purple">
                  Total em janeiro
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="font-bold text-gray-800 mb-3">
                  Histórico de Resgates Recentes
                </h4>
                <div className="space-y-3">
                  {[
                    {
                      client: "Maria Silva",
                      reward: "Desconto 20% Corte",
                      points: 300,
                      date: "15/01/2025",
                      status: "usado",
                    },
                    {
                      client: "Ana Costa",
                      reward: "Escova Grátis",
                      points: 200,
                      date: "14/01/2025",
                      status: "pendente",
                    },
                    {
                      client: "Carla Mendes",
                      reward: "Manicure Completa",
                      points: 250,
                      date: "13/01/2025",
                      status: "usado",
                    },
                    {
                      client: "Lucia Santos",
                      reward: "Tratamento Premium",
                      points: 800,
                      date: "12/01/2025",
                      status: "usado",
                    },
                  ].map((resgate, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-beige rounded-xl"
                    >
                      <div>
                        <p className="font-medium">
                          {resgate.client}
                        </p>
                        <p className="text-sm text-gray-600">
                          {resgate.reward}
                        </p>
                        <p className="text-xs text-gray-500">
                          {resgate.date}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-coral">
                          -{resgate.points} pts
                        </p>
                        <Badge
                          className={`text-xs ${
                            resgate.status === "usado"
                              ? "bg-mint text-white"
                              : "bg-coral text-white"
                          }`}
                        >
                          {resgate.status === "usado"
                            ? "Usado"
                            : "Pendente"}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-bold text-gray-800 mb-3">
                  Produtos/Serviços Mais Resgatados
                </h4>
                <div className="space-y-2">
                  {[
                    {
                      reward: "Desconto 20% Corte",
                      count: 18,
                      points: 300,
                    },
                    {
                      reward: "Escova Grátis",
                      count: 12,
                      points: 200,
                    },
                    {
                      reward: "Manicure Completa",
                      count: 8,
                      points: 250,
                    },
                    {
                      reward: "Hidratação Premium",
                      count: 7,
                      points: 400,
                    },
                  ].map((item, index) => (
                    <div
                      key={item.reward}
                      className="flex items-center justify-between p-3 bg-coral/5 rounded-xl"
                    >
                      <div>
                        <p className="font-medium">
                          {item.reward}
                        </p>
                        <p className="text-sm text-gray-600">
                          {item.points} pontos
                        </p>
                      </div>
                      <Badge className="bg-coral text-white">
                        {item.count} resgates
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 5. RELATÓRIO FINANCEIRO */}
        <Card className="shadow-lg border-l-4 border-l-purple">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="text-purple" size={24} />
              <span>Relatório Financeiro</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-purple/10 rounded-2xl">
                  <p className="text-3xl font-bold text-purple">
                    R$ 1.640
                  </p>
                  <p className="text-gray-600">
                    Valor Monetário
                  </p>
                  <p className="text-sm text-purple">
                    Pontos resgatados
                  </p>
                </div>
                <div className="text-center p-4 bg-coral/10 rounded-2xl">
                  <p className="text-3xl font-bold text-coral">
                    R$ 890
                  </p>
                  <p className="text-gray-600">
                    Custo dos Produtos
                  </p>
                  <p className="text-sm text-coral">
                    Dados em troca
                  </p>
                </div>
              </div>

              <div className="p-4 bg-mint/10 rounded-2xl">
                <h4 className="font-bold text-mint mb-3">
                  Comparação Pontos Acumulados x Resgatados
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">
                      Pontos Acumulados (mês)
                    </span>
                    <span className="font-bold text-mint">
                      4.850 pts
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">
                      Pontos Resgatados (mês)
                    </span>
                    <span className="font-bold text-coral">
                      3.280 pts
                    </span>
                  </div>
                  <div className="border-t border-gray-200 pt-2">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-gray-800">
                        Saldo Líquido
                      </span>
                      <span className="font-bold text-purple">
                        +1.570 pts
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      Taxa de resgate: 67.6%
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-beige rounded-2xl">
                <h4 className="font-bold text-gray-800 mb-3">
                  💰 Insights Financeiros
                </h4>
                <div className="space-y-2">
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-mint rounded-full mt-2"></div>
                    <p className="text-sm text-gray-700">
                      <strong>ROI Positivo:</strong> Cada R$
                      1,00 investido em recompensas gera R$ 1,84
                      em receita adicional
                    </p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-coral rounded-full mt-2"></div>
                    <p className="text-sm text-gray-700">
                      <strong>Fidelização:</strong> Clientes com
                      programa gastam 25% mais por visita
                    </p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-purple rounded-full mt-2"></div>
                    <p className="text-sm text-gray-700">
                      <strong>Oportunidade:</strong> 32% dos
                      pontos ainda não foram resgatados
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );

  const SalonSocialScreen = () => (
    <motion.div 
      className="min-h-screen bg-gray-soft pb-24"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="bg-white p-4 pt-12 border-b border-gray-200 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img 
              src={conlaceLogo} 
              alt="ConLace" 
              className="w-8 h-8"
            />
            <div>
              <h1 className="text-xl font-bold text-black">Feed Social</h1>
              <p className="text-sm text-gray-600">Interaja com suas clientes</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <TrendingUp size={22} className="text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Create Post Section */}
      <div className="p-4 bg-white border-b border-gray-200">
        <div className="flex items-start space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple to-coral rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-sm">BV</span>
          </div>
          <div className="flex-1">
            <textarea
              placeholder="Compartilhe dicas, promoções ou novidades com suas clientes..."
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              className="w-full border-0 resize-none focus:ring-0 p-0 placeholder-gray-500 text-gray-800"
              rows={3}
            />
            <div className="flex justify-between items-center mt-3">
              <div className="flex space-x-2">
                <Button size="sm" variant="outline" className="border-purple text-purple hover:bg-purple hover:text-white">
                  <Camera size={16} className="mr-1" />
                  Foto
                </Button>
                <Button size="sm" variant="outline" className="border-coral text-coral hover:bg-coral hover:text-white">
                  <Gift size={16} className="mr-1" />
                  Promoção
                </Button>
              </div>
              <Button 
                size="sm" 
                className="bg-coral hover:bg-coral-light text-white"
                disabled={!newPost.trim()}
              >
                <Send size={16} className="mr-1" />
                Publicar
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Feed */}
      <div className="space-y-2">
        {mockSocialPosts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            <div className="bg-white mx-4 my-2 rounded-2xl shadow-sm overflow-hidden">
              {/* Post Header */}
              <div className="flex items-center justify-between p-4 pb-3">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    post.user.isOfficial 
                      ? 'bg-gradient-to-br from-purple to-coral' 
                      : 'bg-gradient-to-br from-mint to-purple'
                  }`}>
                    <span className="text-white font-bold text-sm">{post.user.avatar}</span>
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <p className="font-bold text-sm">{post.user.name}</p>
                      {post.user.isOfficial ? (
                        <Badge className="bg-purple text-white text-xs">Salão</Badge>
                      ) : (
                        <Badge className={`text-xs ${
                          post.user.level === 'Gold' ? 'bg-coral text-white' : 
                          post.user.level === 'Silver' ? 'bg-purple text-white' : 'bg-mint text-white'
                        }`}>
                          {post.user.level}
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-gray-500">{post.time} {post.salon && `• ${post.salon}`}</p>
                  </div>
                </div>
                <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <MoreHorizontal size={16} className="text-gray-600" />
                </button>
              </div>

              {/* Post Content */}
              <div className="px-4 pb-3">
                <p className="text-gray-800 leading-relaxed mb-3">{post.content}</p>
                
                {post.image && (
                  <div className="mb-3 rounded-xl overflow-hidden">
                    <ImageWithFallback 
                      src={post.image} 
                      alt="Post" 
                      className="w-full h-64 object-cover"
                    />
                  </div>
                )}

                {post.isFlash && (
                  <div className="mb-3 p-3 bg-gradient-to-r from-coral/10 to-purple/10 rounded-xl border border-coral/20">
                    <p className="text-coral font-bold text-sm">⚡ PROMOÇÃO RELÂMPAGO - Restam 2h!</p>
                  </div>
                )}
              </div>

              {/* Post Actions */}
              <div className="px-4 pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <motion.button
                      onClick={() => toggleLike(post.id)}
                      className="flex items-center space-x-1"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Heart 
                        size={20} 
                        className={likedPosts.has(post.id) ? 'text-coral fill-coral' : 'text-gray-600'} 
                        fill={likedPosts.has(post.id) ? 'currentColor' : 'none'}
                      />
                      <span className="text-sm font-medium">
                        {post.likes + (likedPosts.has(post.id) ? 1 : 0)}
                      </span>
                    </motion.button>
                    <motion.button
                      className="flex items-center space-x-1"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <MessageCircle size={20} className="text-gray-600" />
                      <span className="text-sm font-medium">{post.comments}</span>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Share2 size={20} className="text-gray-600" />
                    </motion.button>
                  </div>
                  <motion.button
                    onClick={() => toggleSave(post.id)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Bookmark 
                      size={20} 
                      className={savedPosts.has(post.id) ? 'text-coral fill-coral' : 'text-gray-600'} 
                      fill={savedPosts.has(post.id) ? 'currentColor' : 'none'}
                    />
                  </motion.button>
                </div>

                {/* Quick Reply for Business */}
                {!post.user.isOfficial && (
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-gradient-to-br from-purple to-coral rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-xs">BV</span>
                      </div>
                      <input
                        placeholder="Responder como Bella Vista Salão..."
                        className="flex-1 text-sm border-0 focus:ring-0 p-2 bg-gray-50 rounded-full"
                      />
                      <Button size="sm" className="bg-purple hover:bg-purple-light text-white rounded-full px-3">
                        <Send size={14} />
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Engagement Stats Card */}
      <div className="p-4">
        <Card className="shadow-lg bg-gradient-to-r from-beige to-white">
          <CardContent className="p-4">
            <h3 className="font-bold text-gray-800 mb-3 text-center">📊 Engajamento Hoje</h3>
            <div className="grid grid-cols-3 gap-3">
              <div className="text-center">
                <p className="text-2xl font-bold text-coral">24</p>
                <p className="text-xs text-gray-600">Curtidas</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-purple">12</p>
                <p className="text-xs text-gray-600">Comentários</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-mint">8</p>
                <p className="text-xs text-gray-600">Compartilhamentos</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Load More */}
      <div className="p-4">
        <motion.button
          className="w-full py-4 bg-gradient-to-r from-coral/10 to-purple/10 rounded-2xl text-gray-600 font-medium"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Ver mais posts...
        </motion.button>
      </div>
    </motion.div>
  );

  const LayoutConfigScreen = () => (
    <motion.div
      className="min-h-screen bg-gray-soft pb-24"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-purple to-coral p-6 pt-12 text-white rounded-b-3xl">
        <div className="flex items-center space-x-4">
          <img
            src={conlaceLogo}
            alt="ConLace"
            className="w-8 h-8"
          />
          <div>
            <h1 className="text-2xl font-bold">
              Personalização do Layout
            </h1>
            <p className="opacity-90">
              Escolha a cor principal do seu salão
            </p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <p className="text-gray-600 text-center text-lg">
          Escolha a cor principal do seu salão para personalizar
          o app
        </p>

        {/* Color Palette */}
        <div className="grid grid-cols-2 gap-6">
          {colorPalette.map((colorOption) => (
            <motion.div
              key={colorOption.name}
              onClick={() =>
                setSelectedColor(colorOption.color)
              }
              className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 ${
                selectedColor === colorOption.color
                  ? "ring-4 ring-purple ring-offset-2 scale-105"
                  : "hover:scale-102"
              }`}
              style={{ backgroundColor: colorOption.color }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="text-center">
                <div
                  className="w-16 h-16 rounded-full mx-auto mb-3 border-4 border-white/50 shadow-lg"
                  style={{
                    backgroundColor: colorOption.preview,
                  }}
                ></div>
                <h3 className="font-bold text-gray-800">
                  {colorOption.name}
                </h3>
                {selectedColor === colorOption.color && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="mt-2"
                  >
                    <div className="w-6 h-6 bg-purple rounded-full mx-auto flex items-center justify-center">
                      <div className="w-3 h-3 bg-white rounded-full"></div>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Preview */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Pré-visualização</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div
                className="p-4 rounded-xl"
                style={{
                  backgroundColor: selectedColor + "20",
                }}
              >
                <Button
                  className="text-white font-bold"
                  style={{ backgroundColor: selectedColor }}
                >
                  Botão de Exemplo
                </Button>
              </div>
              <div
                className="p-4 bg-white rounded-xl border-l-4"
                style={{ borderColor: selectedColor }}
              >
                <h4
                  className="font-bold"
                  style={{ color: selectedColor }}
                >
                  Header de Exemplo
                </h4>
                <p className="text-gray-600">
                  Assim ficará o visual do seu app
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="space-y-4">
          <Button className="w-full h-14 bg-purple hover:bg-purple-light text-white text-lg font-bold rounded-2xl">
            Confirmar Escolha
          </Button>
          <Button
            variant="outline"
            className="w-full h-14 border-gray-300 text-gray-600 text-lg font-medium rounded-2xl"
          >
            Voltar
          </Button>
        </div>
      </div>
    </motion.div>
  );

  if (!isLoggedIn) {
    return <LoginScreen />;
  }

  return (
    <div className="relative">
      {currentScreen === "dashboard" && <DashboardScreen />}
      {currentScreen === "clients" && <ClientsScreen />}
      {currentScreen === "client-detail" && (
        <ClientDetailScreen />
      )}
      {currentScreen === "rewards" && <RewardsScreen />}
      {currentScreen === "reports" && <ReportsScreen />}
      {currentScreen === "planner" && <PlannerScreen />}
      {currentScreen === "campaign-detail" && (
        <CampaignDetailScreen />
      )}
      {currentScreen === "social" && <SalonSocialScreen />}
      {currentScreen === "product-management" && (
        <ProductManagementScreen />
      )}
      {currentScreen === "orders" && <OrdersScreen />}
      {currentScreen === "analytics" && <AnalyticsScreen />}
      {currentScreen === "layout-config" && (
        <LayoutConfigScreen />
      )}
      <BottomNav />
      <CampaignModal />
    </div>
  );
}