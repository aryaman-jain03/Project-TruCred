"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Shield,
  User,
  CreditCard,
  FileText,
  Users,
  TrendingUp,
  ArrowRight,
  CheckCircle,
  Clock,
  Award,
  Download,
} from "lucide-react"
import Link from "next/link"

const steps = [
  {
    step: 1,
    icon: User,
    title: "Personal Information",
    description: "Share your basic details including name, email, and phone number.",
    details: ["Quick registration process", "Secure data handling", "No lengthy paperwork"],
    time: "2 minutes",
  },
  {
    step: 2,
    icon: CreditCard,
    title: "Financial Data",
    description: "Tell us about your financial behavior and spending patterns.",
    details: ["Rent and EMI payment history", "Mobile recharge patterns", "Utility bill payments"],
    time: "3 minutes",
  },
  {
    step: 3,
    icon: FileText,
    title: "Document Upload",
    description: "Upload supporting documents to verify your financial behavior.",
    details: ["Rent/EMI payment proofs", "UPI transaction history", "Utility bill documents"],
    time: "5 minutes",
  },
  {
    step: 4,
    icon: Users,
    title: "Reference Check",
    description: "Provide a reference who can vouch for your financial responsibility.",
    details: ["Friend, family, or colleague", "Simple verification process", "Builds trust and credibility"],
    time: "2 minutes",
  },
  {
    step: 5,
    icon: TrendingUp,
    title: "Get Your Score",
    description: "Receive your comprehensive trust score with detailed breakdown.",
    details: ["Instant score calculation", "Detailed component breakdown", "Improvement recommendations"],
    time: "Instant",
  },
]

const benefits = [
  {
    icon: Clock,
    title: "Quick Process",
    description: "Complete assessment in under 15 minutes",
  },
  {
    icon: Award,
    title: "Fair Scoring",
    description: "Based on real financial behavior, not just credit history",
  },
  {
    icon: Download,
    title: "Instant Reports",
    description: "Download and share professional PDF reports immediately",
  },
  {
    icon: CheckCircle,
    title: "Verified Results",
    description: "Admin-verified documents ensure accuracy and trust",
  },
]

export default function HowItWorksPage() {
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
            <TrendingUp className="w-4 h-4 mr-2" />
            Simple Process
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-slate-800">How TruCred Works</h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Get your financial trust score in 5 simple steps. Our streamlined process takes less than 15 minutes and
            provides instant results with detailed insights.
          </p>
        </motion.div>

        {/* Steps Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="space-y-12">
            {steps.map((step, index) => {
              const Icon = step.icon
              const isEven = index % 2 === 0

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex flex-col lg:flex-row items-center gap-12 ${
                    isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                  }`}
                >
                  {/* Content */}
                  <div className="flex-1">
                    <Card className="glass-card border-white/20 hover:border-blue-200 transition-all duration-300">
                      <CardHeader>
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-12 h-12 gradient-fintech rounded-2xl flex items-center justify-center shadow-lg">
                            <span className="text-white font-bold text-lg">{step.step}</span>
                          </div>
                          <Badge className="glass-button text-blue-700 border-blue-200">
                            <Clock className="w-3 h-3 mr-1" />
                            {step.time}
                          </Badge>
                        </div>
                        <CardTitle className="text-slate-800 text-2xl">{step.title}</CardTitle>
                        <CardDescription className="text-slate-600 text-lg">{step.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-3">
                          {step.details.map((detail, i) => (
                            <li key={i} className="text-slate-700 flex items-center">
                              <CheckCircle className="w-4 h-4 text-emerald-500 mr-3 flex-shrink-0" />
                              {detail}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Icon */}
                  <div className="flex-shrink-0">
                    <div className="w-24 h-24 gradient-fintech rounded-2xl flex items-center justify-center shadow-xl">
                      <Icon className="w-12 h-12 text-white" />
                    </div>
                  </div>
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
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-slate-800">Why Our Process Works</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Our streamlined approach ensures accuracy, speed, and fairness in credit assessment
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                >
                  <Card className="glass-card border-white/20 hover:border-emerald-200 transition-all duration-300 text-center h-full">
                    <CardHeader>
                      <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Icon className="w-8 h-8 text-blue-600" />
                      </div>
                      <CardTitle className="text-slate-800 text-xl">{benefit.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-slate-600">{benefit.description}</CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </motion.section>

        {/* Timeline Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <Card className="glass-card border-white/20">
            <CardContent className="py-16">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-6 text-slate-800">Complete Process Timeline</h2>
                <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                  From start to finish, here's what you can expect
                </p>
              </div>

              <div className="max-w-4xl mx-auto">
                <div className="relative">
                  {/* Timeline line */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-blue-200"></div>

                  <div className="space-y-12">
                    {[
                      { time: "0-2 min", title: "Registration", description: "Quick account setup" },
                      { time: "2-5 min", title: "Data Entry", description: "Share financial information" },
                      { time: "5-10 min", title: "Document Upload", description: "Upload supporting files" },
                      { time: "10-12 min", title: "Reference", description: "Add reference details" },
                      { time: "12-15 min", title: "Review", description: "Final review and submission" },
                      { time: "Instant", title: "Results", description: "Get your trust score" },
                    ].map((item, index) => (
                      <div key={index} className="relative flex items-center">
                        <div className="flex-1 text-right pr-8">
                          {index % 2 === 0 && (
                            <>
                              <h3 className="text-slate-800 font-semibold text-lg">{item.title}</h3>
                              <p className="text-slate-600">{item.description}</p>
                              <Badge className="glass-button text-blue-700 border-blue-200 mt-2">{item.time}</Badge>
                            </>
                          )}
                        </div>
                        <div className="w-4 h-4 gradient-fintech rounded-full relative z-10 shadow-lg"></div>
                        <div className="flex-1 text-left pl-8">
                          {index % 2 === 1 && (
                            <>
                              <h3 className="text-slate-800 font-semibold text-lg">{item.title}</h3>
                              <p className="text-slate-600">{item.description}</p>
                              <Badge className="glass-button text-blue-700 border-blue-200 mt-2">{item.time}</Badge>
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
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
              <h2 className="text-4xl font-bold mb-6 text-slate-800">Ready to Start?</h2>
              <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
                Begin your financial assessment journey today and discover your true creditworthiness in just 15 minutes
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
