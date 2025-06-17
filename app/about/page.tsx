"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Users, Target, Award, ArrowRight, Linkedin, Twitter, Mail } from "lucide-react"
import Link from "next/link"

const team = [
  {
    name: "Aryaman Jain",
    role: "Co-Founder & CEO",
    description: "Passionate about financial inclusion and alternative credit scoring for India's unbanked population.",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    name: "Imroz Saim Kamboj",
    role: "Co-Founder & CTO",
    description: "Expert in fintech solutions and building scalable platforms for financial assessment.",
    image: "/placeholder.svg?height=200&width=200",
  },
]

const values = [
  {
    icon: Shield,
    title: "Trust & Security",
    description: "We prioritize the security and privacy of your financial data with bank-grade encryption.",
  },
  {
    icon: Users,
    title: "Financial Inclusion",
    description: "Making credit scoring accessible to everyone, regardless of traditional credit history.",
  },
  {
    icon: Target,
    title: "Accuracy",
    description: "Our algorithms provide precise assessments based on real financial behavior patterns.",
  },
  {
    icon: Award,
    title: "Innovation",
    description: "Continuously improving our platform with cutting-edge technology and user feedback.",
  },
]

export default function AboutPage() {
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
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-slate-800">About TruCred</h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            We're on a mission to democratize credit scoring in India by providing alternative assessment methods that
            recognize the financial behavior of students, freelancers, and the unbanked population.
          </p>
        </motion.div>

        {/* Mission Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <Card className="glass-card border-white/20">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl text-slate-800 mb-4">Our Mission</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-lg text-slate-700 max-w-4xl mx-auto leading-relaxed">
                Traditional credit scoring systems in India leave millions of financially responsible individuals
                without access to credit. TruCred bridges this gap by analyzing real financial behavior patterns,
                including UPI transactions, utility payments, and peer references, to create a comprehensive trust score
                that reflects true creditworthiness.
              </p>
            </CardContent>
          </Card>
        </motion.section>

        {/* Values Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-slate-800">Our Values</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              The principles that guide everything we do at TruCred
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon
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
                      <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                        <Icon className="w-6 h-6 text-blue-600" />
                      </div>
                      <CardTitle className="text-slate-800 text-xl">{value.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-slate-600">{value.description}</CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </motion.section>

        {/* Team Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-slate-800">Meet Our Team</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              The passionate individuals behind TruCred's mission
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ y: -8 }}
              >
                <Card className="glass-card border-white/20 hover:border-emerald-200 transition-all duration-300">
                  <CardHeader className="text-center">
                    <div className="w-32 h-32 bg-blue-100 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                      <Users className="w-16 h-16 text-blue-600" />
                    </div>
                    <CardTitle className="text-slate-800 text-2xl">{member.name}</CardTitle>
                    <CardDescription className="text-slate-600 text-lg">{member.role}</CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-slate-700 mb-6">{member.description}</p>
                    <div className="flex justify-center space-x-4">
                      <Button variant="ghost" size="sm" className="text-slate-700 hover:text-blue-600 hover:bg-blue-50">
                        <Linkedin className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-slate-700 hover:text-blue-600 hover:bg-blue-50">
                        <Twitter className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-slate-700 hover:text-blue-600 hover:bg-blue-50">
                        <Mail className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
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
              <h2 className="text-4xl font-bold mb-6 text-slate-800">Ready to Get Started?</h2>
              <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
                Join thousands of Indians who have already discovered their financial potential with TruCred
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
