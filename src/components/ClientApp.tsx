'use client'

import { useState } from 'react'
import { motion } from 'motion/react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Progress } from './ui/progress'
import { Textarea } from './ui/textarea'
import { Avatar, AvatarFallback } from './ui/avatar'
import { Calendar, Gift, History, Bell, MessageCircle, Star, Clock, ArrowLeft, User, Phone, Mail, Home, Heart, Share2, Play, Bookmark, MoreHorizontal, TrendingUp, Sparkles, Users, MessageSquareText, Bot, Trophy, Zap, MapPin, Camera, Send, ThumbsUp, BarChart3, Crown, Award, Flame, ShoppingCart } from 'lucide-react'
import { ImageWithFallback } from './figma/ImageWithFallback'
import conlaceLogo from 'figma:asset/8305e79e0ee519de65fc150d46efbeb4caf7abb2.png'

type ClientScreen = 'login' | 'dashboard' | 'booking' | 'notifications' | 'history' | 'social' | 'community' | 'salon' | 'chat' | 'rewards' | 'shop' | 'product-detail'

interface ClientAppProps {
  onBack: () => void
}

export function ClientApp({ onBack }: ClientAppProps) {
  const [currentScreen, setCurrentScreen] = useState<ClientScreen>('login')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set())
  const [savedPosts, setSavedPosts] = useState<Set<number>>(new Set())
  const [newPost, setNewPost] = useState('')
  const [chatMessage, setChatMessage] = useState('')
  const [pollVotes, setPollVotes] = useState<Record<number, number>>({})
  const [cartItems, setCartItems] = useState<Set<number>>(new Set())
  const [favoriteProducts, setFavoriteProducts] = useState<Set<number>>(new Set())
  const [selectedProduct, setSelectedProduct] = useState<any>(null)

  const mockUser = {
    name: 'Maria Silva',
    points: 450,
    nextReward: 500,
    level: 'Gold',
    totalPoints: 2340,
    referrals: 5,
    engagementPoints: 156
  }

  const mockRewards = [
    { id: 1, name: 'Desconto 20% Corte', points: 300, available: true, category: 'Corte' },
    { id: 2, name: 'Escova Grátis', points: 200, available: true, category: 'Penteado' },
    { id: 3, name: 'Tratamento Premium', points: 800, available: false, category: 'Tratamento' },
    { id: 4, name: 'Manicure Completa', points: 250, available: true, category: 'Unhas' },
    { id: 5, name: 'Day Spa', points: 1200, available: false, category: 'Relaxamento' }
  ]

  const mockPromotions = [
    { id: 1, title: 'Oferta Especial', description: '30% off em tratamentos de hidratação', expires: '2 dias' },
    { id: 2, title: 'Combo Noiva', description: 'Pacote completo para seu grande dia', expires: '5 dias' }
  ]

  const mockHistory = [
    { date: '15/08/2024', service: 'Corte + Escova', points: '+50', status: 'completed' },
    { date: '08/08/2024', service: 'Manicure', points: '+25', status: 'completed' },
    { date: '01/08/2024', service: 'Recompensa Resgatada', points: '-200', status: 'redeemed' }
  ]

  const mockPosts = [
    {
      id: 1,
      type: 'tip',
      user: { name: 'Bella Vista Salão', avatar: 'BV', level: 'Verified', isOfficial: true },
      content: '💡 DICA DA SEMANA: Para cabelos oleosos, use shampoo seco nas raízes entre as lavagens. Ajuda a absorver a oleosidade e dá volume! ✨',
      likes: 89,
      comments: 12,
      time: '1h',
      relevanceScore: 95,
      tags: ['CabeloOleoso', 'DicaProfissional']
    },
    {
      id: 2,
      type: 'image',
      user: { name: 'Ana Costa', avatar: 'AC', level: 'Gold' },
      image: 'https://images.unsplash.com/photo-1712641966879-63f3bc1a47e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWF1dHklMjBzYWxvbiUyMGhhaXIlMjBzdHlsaW5nfGVufDF8fHx8MTc1NjIxMjEwN3ww&ixlib=rb-4.1.0&q=80&w=1080',
      caption: 'Novo visual! 😍 Amei o trabalho da @bellavista_salao ✨ #newlook #transformation',
      likes: 42,
      comments: 8,
      time: '2h',
      salon: 'Bella Vista Salão',
      relevanceScore: 88
    },
    {
      id: 3,
      type: 'video',
      user: { name: 'Carla Mendes', avatar: 'CM', level: 'Silver' },
      thumbnail: 'https://images.unsplash.com/photo-1737214475365-e4f06281dcf3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW5pY3VyZSUyMG5haWwlMjBhcnR8ZW58MXx8fHwxNzU2MjU3NTgwfDA&ixlib=rb-4.1.0&q=80&w=1080',
      caption: 'Tutorial: Nail Art em casa! 💅 Dicas que aprendi no salão',
      likes: 127,
      comments: 23,
      time: '4h',
      duration: '2:15',
      salon: 'Bella Vista Salão',
      relevanceScore: 82
    },
    {
      id: 4,
      type: 'tip',
      user: { name: 'Dra. Sandra - Tricologista', avatar: 'DS', level: 'Expert', isOfficial: true },
      content: '🌿 CUIDADO NATURAL: Óleo de coco aplicado nas pontas antes de dormir ajuda a reparar cabelos ressecados. Lave normalmente pela manhã!',
      likes: 156,
      comments: 31,
      time: '6h',
      relevanceScore: 91,
      tags: ['CabelesecoTramento', 'Natural']
    },
    {
      id: 5,
      type: 'promotion',
      title: 'Flash Sale! ⚡',
      description: 'Próximas 2 horas: 40% OFF em todos os tratamentos capilares!',
      image: 'https://images.unsplash.com/photo-1653241625670-3a1e643464ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYWlyJTIwY29sb3IlMjB0cmFuc2Zvcm1hdGlvbnxlbnwxfHx8fDE3NTYyNTc1ODB8MA&ixlib=rb-4.1.0&q=80&w=1080',
      salon: 'Bella Vista Salão',
      validUntil: 'Válido por 2h',
      relevanceScore: 99,
      isFlash: true
    }
  ].sort((a, b) => b.relevanceScore - a.relevanceScore)

  const mockCommunityPosts = [
    {
      id: 1,
      type: 'text',
      user: { name: 'Juliana Lima', avatar: 'JL', level: 'Silver' },
      content: 'Meninas, alguém tem dica de como fazer o cabelo crescer mais rápido? Tentei de tudo! 😭',
      replies: 8,
      time: '30min',
      likes: 12
    },
    {
      id: 2,
      type: 'poll',
      user: { name: 'Patricia Oliveira', avatar: 'PO', level: 'Gold' },
      content: 'Qual cor vocês acham que fica melhor em mim?',
      poll: {
        options: [
          { id: 1, text: 'Loiro mel', votes: 23 },
          { id: 2, text: 'Ruivo acobreado', votes: 18 },
          { id: 3, text: 'Castanho chocolate', votes: 31 }
        ],
        totalVotes: 72
      },
      replies: 15,
      time: '1h',
      likes: 24
    },
    {
      id: 3,
      type: 'photo',
      user: { name: 'Amanda Santos', avatar: 'AS', level: 'Bronze' },
      content: 'Resultado da hidratação caseira com abacate! Recomendo 🥑',
      image: 'https://images.unsplash.com/photo-1647004693012-1bada1401b31?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWF1dHklMjB0aXBzJTIwc2tpbmNhcmUlMjByb3V0aW5lfGVufDF8fHx8MTc1NjI1OTkzM3ww&ixlib=rb-4.1.0&q=80&w=1080',
      replies: 6,
      time: '2h',
      likes: 18
    }
  ]

  const mockSalonInfo = {
    name: 'Bella Vista Salão',
    description: 'Há 15 anos cuidando da sua beleza com carinho e profissionalismo. Especialistas em cortes, coloração e tratamentos.',
    image: 'https://images.unsplash.com/photo-1626383137804-ff908d2753a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWxvbiUyMGludGVyaW9yJTIwYmVhdXR5fGVufDF8fHx8MTc1NjI1OTkzNHww&ixlib=rb-4.1.0&q=80&w=1080',
    address: 'Rua das Flores, 123 - Centro',
    phone: '(11) 9999-9999',
    rating: 4.8,
    services: [
      { name: 'Corte Feminino', price: 'R$ 45', duration: '45min' },
      { name: 'Coloração', price: 'R$ 120', duration: '2h' },
      { name: 'Hidratação', price: 'R$ 35', duration: '30min' },
      { name: 'Manicure', price: 'R$ 25', duration: '45min' },
      { name: 'Pedicure', price: 'R$ 30', duration: '50min' }
    ]
  }

  const mockChatHistory = [
    { id: 1, sender: 'bot', message: 'Olá! Como posso ajudá-la hoje?', time: '14:30', isBot: true },
    { id: 2, sender: 'user', message: 'Queria saber sobre horários disponíveis', time: '14:31', isBot: false },
    { id: 3, sender: 'bot', message: 'Claro! Para qual serviço você gostaria de agendar?', time: '14:31', isBot: true },
    { id: 4, sender: 'human', message: 'Oi Maria! Vi que você quer agendar. Tenho horário amanhã às 14h para corte. Pode ser?', time: '14:35', isBot: false, isHuman: true, agent: 'Patricia' }
  ]

  const mockNotifications = [
    {
      id: 1,
      type: 'flash',
      title: 'PROMOÇÃO RELÂMPAGO! ⚡',
      message: '50% OFF em manicure - Só hoje até 18h!',
      time: '5min',
      priority: 'high',
      icon: Flame
    },
    {
      id: 2,
      type: 'birthday',
      title: 'Feliz Aniversário! 🎉',
      message: 'Ganhe 100 pontos extras em qualquer serviço no seu mês!',
      time: '2h',
      priority: 'medium',
      icon: Gift
    },
    {
      id: 3,
      type: 'reminder',
      title: 'Lembrete de Agendamento',
      message: 'Seu horário é amanhã às 14h para corte + escova',
      time: '1d',
      priority: 'medium',
      icon: Clock
    },
    {
      id: 4,
      type: 'achievement',
      title: 'Novo Nível Desbloqueado! 👑',
      message: 'Parabéns! Você chegou ao nível Gold',
      time: '3d',
      priority: 'low',
      icon: Crown
    }
  ]

  const mockProducts = [
    {
      id: 1,
      brand: 'Wella Professionals',
      line: 'Invigo Brilliance',
      name: 'Wella Professionals Shampoo Invigo Brilliance',
      volume: '250ml',
      fullName: 'Wella Professionals Invigo Brilliance 250ml',
      price: 68.90,
      originalPrice: 85.00,
      category: 'Cabelo',
      image: 'https://images.unsplash.com/photo-1740490278517-21ec451914f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwaGFpciUyMGNhcmUlMjBwcm9kdWN0c3xlbnwxfHx8fDE3NTc0NzU0OTl8MA&ixlib=rb-4.1.0&q=80&w=1080',
      stock: 4,
      rating: 4.8,
      reviews: 127,
      description: 'Shampoo para cabelos coloridos, protege e realça o brilho da cor.'
    },
    {
      id: 2,
      brand: 'Wella Professionals',
      line: 'Fusion',
      name: 'Wella Professionals Condicionador Fusion',
      volume: '200ml',
      fullName: 'Wella Professionals Fusion 200ml',
      price: 72.50,
      originalPrice: null,
      category: 'Cabelo',
      image: 'https://images.unsplash.com/photo-1740490278517-21ec451914f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwaGFpciUyMGNhcmUlMjBwcm9kdWN0c3xlbnwxfHx8fDE3NTc0NzU0OTl8MA&ixlib=rb-4.1.0&q=80&w=1080',
      stock: 2,
      rating: 4.7,
      reviews: 89,
      description: 'Condicionador reparador intensivo para cabelos danificados.'
    },
    {
      id: 3,
      brand: 'Wella Professionals',
      line: 'Oil Reflections',
      name: 'Wella Professionals Máscara Oil Reflections',
      volume: '150ml',
      fullName: 'Wella Professionals Oil Reflections 150ml',
      price: 89.90,
      originalPrice: 110.00,
      category: 'Cabelo',
      image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYWlyJTIwbWFzayUyMHRyZWF0bWVudHxlbnwxfHx8fDE3NTc0ODIyNzN8MA&ixlib=rb-4.1.0&q=80&w=1080',
      stock: 1,
      rating: 4.9,
      reviews: 156,
      description: 'Máscara nutritiva para brilho luminoso e sedosidade intensa.'
    },
    {
      id: 4,
      brand: 'Wella Professionals',
      line: 'Oil Reflections',
      name: 'Wella Professionals Óleo Oil Reflections',
      volume: '100ml',
      fullName: 'Wella Professionals Oil Reflections 100ml',
      price: 95.90,
      originalPrice: 120.00,
      category: 'Cabelo',
      image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYWlyJTIwb2lsJTIwdHJlYXRtZW50fGVufDF8fHx8MTc1NzQ4MjI3M3ww&ixlib=rb-4.1.0&q=80&w=1080',
      stock: 0,
      rating: 4.6,
      reviews: 94,
      description: 'Óleo nutritivo para brilho e proteção instantâneos.'
    },
    {
      id: 5,
      brand: 'Kérastase',
      line: 'Nutritive Bain Satin 1',
      name: 'Kérastase Shampoo Nutritive Bain Satin 1',
      volume: '250ml',
      fullName: 'Kérastase Nutritive Bain Satin 1 250ml',
      price: 128.90,
      originalPrice: 145.00,
      category: 'Cabelo',
      image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBoYWlyJTIwc2hhbXBvb3xlbnwxfHx8fDE3NTc0ODIyNzN8MA&ixlib=rb-4.1.0&q=80&w=1080',
      stock: 3,
      rating: 4.9,
      reviews: 203,
      description: 'Shampoo nutritivo para cabelos normais a ligeiramente ressecados.'
    },
    {
      id: 6,
      brand: 'Kérastase',
      line: 'Résistance Ciment Anti-Usure',
      name: 'Kérastase Condicionador Résistance Ciment Anti-Usure',
      volume: '200ml',
      fullName: 'Kérastase Résistance Ciment Anti-Usure 200ml',
      price: 135.50,
      originalPrice: null,
      category: 'Cabelo',
      image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYWlyJTIwbWFzayUyMHRyZWF0bWVudHxlbnwxfHx8fDE3NTc0ODIyNzN8MA&ixlib=rb-4.1.0&q=80&w=1080',
      stock: 1,
      rating: 4.8,
      reviews: 76,
      description: 'Condicionador reconstrutor para cabelos danificados e quebradiços.'
    }
  ]

  const mockTrends = [
    { id: 1, title: 'Glass Hair', posts: '2.3k posts', trending: true },
    { id: 2, title: 'Nail Art Minimalista', posts: '1.8k posts', trending: true },
    { id: 3, title: 'Cortes Assimétricos', posts: '956 posts', trending: false },
    { id: 4, title: 'Coloração Sunset', posts: '743 posts', trending: true }
  ]

  const handleLogin = () => {
    setIsLoggedIn(true)
    setCurrentScreen('dashboard')
  }

  const toggleLike = (postId: number) => {
    setLikedPosts(prev => {
      const newSet = new Set(prev)
      if (newSet.has(postId)) {
        newSet.delete(postId)
      } else {
        newSet.add(postId)
      }
      return newSet
    })
  }

  const toggleSave = (postId: number) => {
    setSavedPosts(prev => {
      const newSet = new Set(prev)
      if (newSet.has(postId)) {
        newSet.delete(postId)
      } else {
        newSet.add(postId)
      }
      return newSet
    })
  }

  const handlePollVote = (postId: number, optionId: number) => {
    setPollVotes(prev => ({
      ...prev,
      [postId]: optionId
    }))
  }

  const toggleCart = (productId: number) => {
    setCartItems(prev => {
      const newSet = new Set(prev)
      if (newSet.has(productId)) {
        newSet.delete(productId)
      } else {
        newSet.add(productId)
      }
      return newSet
    })
  }

  const toggleFavorite = (productId: number) => {
    setFavoriteProducts(prev => {
      const newSet = new Set(prev)
      if (newSet.has(productId)) {
        newSet.delete(productId)
      } else {
        newSet.add(productId)
      }
      return newSet
    })
  }

  const viewProductDetail = (product: any) => {
    setSelectedProduct(product)
    setCurrentScreen('product-detail')
  }

  const BottomNav = () => (
    <motion.div 
      className="fixed bottom-6 left-6 right-6 safe-area-pb"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.8, type: "spring", stiffness: 100 }}
    >
      {/* Premium Pill Tab Bar */}
      <div className="relative">
        {/* Floating shadow for depth */}
        <div className="absolute inset-0 bg-black/8 rounded-full blur-lg scale-105"></div>
        
        {/* Main pill container */}
        <div className="relative bg-white/95 backdrop-blur-2xl border border-white/20 rounded-full px-3 py-4 shadow-2xl">
          <div className="flex justify-around items-center">
            {[
              { screen: 'dashboard', icon: Home, label: 'Início', color: '#FF9A9A' },
              { screen: 'shop', icon: ShoppingCart, label: 'Comprar', color: '#FFB366' },
              { screen: 'social', icon: Sparkles, label: 'Feed', color: '#B8A7E6' },
              { screen: 'salon', icon: MapPin, label: 'Salão', color: '#A8D8B9' },
              { screen: 'rewards', icon: Trophy, label: 'Prêmios', color: '#F2D2A9' }
            ].map((item, index) => {
              const isActive = currentScreen === item.screen
              
              return (
                <motion.button
                  key={item.screen}
                  onClick={() => setCurrentScreen(item.screen as ClientScreen)}
                  className="relative flex flex-col items-center justify-center p-3 rounded-2xl transition-all duration-500"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ 
                    scale: 0.95,
                    y: [0, -8, 0],
                    transition: { duration: 0.3, type: "spring", stiffness: 400 }
                  }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.6 }}
                >
                  {/* Circular glow indicator for active item */}
                  {isActive && (
                    <motion.div
                      className="absolute inset-0 rounded-2xl"
                      style={{ 
                        background: `radial-gradient(circle, ${item.color}20 0%, ${item.color}10 50%, transparent 70%)`,
                        boxShadow: `0 0 20px ${item.color}40`
                      }}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    />
                  )}
                  
                  {/* Floating circular background for active item */}
                  {isActive && (
                    <motion.div
                      className="absolute w-12 h-12 rounded-full"
                      style={{ backgroundColor: item.color + '30' }}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      layoutId="activeIndicator"
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    />
                  )}
                  
                  {/* Icon with premium bounce animation */}
                  <motion.div
                    animate={isActive ? {
                      y: [0, -4, 0],
                      scale: [1, 1.15, 1],
                      rotate: [0, 5, -5, 0]
                    } : { scale: 1 }}
                    transition={{ 
                      duration: 0.6, 
                      type: "spring", 
                      stiffness: 300,
                      repeat: isActive ? Infinity : 0,
                      repeatDelay: 2
                    }}
                    className="relative z-10"
                  >
                    <item.icon 
                      size={24}
                      strokeWidth={1.5}
                      className={`transition-all duration-300 ${
                        isActive 
                          ? 'text-gray-700 drop-shadow-sm' 
                          : 'text-gray-400'
                      }`}
                    />
                  </motion.div>
                  
                  {/* Label with elegant fade-in */}
                  {isActive && (
                    <motion.span 
                      className="absolute -bottom-1 text-xs font-medium tracking-wide relative z-10"
                      style={{ color: item.color.replace('9A', '6B') }}
                      initial={{ opacity: 0, y: 10, scale: 0.8 }}
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
              )
            })}
          </div>
        </div>
        
        {/* Elegant border highlight */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" 
             style={{ height: '1px', top: 0 }} />
      </div>
    </motion.div>
  )

  const SocialScreen = () => (
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
            <h1 className="text-xl font-bold text-black">
              ConLace Feed
            </h1>
          </div>
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => setCurrentScreen('community')}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <Users size={22} className="text-gray-600" />
            </button>
            <button 
              onClick={() => setCurrentScreen('chat')}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors relative"
            >
              <MessageSquareText size={22} className="text-gray-600" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-coral rounded-full"></div>
            </button>
            <button 
              onClick={() => setCurrentScreen('notifications')}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors relative"
            >
              <Bell size={22} className="text-gray-600" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-coral rounded-full"></div>
            </button>
          </div>
        </div>
      </div>

      {/* Trends Section */}
      <div className="bg-white p-4 mb-2">
        <div className="flex items-center space-x-2 mb-4">
          <TrendingUp className="text-coral" size={20} />
          <h2 className="font-bold text-lg">Em Alta</h2>
        </div>
        <div className="flex space-x-3 overflow-x-auto pb-2">
          {mockTrends.map((trend) => (
            <motion.div
              key={trend.id}
              className="flex-shrink-0 bg-gradient-to-br from-coral/10 to-purple/10 rounded-2xl p-4 min-w-[140px] cursor-pointer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center space-x-1 mb-2">
                <span className="text-sm font-bold">{trend.title}</span>
                {trend.trending && (
                  <div className="w-2 h-2 bg-coral rounded-full animate-pulse"></div>
                )}
              </div>
              <p className="text-xs text-gray-600">{trend.posts}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Feed */}
      <div className="space-y-2">
        {mockPosts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            {post.type === 'promotion' ? (
              <Card className={`mx-4 overflow-hidden border-2 ${post.isFlash ? 'border-coral animate-pulse' : 'border-coral/20'} bg-gradient-to-br from-coral/5 to-purple/5`}>
                <CardContent className="p-0">
                  {post.image && (
                    <div className="relative">
                      <ImageWithFallback 
                        src={post.image} 
                        alt="Promoção" 
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-3 left-3">
                        <Badge className={`font-bold ${post.isFlash ? 'bg-coral text-white animate-pulse' : 'bg-coral text-white'}`}>
                          {post.isFlash ? 'PROMOÇÃO RELÂMPAGO ⚡' : 'PROMOÇÃO EXCLUSIVA'}
                        </Badge>
                      </div>
                      {post.isFlash && (
                        <div className="absolute top-3 right-3">
                          <div className="flex items-center space-x-1 bg-black/60 text-white px-2 py-1 rounded-full text-xs">
                            <Clock size={12} />
                            <span>2h restantes</span>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-2 text-coral">{post.title}</h3>
                    <p className="text-gray-700 mb-3">{post.description}</p>
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-gray-600">{post.validUntil}</p>
                      <Button className={`text-white px-6 py-2 rounded-full ${post.isFlash ? 'bg-coral hover:bg-coral-light animate-pulse' : 'bg-coral hover:bg-coral-light'}`}>
                        {post.isFlash ? 'Aproveitar Agora!' : 'Aproveitar'}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : post.type === 'tip' ? (
              <Card className="mx-4 overflow-hidden border-l-4 border-l-mint">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-mint to-mint-light rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-sm">{post.user.avatar}</span>
                      {post.user.isOfficial && (
                        <div className="absolute -bottom-1 -right-1">
                          <div className="w-4 h-4 bg-mint rounded-full flex items-center justify-center">
                            <Star size={8} className="text-white" fill="currentColor" />
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <p className="font-bold text-sm">{post.user.name}</p>
                        {post.user.isOfficial && (
                          <Badge className="bg-mint text-white text-xs">
                            {post.user.level}
                          </Badge>
                        )}
                        <span className="text-xs text-gray-500">• {post.time}</span>
                      </div>
                      <p className="text-gray-800 leading-relaxed mb-3">{post.content}</p>
                      {post.tags && (
                        <div className="flex flex-wrap gap-2 mb-3">
                          {post.tags.map((tag) => (
                            <span key={tag} className="text-xs bg-mint/10 text-mint px-2 py-1 rounded-full">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
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
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="mx-4 overflow-hidden">
                <CardContent className="p-0">
                  {/* Post Header */}
                  <div className="flex items-center justify-between p-4 pb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-coral to-purple rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">{post.user.avatar}</span>
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <p className="font-bold text-sm">{post.user.name}</p>
                          <Badge className={`text-xs ${
                            post.user.level === 'Gold' ? 'bg-coral text-white' : 
                            post.user.level === 'Silver' ? 'bg-purple text-white' : 'bg-mint text-white'
                          }`}>
                            {post.user.level}
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-500">{post.time} • {post.salon}</p>
                      </div>
                    </div>
                    <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                      <MoreHorizontal size={16} className="text-gray-600" />
                    </button>
                  </div>

                  {/* Post Content */}
                  <div className="relative">
                    {post.type === 'image' ? (
                      <ImageWithFallback 
                        src={post.image} 
                        alt="Post" 
                        className="w-full h-64 object-cover"
                      />
                    ) : (
                      <div className="relative">
                        <ImageWithFallback 
                          src={post.thumbnail} 
                          alt="Video thumbnail" 
                          className="w-full h-64 object-cover"
                        />
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                          <motion.button
                            className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Play size={24} className="text-coral ml-1" fill="currentColor" />
                          </motion.button>
                        </div>
                        <div className="absolute bottom-3 right-3">
                          <Badge className="bg-black/60 text-white">
                            {post.duration}
                          </Badge>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Post Actions */}
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-4">
                        <motion.button
                          onClick={() => toggleLike(post.id)}
                          className="flex items-center space-x-1"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Heart 
                            size={24} 
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
                          <MessageCircle size={24} className="text-gray-600" />
                          <span className="text-sm font-medium">{post.comments}</span>
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Share2 size={24} className="text-gray-600" />
                        </motion.button>
                      </div>
                      <motion.button
                        onClick={() => toggleSave(post.id)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Bookmark 
                          size={24} 
                          className={savedPosts.has(post.id) ? 'text-coral fill-coral' : 'text-gray-600'} 
                          fill={savedPosts.has(post.id) ? 'currentColor' : 'none'}
                        />
                      </motion.button>
                    </div>
                    <p className="text-gray-800 leading-relaxed">{post.caption}</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </motion.div>
        ))}
      </div>

      {/* Quick Access Menu */}
      <div className="p-4">
        <Card className="shadow-lg bg-gradient-to-r from-beige to-white">
          <CardContent className="p-4">
            <h3 className="font-bold text-gray-800 mb-3 text-center">Acesso Rápido</h3>
            <div className="grid grid-cols-2 gap-3">
              <Button
                onClick={() => setCurrentScreen('community')}
                variant="outline"
                className="flex items-center space-x-2 p-3 h-auto border-purple text-purple hover:bg-purple hover:text-white"
              >
                <Users size={18} />
                <span className="text-sm">Comunidade</span>
              </Button>
              <Button
                onClick={() => setCurrentScreen('chat')}
                variant="outline"
                className="flex items-center space-x-2 p-3 h-auto border-mint text-mint hover:bg-mint hover:text-white"
              >
                <MessageSquareText size={18} />
                <span className="text-sm">Chat</span>
              </Button>
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
  )

  const CommunityScreen = () => (
    <motion.div 
      className="min-h-screen bg-gray-soft pb-24"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-purple to-mint p-6 pt-12 text-white rounded-b-3xl">
        <div className="flex items-center space-x-4 mb-4">
          <button
            onClick={() => setCurrentScreen('dashboard')}
            className="text-white/80 hover:text-white p-2"
          >
            <ArrowLeft size={24} />
          </button>
          <div>
            <h1 className="text-2xl font-bold">Comunidade ConLace</h1>
            <p className="opacity-90">Compartilhe dicas e tire dúvidas com outras clientes</p>
          </div>
        </div>
      </div>

      {/* New Post */}
      <div className="p-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <Avatar className="h-10 w-10">
                <AvatarFallback className="bg-coral text-white">
                  {mockUser.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <Textarea
                  placeholder="Compartilhe uma dica ou faça uma pergunta..."
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  className="border-0 resize-none focus:ring-0 p-0"
                  rows={3}
                />
                <div className="flex justify-between items-center mt-3">
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" className="border-purple text-purple hover:bg-purple hover:text-white">
                      <Camera size={16} className="mr-1" />
                      Foto
                    </Button>
                    <Button size="sm" variant="outline" className="border-mint text-mint hover:bg-mint hover:text-white">
                      <BarChart3 size={16} className="mr-1" />
                      Enquete
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
          </CardContent>
        </Card>
      </div>

      {/* Quick Navigation */}
      <div className="p-4">
        <Card className="shadow-lg bg-gradient-to-r from-purple/5 to-mint/5">
          <CardContent className="p-4">
            <h3 className="font-bold text-gray-800 mb-3 text-center">Navegação</h3>
            <div className="grid grid-cols-3 gap-3">
              <Button
                onClick={() => setCurrentScreen('social')}
                variant="outline"
                className="flex items-center space-x-2 p-3 h-auto border-coral text-coral hover:bg-coral hover:text-white"
              >
                <Sparkles size={18} />
                <span className="text-xs">Feed</span>
              </Button>
              <Button
                onClick={() => setCurrentScreen('chat')}
                variant="outline"
                className="flex items-center space-x-2 p-3 h-auto border-mint text-mint hover:bg-mint hover:text-white"
              >
                <MessageSquareText size={18} />
                <span className="text-xs">Chat</span>
              </Button>
              <Button
                onClick={() => setCurrentScreen('salon')}
                variant="outline"
                className="flex items-center space-x-2 p-3 h-auto border-purple text-purple hover:bg-purple hover:text-white"
              >
                <MapPin size={18} />
                <span className="text-xs">Salão</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Community Posts */}
      <div className="space-y-4 px-4">
        {mockCommunityPosts.map((post) => (
          <Card key={post.id}>
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className={`text-white ${
                    post.user.level === 'Gold' ? 'bg-coral' : 
                    post.user.level === 'Silver' ? 'bg-purple' : 'bg-mint'
                  }`}>
                    {post.user.avatar}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <p className="font-bold text-sm">{post.user.name}</p>
                    <Badge className={`text-xs ${
                      post.user.level === 'Gold' ? 'bg-coral text-white' : 
                      post.user.level === 'Silver' ? 'bg-purple text-white' : 'bg-mint text-white'
                    }`}>
                      {post.user.level}
                    </Badge>
                    <span className="text-xs text-gray-500">• {post.time}</span>
                  </div>
                  
                  <p className="text-gray-800 mb-3">{post.content}</p>
                  
                  {post.type === 'photo' && post.image && (
                    <div className="mb-3">
                      <ImageWithFallback 
                        src={post.image} 
                        alt="Post da comunidade" 
                        className="w-full h-48 object-cover rounded-xl"
                      />
                    </div>
                  )}
                  
                  {post.type === 'poll' && post.poll && (
                    <div className="mb-3 space-y-2">
                      {post.poll.options.map((option) => (
                        <button
                          key={option.id}
                          onClick={() => handlePollVote(post.id, option.id)}
                          className={`w-full p-3 rounded-xl text-left transition-colors ${
                            pollVotes[post.id] === option.id 
                              ? 'bg-coral text-white' 
                              : 'bg-beige hover:bg-beige-dark'
                          }`}
                        >
                          <div className="flex justify-between items-center">
                            <span>{option.text}</span>
                            <span className="text-sm">
                              {Math.round((option.votes / post.poll.totalVotes) * 100)}%
                            </span>
                          </div>
                        </button>
                      ))}
                      <p className="text-xs text-gray-500 mt-2">
                        {post.poll.totalVotes} votos
                      </p>
                    </div>
                  )}
                  
                  <div className="flex items-center space-x-4">
                    <motion.button
                      className="flex items-center space-x-1 text-gray-600 hover:text-coral transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ThumbsUp size={18} />
                      <span className="text-sm">{post.likes}</span>
                    </motion.button>
                    <motion.button
                      className="flex items-center space-x-1 text-gray-600 hover:text-purple transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <MessageCircle size={18} />
                      <span className="text-sm">{post.replies} respostas</span>
                    </motion.button>
                    <motion.button
                      className="flex items-center space-x-1 text-gray-600 hover:text-mint transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Share2 size={18} />
                      <span className="text-sm">Compartilhar</span>
                    </motion.button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </motion.div>
  )

  const SalonScreen = () => (
    <motion.div 
      className="min-h-screen bg-gray-soft pb-24"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Salon Header */}
      <div className="relative">
        <ImageWithFallback 
          src={mockSalonInfo.image} 
          alt="Bella Vista Salão" 
          className="w-full h-48 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4 text-white">
          <div className="flex items-center space-x-3 mb-2">
            <img 
              src={conlaceLogo} 
              alt="Logo" 
              className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur p-2"
            />
            <div>
              <h1 className="text-2xl font-bold">{mockSalonInfo.name}</h1>
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1">
                  <Star size={16} className="text-yellow-400" fill="currentColor" />
                  <span className="text-sm">{mockSalonInfo.rating}</span>
                </div>
                <span className="text-sm opacity-75">• Verificado</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Salon Info */}
        <Card>
          <CardContent className="p-6">
            <p className="text-gray-700 mb-4">{mockSalonInfo.description}</p>
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <MapPin className="text-coral" size={20} />
                <span className="text-gray-700">{mockSalonInfo.address}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="text-coral" size={20} />
                <span className="text-gray-700">{mockSalonInfo.phone}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Button 
            onClick={() => setCurrentScreen('booking')}
            className="bg-coral hover:bg-coral-light text-white p-6 h-auto flex flex-col space-y-2 rounded-2xl"
          >
            <Calendar size={32} />
            <span>Agendar</span>
          </Button>
          <Button 
            onClick={() => setCurrentScreen('chat')}
            className="bg-mint hover:bg-mint-light text-white p-6 h-auto flex flex-col space-y-2 rounded-2xl"
          >
            <MessageSquareText size={32} />
            <span>Chat</span>
          </Button>
        </div>

        {/* Services */}
        <Card>
          <CardHeader>
            <CardTitle>Nossos Serviços</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockSalonInfo.services.map((service, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-beige rounded-xl">
                  <div>
                    <p className="font-medium">{service.name}</p>
                    <p className="text-sm text-gray-600">{service.duration}</p>
                  </div>
                  <p className="font-bold text-coral">{service.price}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Points Program */}
        <Card className="border-l-4 border-l-mint">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Trophy className="text-mint" size={20} />
              <span>Programa de Pontos</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-mint">{mockUser.points}</p>
                <p className="text-sm text-gray-600">Seus Pontos</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-coral">{mockUser.referrals}</p>
                <p className="text-sm text-gray-600">Indicações</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-purple">{mockUser.engagementPoints}</p>
                <p className="text-sm text-gray-600">Eng. Points</p>
              </div>
            </div>
            <Button 
              onClick={() => setCurrentScreen('rewards')}
              className="w-full bg-mint hover:bg-mint-light text-white"
            >
              Ver Todas as Recompensas
            </Button>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  )

  const ChatScreen = () => (
    <motion.div 
      className="min-h-screen bg-gray-soft pb-24 flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-mint to-coral p-6 pt-12 text-white">
        <h1 className="text-2xl font-bold mb-2">Atendimento ConLace</h1>
        <p className="opacity-90">Chat inteligente • Resposta em segundos</p>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 p-4 space-y-4">
        {mockChatHistory.map((message) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, x: message.sender === 'user' ? 50 : -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[80%] ${message.sender === 'user' ? 'order-2' : 'order-1'}`}>
              {message.sender !== 'user' && (
                <div className="flex items-center space-x-2 mb-1">
                  {message.isBot ? (
                    <Bot size={16} className="text-mint" />
                  ) : (
                    <User size={16} className="text-coral" />
                  )}
                  <span className="text-xs text-gray-600">
                    {message.isBot ? 'Bot ConLace' : message.agent || 'Atendente'}
                  </span>
                </div>
              )}
              <div className={`p-3 rounded-2xl ${
                message.sender === 'user' 
                  ? 'bg-coral text-white' 
                  : message.isBot 
                    ? 'bg-mint/10 text-gray-800' 
                    : 'bg-purple/10 text-gray-800'
              }`}>
                <p>{message.message}</p>
                <p className={`text-xs mt-1 ${
                  message.sender === 'user' ? 'text-white/70' : 'text-gray-500'
                }`}>
                  {message.time}
                </p>
              </div>
            </div>
          </motion.div>
        ))}

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-2 mt-6">
          <Button variant="outline" className="border-coral text-coral hover:bg-coral hover:text-white">
            Agendar Horário
          </Button>
          <Button variant="outline" className="border-mint text-mint hover:bg-mint hover:text-white">
            Ver Promoções
          </Button>
          <Button variant="outline" className="border-purple text-purple hover:bg-purple hover:text-white">
            Meus Pontos
          </Button>
          <Button variant="outline" className="border-coral text-coral hover:bg-coral hover:text-white">
            Falar com Humano
          </Button>
        </div>
      </div>

      {/* Message Input */}
      <div className="p-4 bg-white border-t">
        <div className="flex items-center space-x-2">
          <Input
            placeholder="Digite sua mensagem..."
            value={chatMessage}
            onChange={(e) => setChatMessage(e.target.value)}
            className="flex-1"
          />
          <Button 
            className="bg-coral hover:bg-coral-light text-white"
            disabled={!chatMessage.trim()}
          >
            <Send size={20} />
          </Button>
        </div>
      </div>
    </motion.div>
  )

  const ShopScreen = () => (
    <motion.div 
      className="min-h-screen bg-white pb-24"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-coral via-purple to-mint p-6 pt-12 text-white rounded-b-3xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img 
              src={conlaceLogo} 
              alt="ConLace" 
              className="w-8 h-8"
            />
            <div>
              <h1 className="text-2xl font-bold">Loja do Salão</h1>
              <p className="opacity-90">Produtos profissionais para você</p>
            </div>
          </div>
          
          {/* Carrinho */}
          <div className="relative">
            <Button className="p-3 bg-white/20 hover:bg-white/30 rounded-2xl">
              <ShoppingCart size={24} className="text-white" />
            </Button>
            {cartItems.size > 0 && (
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-2 -right-2 w-6 h-6 bg-coral rounded-full flex items-center justify-center shadow-lg"
              >
                <span className="text-xs font-bold text-white">{cartItems.size}</span>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="p-5">
        <div className="grid grid-cols-2 gap-4">
          {mockProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: index * 0.1, 
                duration: 0.6,
                type: "spring",
                stiffness: 100
              }}
              onClick={() => viewProductDetail(product)}
              className="bg-white rounded-3xl overflow-hidden shadow-lg cursor-pointer group relative"
              whileHover={{ 
                scale: 1.03, 
                y: -8,
                boxShadow: "0 20px 40px -12px rgba(0, 0, 0, 0.2)"
              }}
              whileTap={{ scale: 0.97 }}
            >
              {/* Imagem */}
              <div className="relative overflow-hidden">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.4 }}
                >
                  <ImageWithFallback 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-40 object-cover"
                  />
                </motion.div>
                
                {/* Etiqueta de Esgotado */}
                {product.stock === 0 && (
                  <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-red-500 to-gray-600 text-white text-center py-2">
                    <span className="text-xs font-bold">ESGOTADO</span>
                  </div>
                )}

                {/* Desconto */}
                {product.originalPrice && product.stock > 0 && (
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-coral text-white font-bold px-2 py-1 text-xs">
                      -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                    </Badge>
                  </div>
                )}

                {/* Botão Favoritar */}
                <motion.button
                  onClick={(e) => {
                    e.stopPropagation()
                    toggleFavorite(product.id)
                  }}
                  className="absolute bottom-3 right-3 p-2 bg-white/90 rounded-full shadow-lg"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Heart 
                    size={16} 
                    className={favoriteProducts.has(product.id) ? 'text-coral fill-coral' : 'text-gray-500'} 
                    fill={favoriteProducts.has(product.id) ? 'currentColor' : 'none'}
                  />
                </motion.button>
              </div>
              
              {/* Info do Produto */}
              <div className="p-4 space-y-2">
                <div>
                  <p className="text-xs font-medium text-purple uppercase">
                    {product.brand}
                  </p>
                  <h3 className="font-bold text-sm text-gray-800 line-clamp-2">
                    {product.fullName}
                  </h3>
                </div>
                
                <div className="flex items-baseline space-x-2">
                  <span className="text-lg font-bold text-purple">
                    R$ {product.price.toFixed(2)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-xs text-gray-400 line-through">
                      R$ {product.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>
                
                {/* Estoque */}
                {product.stock > 0 ? (
                  <p className="text-xs text-mint font-medium">
                    {product.stock} disponíveis
                  </p>
                ) : (
                  <p className="text-xs text-gray-500">
                    Disponível para pedido
                  </p>
                )}

                {/* Rating */}
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i}
                      size={10} 
                      className={i < Math.floor(product.rating) ? 'text-coral fill-coral' : 'text-gray-300'}
                      fill="currentColor"
                    />
                  ))}
                  <span className="text-xs text-gray-500">({product.reviews})</span>
                </div>

                {/* Botão Adicionar */}
                <motion.button
                  onClick={(e) => {
                    e.stopPropagation()
                    toggleCart(product.id)
                  }}
                  className={`w-full py-2 rounded-xl font-bold text-sm transition-all text-center flex items-center justify-center ${
                    product.stock === 0
                      ? 'bg-purple/10 text-purple'
                      : cartItems.has(product.id)
                        ? 'bg-mint text-white'
                        : 'bg-coral text-white hover:bg-coral-light'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {product.stock === 0 
                    ? 'Fazer Pedido' 
                    : cartItems.has(product.id)
                      ? '✓ No Carrinho'
                      : 'Adicionar'
                  }
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Floating Cart Button */}
      {cartItems.size > 0 && (
        <motion.div 
          className="fixed bottom-20 right-6"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Button className="bg-coral hover:bg-coral-light text-white p-4 rounded-full shadow-2xl flex items-center justify-center">
            <ShoppingCart size={24} />
            <span className="ml-2 font-bold">Ver Carrinho ({cartItems.size})</span>
          </Button>
        </motion.div>
      )}
    </motion.div>
  )

  const ClientProductDetailScreen = () => {
    if (!selectedProduct) return null

    return (
      <motion.div 
        className="min-h-screen bg-white pb-32"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        {/* Hero Image */}
        <div className="relative h-80 overflow-hidden">
          <ImageWithFallback 
            src={selectedProduct.image} 
            alt={selectedProduct.name}
            className="w-full h-full object-cover"
          />
          
          {/* Header controls */}
          <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
            <Button
              onClick={() => setCurrentScreen('shop')}
              className="p-3 bg-white/90 backdrop-blur rounded-full shadow-lg"
            >
              <ArrowLeft size={20} className="text-gray-800" />
            </Button>
            
            <Button
              onClick={() => toggleFavorite(selectedProduct.id)}
              className="p-3 bg-white/90 backdrop-blur rounded-full shadow-lg"
            >
              <Heart 
                size={20} 
                className={favoriteProducts.has(selectedProduct.id) ? 'text-coral fill-coral' : 'text-gray-800'} 
                fill={favoriteProducts.has(selectedProduct.id) ? 'currentColor' : 'none'}
              />
            </Button>
          </div>
          
          {/* Discount badge */}
          {selectedProduct.originalPrice && (
            <div className="absolute bottom-4 left-4">
              <Badge className="bg-coral text-white font-bold px-4 py-2 text-lg">
                -{Math.round((1 - selectedProduct.price / selectedProduct.originalPrice) * 100)}% OFF
              </Badge>
            </div>
          )}
        </div>

        {/* Product Content */}
        <div className="relative -mt-8 bg-white rounded-t-3xl shadow-2xl p-6 space-y-6">
          {/* Product Header */}
          <div>
            <Badge className="bg-gradient-to-r from-purple/10 to-coral/10 text-purple px-3 py-1 mb-3">
              {selectedProduct.category}
            </Badge>
            
            <div className="mb-4">
              <p className="text-lg font-semibold text-purple uppercase tracking-wide mb-1">
                {selectedProduct.brand}
              </p>
              <p className="text-sm text-gray-500 mb-2">{selectedProduct.line}</p>
              <h1 className="text-2xl font-bold text-gray-800">
                {selectedProduct.fullName}
              </h1>
            </div>
            
            <p className="text-gray-600 leading-relaxed">
              {selectedProduct.description}
            </p>
          </div>

          {/* Price */}
          <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-beige to-white rounded-2xl">
            <div className="flex-1">
              <span className="text-4xl font-bold text-purple">R$ {selectedProduct.price.toFixed(2)}</span>
              {selectedProduct.originalPrice && (
                <div className="mt-2">
                  <span className="text-lg text-gray-400 line-through">
                    R$ {selectedProduct.originalPrice.toFixed(2)}
                  </span>
                  <span className="text-sm text-coral font-bold ml-2">
                    Economia: R$ {(selectedProduct.originalPrice - selectedProduct.price).toFixed(2)}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Stock Information */}
          <Card className="border-0 shadow-lg">
            <CardContent className="p-4">
              <h3 className="font-bold text-lg mb-2">Disponibilidade</h3>
              {selectedProduct.stock > 0 ? (
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-mint rounded-full"></div>
                  <span className="text-mint font-bold">
                    {selectedProduct.stock} {selectedProduct.stock === 1 ? 'unidade disponível' : 'unidades disponíveis'}
                  </span>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="text-red-600 font-bold">Esgotado</span>
                  </div>
                  <p className="text-gray-500 text-sm">Disponível para pedido</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Reviews */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Star className="text-coral" size={24} fill="currentColor" />
                <span>Avaliações ({selectedProduct.reviews})</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4 mb-4">
                <span className="text-3xl font-bold">{selectedProduct.rating}</span>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={20} className={i < Math.floor(selectedProduct.rating) ? 'text-coral fill-coral' : 'text-gray-300'} />
                  ))}
                </div>
              </div>
              <p className="text-gray-600">Produto muito bem avaliado pelas clientes do salão!</p>
            </CardContent>
          </Card>
        </div>

        {/* Floating Action Button */}
        <div className="fixed bottom-6 left-6 right-6">
          <Button 
            onClick={() => toggleCart(selectedProduct.id)}
            className={`w-full h-14 text-white font-bold rounded-2xl shadow-2xl ${
              selectedProduct.stock === 0
                ? 'bg-purple hover:bg-purple-light'
                : cartItems.has(selectedProduct.id) 
                  ? 'bg-mint hover:bg-mint-light' 
                  : 'bg-coral hover:bg-coral-light'
            }`}
          >
            <div className="flex items-center justify-center space-x-3">
              <ShoppingCart size={24} />
              <span className="text-lg">
                {selectedProduct.stock === 0 
                  ? 'Fazer Pedido' 
                  : cartItems.has(selectedProduct.id) 
                    ? '✓ Adicionado ao Carrinho' 
                    : 'Adicionar ao Carrinho'
                }
              </span>
            </div>
          </Button>
        </div>
      </motion.div>
    )
  }

  const RewardsScreen = () => (
    <motion.div 
      className="min-h-screen bg-gray-soft pb-24"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-coral via-purple to-mint p-6 pt-12 text-white rounded-b-3xl">
        <div className="flex items-center space-x-3 mb-4">
          <Trophy className="text-white" size={32} />
          <div>
            <h1 className="text-2xl font-bold">Recompensas</h1>
            <p className="opacity-90">Troque seus pontos por prêmios incríveis</p>
          </div>
        </div>
        
        {/* User Stats */}
        <div className="grid grid-cols-3 gap-4">
          <Card className="bg-white/15 backdrop-blur border-0">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-white">{mockUser.points}</p>
              <p className="text-white/80 text-xs">Pontos Atuais</p>
            </CardContent>
          </Card>
          <Card className="bg-white/15 backdrop-blur border-0">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center space-x-1">
                <Crown className="text-yellow-400" size={16} />
                <p className="text-lg font-bold text-white">{mockUser.level}</p>
              </div>
              <p className="text-white/80 text-xs">Nível Atual</p>
            </CardContent>
          </Card>
          <Card className="bg-white/15 backdrop-blur border-0">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-white">{mockUser.totalPoints}</p>
              <p className="text-white/80 text-xs">Total Ganho</p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Progress to Next Level */}
        <Card className="border-l-4 border-l-coral">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold">Progresso para Platina</h3>
              <Badge className="bg-coral text-white">50 pontos restantes</Badge>
            </div>
            <Progress value={90} className="bg-gray-200 h-3 mb-2" />
            <p className="text-sm text-gray-600">Continue acumulando pontos para desbloquear recompensas exclusivas!</p>
          </CardContent>
        </Card>

        {/* Ways to Earn Points */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Zap className="text-coral" size={20} />
              <span>Ganhe Mais Pontos</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-beige rounded-xl">
                <div className="flex items-center space-x-3">
                  <Heart className="text-coral" size={20} />
                  <span>Curtir posts do feed</span>
                </div>
                <span className="text-coral font-bold">+2 pts</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-beige rounded-xl">
                <div className="flex items-center space-x-3">
                  <Users className="text-purple" size={20} />
                  <span>Indicar uma amiga</span>
                </div>
                <span className="text-purple font-bold">+50 pts</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-beige rounded-xl">
                <div className="flex items-center space-x-3">
                  <MessageCircle className="text-mint" size={20} />
                  <span>Comentar no feed</span>
                </div>
                <span className="text-mint font-bold">+5 pts</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Rewards Catalog */}
        <div>
          <h2 className="text-xl font-bold mb-4">Catálogo de Recompensas</h2>
          <div className="space-y-4">
            {mockRewards.map((reward) => (
              <Card key={reward.id} className={`${reward.available ? 'border-mint' : 'border-gray-200'} border-l-4`}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-center">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="font-bold text-lg">{reward.name}</h3>
                        <Badge className="bg-gray-100 text-gray-600 text-xs">
                          {reward.category}
                        </Badge>
                      </div>
                      <p className="text-coral font-bold">{reward.points} pontos</p>
                      {!reward.available && (
                        <p className="text-xs text-gray-500 mt-1">
                          Você precisa de mais {reward.points - mockUser.points} pontos
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                      <Button 
                        size="sm" 
                        className={`${
                          reward.available 
                            ? 'bg-mint hover:bg-mint-light text-white' 
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                        disabled={!reward.available}
                      >
                        {reward.available ? 'Resgatar' : 'Bloqueado'}
                      </Button>
                      {reward.available && (
                        <div className="flex items-center space-x-1">
                          <Award className="text-mint" size={14} />
                          <span className="text-xs text-mint">Disponível</span>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Referral Program */}
        <Card className="bg-gradient-to-br from-purple/5 to-coral/5 border border-purple/20">
          <CardContent className="p-6">
            <div className="text-center">
              <Users className="text-purple mx-auto mb-3" size={32} />
              <h3 className="font-bold text-lg mb-2">Indique e Ganhe</h3>
              <p className="text-gray-600 mb-4">
                Convide suas amigas e ganhe <span className="font-bold text-purple">50 pontos</span> para cada uma que se cadastrar!
              </p>
              <Button className="bg-purple hover:bg-purple-light text-white">
                Compartilhar Convite
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  )

  const SmartNotificationsScreen = () => (
    <motion.div 
      className="min-h-screen bg-gray-soft pb-24"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="bg-gradient-to-r from-coral to-purple p-6 pt-12 text-white rounded-b-3xl">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setCurrentScreen('dashboard')}
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
            <h1 className="text-2xl font-bold">Notificações</h1>
            <p className="opacity-90">Suas atualizações personalizadas</p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-4">
        {mockNotifications.map((notification) => (
          <Card key={notification.id} className={`${
            notification.priority === 'high' ? 'border-l-4 border-l-coral animate-pulse' :
            notification.priority === 'medium' ? 'border-l-4 border-l-purple' :
            'border-l-4 border-l-mint'
          }`}>
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <div className={`p-2 rounded-full ${
                  notification.priority === 'high' ? 'bg-coral/10' :
                  notification.priority === 'medium' ? 'bg-purple/10' :
                  'bg-mint/10'
                }`}>
                  <notification.icon className={`${
                    notification.priority === 'high' ? 'text-coral' :
                    notification.priority === 'medium' ? 'text-purple' :
                    'text-mint'
                  }`} size={20} />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold">{notification.title}</h3>
                    <span className="text-xs text-gray-500">{notification.time}</span>
                  </div>
                  <p className="text-gray-700 text-sm mb-3">{notification.message}</p>
                  {notification.priority === 'high' && (
                    <Button size="sm" className="bg-coral hover:bg-coral-light text-white">
                      Aproveitar Agora
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </motion.div>
  )

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
          <h1 className="text-3xl font-bold text-coral mb-2">Entre na sua conta</h1>
          <p className="text-gray-600">Acesse seu programa de fidelidade</p>
        </div>

        {/* Login Form */}
        <Card className="border-0 shadow-xl bg-white/95 backdrop-blur">
          <CardContent className="p-8">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Email ou WhatsApp
                </label>
                <Input 
                  type="text" 
                  placeholder="seu@email.com ou (11) 99999-9999"
                  className="w-full h-14 text-lg rounded-xl"
                />
              </div>
              
              <Button 
                onClick={handleLogin}
                className="w-full h-14 bg-coral hover:bg-coral-light text-white text-lg font-medium rounded-xl shadow-lg"
              >
                Entrar
              </Button>
              
              <div className="text-center">
                <button className="text-purple hover:text-purple-light transition-colors font-medium">
                  Primeiro acesso? Cadastre-se
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  )

  const DashboardScreen = () => (
    <motion.div 
      className="min-h-screen bg-gray-soft pb-24"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-coral to-purple p-6 pt-12 text-white rounded-b-3xl">
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center space-x-3">
            <img 
              src={conlaceLogo} 
              alt="ConLace" 
              className="w-8 h-8"
            />
            <div>
              <h1 className="text-xl font-bold">Olá, {mockUser.name}!</h1>
              <p className="opacity-90 text-sm">Nível {mockUser.level}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => setCurrentScreen('notifications')}
              className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors relative"
            >
              <Bell size={20} className="text-white" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-coral rounded-full"></div>
            </button>
            <button onClick={onBack} className="text-white/80 hover:text-white p-2">
              <ArrowLeft size={24} />
            </button>
          </div>
        </div>
        
        {/* Points Card */}
        <Card className="bg-white/15 backdrop-blur border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <p className="text-white/80 text-sm">Seus pontos</p>
                <p className="text-3xl font-bold text-white">{mockUser.points}</p>
              </div>
              <div className="text-right">
                <p className="text-white/80 text-sm">Próxima recompensa</p>
                <p className="text-xl font-bold text-white">{mockUser.nextReward}</p>
              </div>
            </div>
            <Progress value={(mockUser.points / mockUser.nextReward) * 100} className="bg-white/20 h-3" />
            <p className="text-white/80 text-sm mt-3">
              Faltam {mockUser.nextReward - mockUser.points} pontos para sua próxima recompensa
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="p-6 space-y-6">
        {/* Quick Actions */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-800">Ações Rápidas</h2>
          <div className="grid grid-cols-2 gap-4">
            <Button 
              onClick={() => setCurrentScreen('booking')}
              className="bg-mint hover:bg-mint-light text-white p-6 h-auto flex flex-col space-y-3 rounded-2xl shadow-lg"
            >
              <Calendar size={36} />
              <span className="text-base font-medium">Agendar Serviço</span>
            </Button>
            <Button 
              onClick={() => setCurrentScreen('social')}
              className="bg-purple hover:bg-purple-light text-white p-6 h-auto flex flex-col space-y-3 rounded-2xl shadow-lg"
            >
              <Sparkles size={36} />
              <span className="text-base font-medium">Feed Social</span>
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Button 
              onClick={() => setCurrentScreen('community')}
              className="bg-coral hover:bg-coral-light text-white p-6 h-auto flex flex-col space-y-3 rounded-2xl shadow-lg"
            >
              <Users size={36} />
              <span className="text-base font-medium">Comunidade</span>
            </Button>
            <Button 
              onClick={() => setCurrentScreen('history')}
              className="bg-gradient-to-br from-purple to-coral hover:opacity-90 text-white p-6 h-auto flex flex-col space-y-3 rounded-2xl shadow-lg"
            >
              <History size={36} />
              <span className="text-base font-medium">Meu Histórico</span>
            </Button>
          </div>
        </div>

        {/* Available Rewards */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Gift className="text-coral" size={24} />
              <span>Recompensas Disponíveis</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockRewards.filter(r => r.available).slice(0, 3).map((reward) => (
                <div key={reward.id} className="flex justify-between items-center p-4 bg-beige rounded-2xl">
                  <div>
                    <p className="font-medium text-lg">{reward.name}</p>
                    <p className="text-sm text-gray-600">{reward.points} pontos</p>
                  </div>
                  <Button 
                    size="sm" 
                    className="bg-coral hover:bg-coral-light text-white px-6 py-2"
                    disabled={mockUser.points < reward.points}
                  >
                    Resgatar
                  </Button>
                </div>
              ))}
              <Button 
                onClick={() => setCurrentScreen('rewards')}
                variant="outline" 
                className="w-full border-mint text-mint hover:bg-mint hover:text-white"
              >
                Ver Todas as Recompensas
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Todas as Funcionalidades */}
        <Card className="shadow-lg border-l-4 border-l-purple">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MessageSquareText className="text-purple" size={24} />
              <span>Todas as Funcionalidades</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <Button
                onClick={() => setCurrentScreen('chat')}
                variant="outline"
                className="flex items-center space-x-2 p-4 h-auto border-mint text-mint hover:bg-mint hover:text-white"
              >
                <MessageSquareText size={20} />
                <span className="text-sm">Chat</span>
              </Button>
              <Button
                onClick={() => setCurrentScreen('notifications')}
                variant="outline"
                className="flex items-center space-x-2 p-4 h-auto border-coral text-coral hover:bg-coral hover:text-white"
              >
                <Bell size={20} />
                <span className="text-sm">Notificações</span>
              </Button>
              <Button
                onClick={() => setCurrentScreen('community')}
                variant="outline"
                className="flex items-center space-x-2 p-4 h-auto border-purple text-purple hover:bg-purple hover:text-white"
              >
                <Users size={20} />
                <span className="text-sm">Comunidade</span>
              </Button>
              <Button
                onClick={() => setCurrentScreen('history')}
                variant="outline"
                className="flex items-center space-x-2 p-4 h-auto border-mint text-mint hover:bg-mint hover:text-white"
              >
                <History size={20} />
                <span className="text-sm">Histórico</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  )

  const BookingScreen = () => (
    <motion.div 
      className="min-h-screen bg-gray-soft pb-24"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="bg-mint p-6 pt-12 text-white rounded-b-3xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setCurrentScreen('dashboard')}
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
              <h1 className="text-2xl font-bold">Agendar Serviço</h1>
              <p className="opacity-90">Escolha seu serviço favorito</p>
            </div>
          </div>
          <button
            onClick={() => setCurrentScreen('salon')}
            className="text-white/80 hover:text-white p-2"
          >
            <MapPin size={24} />
          </button>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Selecione o Serviço</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {['Corte + Escova', 'Manicure', 'Pedicure', 'Hidratação', 'Coloração'].map((service) => (
                <button key={service} className="w-full p-4 text-left bg-beige hover:bg-mint hover:text-white rounded-2xl transition-all duration-300">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-lg">{service}</span>
                    <Star className="text-current" size={20} />
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Data e Horário</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-3">Escolha a data</h4>
                <div className="grid grid-cols-3 gap-3">
                  {['Hoje', 'Amanhã', '27/08'].map((date) => (
                    <button key={date} className="p-4 bg-beige hover:bg-mint hover:text-white rounded-2xl font-medium transition-all duration-300">
                      {date}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-3">Escolha o horário</h4>
                <div className="grid grid-cols-3 gap-3">
                  {['09:00', '14:00', '16:30'].map((time) => (
                    <button key={time} className="p-4 bg-beige hover:bg-mint hover:text-white rounded-2xl font-medium transition-all duration-300">
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Observações</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea 
              placeholder="Alguma preferência ou pedido especial?"
              className="w-full p-4 border border-gray-200 rounded-2xl resize-none h-24"
              rows={3}
            />
          </CardContent>
        </Card>

        <Button className="w-full h-14 bg-mint hover:bg-mint-light text-white text-lg font-medium rounded-2xl shadow-lg">
          Confirmar Agendamento
        </Button>
      </div>
    </motion.div>
  )

  const HistoryScreen = () => (
    <motion.div 
      className="min-h-screen bg-gray-soft pb-24"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="bg-gradient-to-r from-coral to-mint p-6 pt-12 text-white rounded-b-3xl">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setCurrentScreen('dashboard')}
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
            <h1 className="text-2xl font-bold">Histórico</h1>
            <p className="opacity-90">Seus pontos e recompensas</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="space-y-4">
          {mockHistory.map((item, index) => (
            <Card key={index} className="shadow-lg">
              <CardContent className="p-5">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-4">
                    <div className={`w-4 h-4 rounded-full ${
                      item.status === 'completed' ? 'bg-mint' : 'bg-coral'
                    }`}></div>
                    <div>
                      <p className="font-medium text-lg">{item.service}</p>
                      <p className="text-sm text-gray-600">{item.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-bold text-lg ${
                      item.points.startsWith('+') ? 'text-mint' : 'text-coral'
                    }`}>
                      {item.points}
                    </p>
                    <p className="text-xs text-gray-400">pontos</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </motion.div>
  )

  if (!isLoggedIn) {
    return <LoginScreen />
  }

  return (
    <div className="relative">
      {currentScreen === 'dashboard' && <DashboardScreen />}
      {currentScreen === 'shop' && <ShopScreen />}
      {currentScreen === 'product-detail' && <ClientProductDetailScreen />}
      {currentScreen === 'social' && <SocialScreen />}
      {currentScreen === 'community' && <CommunityScreen />}
      {currentScreen === 'salon' && <SalonScreen />}
      {currentScreen === 'chat' && <ChatScreen />}
      {currentScreen === 'rewards' && <RewardsScreen />}
      {currentScreen === 'booking' && <BookingScreen />}
      {currentScreen === 'notifications' && <SmartNotificationsScreen />}
      {currentScreen === 'history' && <HistoryScreen />}
      <BottomNav />
    </div>
  )
}