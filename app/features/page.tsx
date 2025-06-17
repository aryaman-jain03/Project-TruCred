"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Shield,
  TrendingUp,
  Users,
  FileCheck,
  Smartphone,
  CreditCard,
  Zap,
  Award,
  Download,
  Mail,
  Lock,
  Clock,
  ArrowRight,
} from "lucide-react"
import Link from "next/link"

const features = [
  {
    icon: Shield,
    title: "Alternative Credit Scoring",
    description: "Get scored based on your actual financial behavior, not just traditional credit history.",
    benefits: ["No credit history required", "Real behavior analysis", "Fair assessment for all"],
  },
  {
    icon: TrendingUp,
    title: "Instant Assessment",
    description: "Receive your trust score immediately with detailed breakdown and recommendations.",
    benefits: ["Real-time scoring", "Detailed breakdown", "Instant results"],
  },
  {
    icon: Users,
    title: "For Everyone",
    description: "Perfect for students, gig workers, and anyone without formal credit history.",
    benefits: ["Students welcome", "Freelancer friendly", "No discrimination"],
  },
  {
    icon: FileCheck,
    title: "Verified Reports",
    description: "Get official PDF reports that you can share with landlords, lenders, and employers.",
    benefits: ["Official documentation", "Shareable format", "Professional reports"],
  },
  {
    icon: Smartphone,
    title: "UPI Analysis",
    description: "Advanced analysis of your UPI transaction patterns to understand spending behavior.",
    benefits: ["Transaction analysis", "Spending patterns", "Financial stability"],
  },
  {
    icon: Lock,
    title: "Bank-Grade Security",
    description: "Your data is protected with enterprise-level security and encryption.",
    benefits: ["256-bit encryption", "Secure storage", "Privacy protected"],
  },
]

const scoringFactors = [
  {
    icon: CreditCard,
    title: "Recurring Payments",
    description: "Rent, EMI, and subscription payments",
    weight: "30%",
  },
  {
    icon: Smartphone,
    title: "Mobile Recharge",
    description: "Regular mobile recharge patterns",
    weight: "20%",
  },
  {
    icon: Zap,
    title: "Utility Bills",
    description: "Electricity, water, and gas payments",
    weight: "15%",
  },
  {
    icon: TrendingUp,
    title: "UPI Consistency",
    description: "Transaction patterns and spending habits",
    weight: "20%",
  },
  {
    icon: Users,
    title: "Reference Check",
    description: "Peer verification and feedback",
    weight: "15%",
  },
]

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-emerald-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Header */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative z-10 glass border-b border-white/20"
      >
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 gradient-fintech rounded-xl flex items-center justify-center shadow-lg">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-800">TruCred</h1>
                <p className="text-sm text-slate-600">Alternative Credit Scoring</p>
              </div>
            </Link>
            <Link href="/">
              <Button variant="ghost" className="text-slate-700 hover:text-blue-600 hover:bg-blue-50">
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </motion.header>

      <div className="container mx-auto px-4 py-16 relative z-10">
        {/* Hero Section */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-20">
          <Badge className="mb-6 glass-button text-blue-700 border-blue-200 hover:bg-blue-50">
            <Award className="w-4 h-4 mr-2" />
            Advanced Features
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-slate-800">Powerful Features</h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Discover how TruCred's innovative features make credit scoring accessible, accurate, and fair for everyone
            in India's diverse financial landscape.
          </p>
        </motion.div>

        {/* Main Features */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-slate-800">Core Features</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Everything you need for comprehensive financial assessment
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                >
                  <Card className="glass-card border-white/20 hover:border-blue-200 transition-all duration-300 h-full">
                    <CardHeader>
                      <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4 group-hover:gradient-fintech transition-all duration-300">
                        <Icon className="w-6 h-6 text-blue-600" />
                      </div>
                      <CardTitle className="text-slate-800 text-xl">{feature.title}</CardTitle>
                      <CardDescription className="text-slate-600">{feature.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {feature.benefits.map((benefit, i) => (
                          <li key={i} className="text-slate-700 flex items-center">
                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3"></div>
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </motion.section>

        {/* Scoring Factors */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-slate-800">How We Calculate Your Score</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Our algorithm considers multiple factors to create a comprehensive financial profile
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {scoringFactors.map((factor, index) => {
              const Icon = factor.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Card className="glass-card border-white/20 hover:border-emerald-200 transition-all duration-300 text-center">
                    <CardHeader>
                      <div className="w-16 h-16 gradient-fintech rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <Badge className="glass-button text-blue-700 border-blue-200 mx-auto mb-2">{factor.weight}</Badge>
                      <CardTitle className="text-slate-800 text-lg">{factor.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-slate-600">{factor.description}</CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </motion.section>

        {/* Benefits Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <Card className="glass-card border-white/20">
            <CardContent className="py-16">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-6 text-slate-800">Why Choose TruCred?</h2>
                <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                  Experience the benefits of modern credit scoring
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  { icon: Clock, title: "Instant Results", description: "Get your score in minutes, not days" },
                  { icon: Download, title: "PDF Reports", description: "Professional reports you can share" },
                  { icon: Mail, title: "Email Delivery", description: "Send reports directly to recipients" },
                  { icon: Lock, title: "Secure & Private", description: "Your data is always protected" },
                ].map((benefit, index) => {
                  const Icon = benefit.icon
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="text-center"
                    >
                      <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Icon className="w-8 h-8 text-blue-600" />
                      </div>
                      <h3 className="text-slate-800 font-semibold text-lg mb-2">{benefit.title}</h3>
                      <p className="text-slate-600">{benefit.description}</p>
                    </motion.div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Card className="glass-card border-white/20">
            <CardContent className="py-16">
              <h2 className="text-4xl font-bold mb-6 text-slate-800">Ready to Experience TruCred?</h2>
              <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
                Start your financial assessment today and discover your true creditworthiness
              </p>
              <Link href="/assessment">
                <Button
                  size="lg"
                  className="gradient-fintech text-white hover:opacity-90 text-lg px-8 py-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                >
                  Start Your Assessment
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </motion.section>
      </div>
    </div>
  )
}
