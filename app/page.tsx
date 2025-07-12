"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, TrendingUp, Users, FileCheck, ArrowRight, Star, CreditCard, Award, ChevronRight } from "lucide-react"
import Link from "next/link"

const features = [
  {
    icon: Shield,
    title: "Alternative Credit Scoring",
    description: "Get scored based on your actual financial behavior, not just traditional credit history.",
  },
  {
    icon: TrendingUp,
    title: "Instant Assessment",
    description: "Receive your trust score immediately with detailed breakdown and recommendations.",
  },
  {
    icon: Users,
    title: "For Everyone",
    description: "Perfect for students, gig workers, and anyone without formal credit history.",
  },
  {
    icon: FileCheck,
    title: "Verified Reports",
    description: "Get official PDF reports that you can share with landlords, lenders, and employers.",
  },
]

const stats = [
  { number: "50K+", label: "Users Scored" },
  { number: "95%", label: "Approval Rate" },
  { number: "24/7", label: "Instant Results" },
  { number: "100%", label: "Secure & Private" },
]

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Student",
    content: "TruCred helped me get my first apartment rental without any credit history. The process was so simple!",
    rating: 5,
  },
  {
    name: "Rahul Kumar",
    role: "Freelancer",
    content: "As a gig worker, traditional banks never understood my income. TruCred gave me the score I deserved.",
    rating: 5,
  },
  {
    name: "Anita Patel",
    role: "Small Business Owner",
    content: "The detailed report helped me secure a business loan. TruCred sees the real financial picture.",
    rating: 5,
  },
]
//
export default function LandingPage() {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-neutral-gradient">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-emerald-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-3/4 left-3/4 w-64 h-64 bg-violet-400/20 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Header */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative z-10 glass border-b border-white/20"
      >
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 gradient-fintech rounded-xl flex items-center justify-center shadow-lg">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-800">TruCred</h1>
                <p className="text-sm text-slate-600">Alternative Credit Scoring</p>
              </div>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/features">
                <Button variant="ghost" className="text-slate-700 hover:text-blue-600 hover:bg-blue-50">
                  Features
                </Button>
              </Link>
              <Link href="/how-it-works">
                <Button variant="ghost" className="text-slate-700 hover:text-blue-600 hover:bg-blue-50">
                  How it Works
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="ghost" className="text-slate-700 hover:text-blue-600 hover:bg-blue-50">
                  About
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="ghost" className="text-slate-700 hover:text-blue-600 hover:bg-blue-50">
                  Contact
                </Button>
              </Link>
              <Link href="/admin">
                <Button className="bg-white/90 border border-slate-300 text-slate-800 hover:bg-slate-100 hover:text-slate-900 shadow-sm">
                  Admin
                </Button>
              </Link>
              <Link href="/assessment">
                <Button className="gradient-fintech text-white hover:opacity-90 shadow-lg hover:shadow-xl transition-all duration-300">
                  Get Started
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </nav>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="relative z-10 pt-20 pb-32">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <Badge className="mb-6 glass-button text-blue-700 border-blue-200 hover:bg-blue-50">
              <Star className="w-4 h-4 mr-2" />
              Trusted by 50,000+ Indians
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="text-slate-800">Credit Scoring</span>
              <br />
              <span className="text-gradient">For Everyone</span>
            </h1>
            <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              Get your financial trust score based on real behavior, not just credit history. Perfect for students,
              freelancers, and India's unscored population.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/assessment">
                <Button
                  size="lg"
                  className="gradient-fintech text-white hover:opacity-90 text-lg px-8 py-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                >
                  Start Assessment
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Hero Stats */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20"
          >
            {stats.map((stat, index) => (
              <motion.div key={index} whileHover={{ scale: 1.05 }} className="glass-card rounded-2xl p-6 text-center">
                <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">{stat.number}</div>
                <div className="text-slate-600">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-20" id="features">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-800">Why Choose TruCred?</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              We understand that your financial story is more than just a credit score
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  onHoverStart={() => setHoveredFeature(index)}
                  onHoverEnd={() => setHoveredFeature(null)}
                  whileHover={{ y: -8 }}
                >
                  <Card className="glass-card border-white/20 hover:border-blue-200 transition-all duration-300 h-full">
                    <CardHeader>
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 ${
                          hoveredFeature === index
                            ? "gradient-fintech text-white shadow-lg"
                            : "bg-blue-100 text-blue-600"
                        }`}
                      >
                        <Icon className="w-6 h-6" />
                      </div>
                      <CardTitle className="text-slate-800 text-xl">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-slate-600 text-base">{feature.description}</CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="relative z-10 py-20 bg-white/30" id="how-it-works">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-800">How It Works</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">Get your trust score in just 4 simple steps</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: Users, title: "Personal Info", description: "Share basic details about yourself" },
              { icon: CreditCard, title: "Financial Data", description: "Tell us about your spending habits" },
              { icon: FileCheck, title: "Upload Docs", description: "Provide proof of your financial behavior" },
              { icon: Award, title: "Get Score", description: "Receive your verified trust score instantly" },
            ].map((step, index) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="text-center relative"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="w-16 h-16 gradient-fintech rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-4">{step.title}</h3>
                  <p className="text-slate-600">{step.description}</p>
                  {index < 3 && (
                    <ChevronRight className="w-6 h-6 text-blue-400 absolute top-8 -right-3 hidden md:block" />
                  )}
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative z-10 py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-800">What Our Users Say</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Real stories from people who got their financial recognition
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
              >
                <Card className="glass-card border-white/20 hover:border-emerald-200 transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center space-x-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-blue-400 fill-current" />
                      ))}
                    </div>
                    <CardDescription className="text-slate-700 text-base italic">
                      "{testimonial.content}"
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div>
                      <div className="font-semibold text-slate-800">{testimonial.name}</div>
                      <div className="text-slate-600 text-sm">{testimonial.role}</div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-20 bg-white/30">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="glass-card rounded-3xl p-12 max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-800">Ready to Get Your Trust Score?</h2>
              <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
                Join thousands of Indians who have already discovered their financial potential
              </p>
              <Link href="/assessment">
                <Button
                  size="lg"
                  className="gradient-fintech text-white hover:opacity-90 text-lg px-12 py-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                >
                  Start Your Assessment
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 glass border-t border-white/20">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 gradient-fintech rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-slate-800">TruCred</span>
              </div>
              <p className="text-slate-600 mb-4">
                Empowering India's unscored population with alternative credit scoring.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-800 mb-4">Product</h3>
              <ul className="space-y-2 text-slate-600">
                <li>
                  <Link href="/features" className="hover:text-blue-600 transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="/how-it-works" className="hover:text-blue-600 transition-colors">
                    How it Works
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="hover:text-blue-600 transition-colors">
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-slate-800 mb-4">Company</h3>
              <ul className="space-y-2 text-slate-600">
                <li>
                  <Link href="/about" className="hover:text-blue-600 transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-blue-600 transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-blue-600 transition-colors">
                    Privacy
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-slate-800 mb-4">Support</h3>
              <ul className="space-y-2 text-slate-600">
                <li>
                  <Link href="/help" className="hover:text-blue-600 transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/docs" className="hover:text-blue-600 transition-colors">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="/status" className="hover:text-blue-600 transition-colors"> 
                    Status
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/20 mt-8 pt-8 text-center text-slate-600">
            <p>&copy; 2025 TruCred. Created by Aryaman Jain. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
