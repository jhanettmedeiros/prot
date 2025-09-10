'use client'

import { useState } from 'react'
import { motion } from 'motion/react'
import { Button } from './components/ui/button'
import { ClientApp } from './components/ClientApp'
import { SalonApp } from './components/SalonApp'
import conlaceLogo from 'figma:asset/8305e79e0ee519de65fc150d46efbeb4caf7abb2.png'

export default function App() {
  const [userType, setUserType] = useState<'client' | 'salon' | null>(null)

  if (userType === 'client') {
    return <ClientApp onBack={() => setUserType(null)} />
  }

  if (userType === 'salon') {
    return <SalonApp onBack={() => setUserType(null)} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-beige via-white to-gray-soft">
      <div className="min-h-screen flex flex-col">
        {/* Top Section with Logo */}
        <motion.div 
          className="flex-1 flex flex-col items-center justify-center px-6 py-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Logo */}
          <motion.div 
            className="text-center mb-8"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <img 
              src={conlaceLogo} 
              alt="ConLace" 
              className="w-24 h-24 mx-auto mb-6"
            />
            <h1 className="text-4xl font-bold text-black mb-3">
              ConLace
            </h1>
            <p className="text-lg text-gray-600 px-4 leading-relaxed">
              O aplicativo de fidelização que conecta você ao seu salão favorito
            </p>
          </motion.div>

          {/* Features Pills */}
          <motion.div 
            className="flex flex-wrap justify-center gap-3 mb-8 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <div className="flex items-center space-x-2 bg-white/80 backdrop-blur rounded-full px-4 py-2 shadow-sm">
              <div className="w-2 h-2 bg-mint rounded-full"></div>
              <span className="text-sm text-gray-700">Sistema de Pontos</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/80 backdrop-blur rounded-full px-4 py-2 shadow-sm">
              <div className="w-2 h-2 bg-coral rounded-full"></div>
              <span className="text-sm text-gray-700">Agendamento Fácil</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/80 backdrop-blur rounded-full px-4 py-2 shadow-sm">
              <div className="w-2 h-2 bg-purple rounded-full"></div>
              <span className="text-sm text-gray-700">Recompensas</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Section with User Type Selection */}
        <div className="px-6 pb-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="space-y-4"
          >
            {/* Client Button */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-coral to-coral-light rounded-2xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-gray-800 mb-1">Sou Cliente</h2>
                  <p className="text-gray-600 text-sm mb-4">
                    Acumule pontos e aproveite recompensas exclusivas
                  </p>
                  <Button 
                    onClick={() => setUserType('client')}
                    className="w-full bg-coral hover:bg-coral-light text-white py-3 rounded-xl transition-all duration-300"
                  >
                    Entrar como Cliente
                  </Button>
                </div>
              </div>
            </div>

            {/* Salon Button */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-purple to-purple-light rounded-2xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm2 6a2 2 0 104 0 2 2 0 00-4 0zm8 0a2 2 0 11-4 0 2 2 0 014 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-gray-800 mb-1">Tenho um Salão</h2>
                  <p className="text-gray-600 text-sm mb-4">
                    Gerencie clientes e configure recompensas
                  </p>
                  <Button 
                    onClick={() => setUserType('salon')}
                    className="w-full bg-purple hover:bg-purple-light text-white py-3 rounded-xl transition-all duration-300"
                  >
                    Entrar como Salão
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}