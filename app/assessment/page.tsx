"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import {
  CreditCard,
  User,
  FileText,
  Smartphone,
  Zap,
  Upload,
  Users,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Download,
  Mail,
  Shield,
  TrendingUp,
  Star,
  Home,
  Loader2,
  Copy,
  Share,
} from "lucide-react"
import Link from "next/link"
import React from "react"

interface FormData {
  name: string
  email: string
  phone: string
  rentMonths: number[]
  mobileRecharge: string
  utilityBill: string
  referenceName: string
  referenceRelationship: string
  referenceFeedback: string
}

interface FileUploads {
  rentProof: File | null
  mobileProof: File | null
  utilityProof: File | null
  upiCsv: File | null
}

const steps = [
  { id: 1, title: "Personal Info", icon: User },
  { id: 2, title: "Financial Data", icon: CreditCard },
  { id: 3, title: "Documents", icon: FileText },
  { id: 4, title: "References", icon: Users },
  { id: 5, title: "Results", icon: TrendingUp },
]

export default function AssessmentPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    rentMonths: [6],
    mobileRecharge: "",
    utilityBill: "",
    referenceName: "",
    referenceRelationship: "",
    referenceFeedback: "",
  })
  const [files, setFiles] = useState<FileUploads>({
    rentProof: null,
    mobileProof: null,
    utilityProof: null,
    upiCsv: null,
  })
  const [score, setScore] = useState<any>(null)
  const [upiAnalysis, setUpiAnalysis] = useState<any>(null)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [assessmentId, setAssessmentId] = useState<string>("")
  const [emailInput, setEmailInput] = useState("")
  const { toast } = useToast()
  const [verificationStatus, setVerificationStatus] = useState<"pending" | "verified" | "rejected">("pending")
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})

  const handleFileUpload = (key: keyof FileUploads, file: File) => {
    setFiles((prev) => ({ ...prev, [key]: file }))
    toast({
      title: "File uploaded",
      description: `${file.name} has been uploaded successfully.`,
    })
  }

  const analyzeUpiFile = async (file: File) => {
    const formData = new FormData()
    formData.append("upiCsv", file)

    try {
      const response = await fetch("/api/parse-upi", {
        method: "POST",
        body: formData,
      })
      const data = await response.json()
      if (data.success) {
        setUpiAnalysis(data.analysis)
        toast({
          title: "UPI Analysis Complete",
          description: `Analyzed ${data.analysis.totalTransactions} transactions.`,
        })
      }
    } catch (error) {
      console.error("UPI analysis failed:", error)
    }
  }

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {}

    if (step === 1) {
      if (!formData.name.trim()) newErrors.name = "Name is required"
      if (!formData.email.trim()) newErrors.email = "Email is required"
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Valid email is required"
      if (!formData.phone.trim()) newErrors.phone = "Phone number is required"
    }

    if (step === 2) {
      if (!formData.mobileRecharge) newErrors.mobileRecharge = "Please select an option"
      if (!formData.utilityBill) newErrors.utilityBill = "Please select an option"
    }

    if (step === 3) {
      if (!files.rentProof) newErrors.rentProof = "Rent/EMI proof is required"
      if (formData.mobileRecharge === "yes" && !files.mobileProof)
        newErrors.mobileProof = "Mobile recharge proof is required"
      if (formData.utilityBill === "yes" && !files.utilityProof)
        newErrors.utilityProof = "Utility bill proof is required"
    }

    if (step === 4) {
      if (!formData.referenceName.trim()) newErrors.referenceName = "Reference name is required"
      if (!formData.referenceRelationship.trim()) newErrors.referenceRelationship = "Relationship is required"
      if (!formData.referenceFeedback) newErrors.referenceFeedback = "Please select an option"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    // Mark all fields in the current step as touched
    const currentTouched: Record<string, boolean> = {}
    if (currentStep === 1) {
      currentTouched.name = true
      currentTouched.email = true
      currentTouched.phone = true
    } else if (currentStep === 2) {
      currentTouched.mobileRecharge = true
      currentTouched.utilityBill = true
    } else if (currentStep === 3) {
      currentTouched.rentProof = true
      if (formData.mobileRecharge === "yes") currentTouched.mobileProof = true
      if (formData.utilityBill === "yes") currentTouched.utilityProof = true
    } else if (currentStep === 4) {
      currentTouched.referenceName = true
      currentTouched.referenceRelationship = true
      currentTouched.referenceFeedback = true
    }

    setTouched({ ...touched, ...currentTouched })

    if (validateStep(currentStep)) {
      if (currentStep < 5) {
        setCurrentStep(currentStep + 1)
      }
    }
  }

  const handleSubmit = async () => {
    // Mark all fields in step 4 as touched
    const currentTouched: Record<string, boolean> = {
      referenceName: true,
      referenceRelationship: true,
      referenceFeedback: true,
    }

    setTouched({ ...touched, ...currentTouched })

    if (!validateStep(4)) {
      return
    }

    setLoading(true)

    try {
      // First, submit the assessment
      const formDataToSubmit = new FormData()

      // Add form fields
      Object.entries(formData).forEach(([key, value]) => {
        if (key === "rentMonths") {
          formDataToSubmit.append(key, value[0].toString())
        } else {
          formDataToSubmit.append(key, value.toString())
        }
      })

      // Add files
      Object.entries(files).forEach(([key, file]) => {
        if (file) {
          formDataToSubmit.append(key, file)
        }
      })

      const submitResponse = await fetch("/api/submit-assessment", {
        method: "POST",
        body: formDataToSubmit,
      })

      const submitData = await submitResponse.json()

      if (submitData.success) {
        setAssessmentId(submitData.assessmentId)
        setVerificationStatus("pending")
        setIsSubmitted(true)
        setCurrentStep(5)

        toast({
          title: "Assessment Submitted",
          description: "Your assessment has been submitted for verification.",
        })
      } else {
        throw new Error(submitData.message)
      }
    } catch (error) {
      console.error("Submission failed:", error)
      toast({
        title: "Submission Failed",
        description: "Please try again or contact support.",
        variant: "destructive",
      })
    }

    setLoading(false)
  }

  const downloadPDF = async () => {
    if (!score) return

    setLoading(true)
    try {
      const response = await fetch("/api/generate-pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          assessmentData: { ...formData, score: score.total, grade: score.grade },
          scoreData: score,
          upiAnalysis,
        }),
      })

      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = "trucred-financial-report.pdf"
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)

        toast({
          title: "PDF Downloaded",
          description: "Your financial report has been downloaded.",
        })
      }
    } catch (error) {
      console.error("PDF download failed:", error)
      toast({
        title: "Download Failed",
        description: "Please try again.",
        variant: "destructive",
      })
    }
    setLoading(false)
  }

  const sendEmail = async (recipientEmail: string) => {
    if (!score) return

    setLoading(true)
    try {
      // First generate PDF
      const pdfResponse = await fetch("/api/generate-pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          assessmentData: { ...formData, score: score.total, grade: score.grade },
          scoreData: score,
          upiAnalysis,
        }),
      })

      if (pdfResponse.ok) {
        const pdfBuffer = await pdfResponse.arrayBuffer()
        const base64Pdf = Buffer.from(pdfBuffer).toString("base64")

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(recipientEmail)) {
          throw new Error("Invalid email format")
        }

        // Send email with PDF
        const emailResponse = await fetch("/api/send-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            to: recipientEmail,
            subject: "Your TruCred Financial Report",
            pdfBuffer: base64Pdf,
            assessmentData: { ...formData, score: score.total, grade: score.grade },
          }),
        })

        if (!emailResponse.ok) {
          const errorData = await emailResponse.json()
          throw new Error(errorData.message || "Failed to send email")
        }

        const emailData = await emailResponse.json()
        if (emailData.success) {
          toast({
            title: "Email Sent Successfully",
            description: `Report sent to ${recipientEmail}. Check your inbox!`,
          })
          setEmailInput("")
        }
      }
    } catch (error) {
      console.error("Email sending failed:", error)
      toast({
        title: "Email Failed",
        description: error instanceof Error ? error.message : "Please try downloading the PDF instead.",
        variant: "destructive",
      })
    }
    setLoading(false)
  }

  const copyReportLink = () => {
    const reportData = {
      name: formData.name,
      score: score.total,
      grade: score.grade,
      assessmentId: assessmentId,
    }
    const reportUrl = `${window.location.origin}/report/${assessmentId}`
    navigator.clipboard.writeText(reportUrl)
    toast({
      title: "Link Copied",
      description: "Report link copied to clipboard",
    })
  }

  const shareReport = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "TruCred Financial Report",
          text: `Check out my TruCred financial score: ${score.total}/100 (Grade ${score.grade})`,
          url: `${window.location.origin}/report/${assessmentId}`,
        })
      } catch (error) {
        console.log("Error sharing:", error)
      }
    } else {
      copyReportLink()
    }
  }

  const getGrade = (score: number) => {
    if (score >= 85) return { grade: "A+", color: "text-emerald-600", bg: "bg-emerald-50" }
    if (score >= 75) return { grade: "A", color: "text-emerald-600", bg: "bg-emerald-50" }
    if (score >= 65) return { grade: "B+", color: "text-blue-600", bg: "bg-blue-50" }
    if (score >= 55) return { grade: "B", color: "text-blue-600", bg: "bg-blue-50" }
    if (score >= 45) return { grade: "C+", color: "text-amber-600", bg: "bg-amber-50" }
    if (score >= 35) return { grade: "C", color: "text-amber-600", bg: "bg-amber-50" }
    return { grade: "D", color: "text-red-600", bg: "bg-red-50" }
  }

  const progress = ((currentStep - 1) / (steps.length - 1)) * 100

  const checkVerificationStatus = async () => {
    if (!assessmentId) return

    setLoading(true)
    try {
      const response = await fetch(`/api/check-status?id=${assessmentId}`)
      const data = await response.json()

      if (data.success) {
        setVerificationStatus(data.status)

        // If verified, calculate score if not already done
        if (data.status === "verified" && !score) {
          const scoreData = {
            ...formData,
            rentMonths: formData.rentMonths[0],
            upiConsistency: upiAnalysis?.consistentSpending || false,
          }

          const scoreResponse = await fetch("/api/calculate-score", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(scoreData),
          })

          const scoreResult = await scoreResponse.json()
          if (scoreResult.success) {
            setScore(scoreResult.score)
          }
        }
      }
    } catch (error) {
      console.error("Status check failed:", error)
      toast({
        title: "Status Check Failed",
        description: "Could not retrieve verification status",
        variant: "destructive",
      })
    }
    setLoading(false)
  }

  React.useEffect(() => {
    if (assessmentId && verificationStatus === "pending") {
      checkVerificationStatus()
    }
  }, [assessmentId])

  const handleBlur = (field: string) => {
    setTouched({ ...touched, [field]: true })
    validateStep(currentStep)
  }

  const RequiredStar = () => <span className="text-red-500 ml-1">*</span>

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

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
                <Home className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </motion.header>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Progress Bar */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => {
              const Icon = step.icon
              const isActive = currentStep === step.id
              const isCompleted = currentStep > step.id

              return (
                <div key={step.id} className="flex items-center">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className={`w-12 h-12 rounded-xl flex items-center justify-center border-2 transition-all duration-300 ${
                      isActive
                        ? "gradient-fintech border-blue-500 text-white shadow-lg"
                        : isCompleted
                          ? "bg-emerald-500 border-emerald-500 text-white"
                          : "bg-white/50 border-slate-300 text-slate-500"
                    }`}
                  >
                    {isCompleted ? <CheckCircle className="w-6 h-6" /> : <Icon className="w-6 h-6" />}
                  </motion.div>
                  <div className="ml-3 hidden md:block">
                    <p className={`text-sm font-medium ${isActive ? "text-slate-800" : "text-slate-600"}`}>
                      {step.title}
                    </p>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-16 h-0.5 mx-4 ${isCompleted ? "bg-emerald-400" : "bg-slate-300"}`} />
                  )}
                </div>
              )
            })}
          </div>
          <Progress value={progress} className="h-2 bg-slate-200" />
        </motion.div>

        {/* Form Steps */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="glass-card border-white/20 shadow-xl">
              <CardHeader>
                <CardTitle className="text-slate-800 text-2xl">
                  {currentStep === 1 && "Personal Information"}
                  {currentStep === 2 && "Financial Details"}
                  {currentStep === 3 && "Document Upload"}
                  {currentStep === 4 && "Reference Check"}
                  {currentStep === 5 && "Your Trust Score"}
                </CardTitle>
                <CardDescription className="text-slate-600">
                  {currentStep === 1 && "Tell us about yourself"}
                  {currentStep === 2 && "Share your financial behavior"}
                  {currentStep === 3 && "Upload supporting documents"}
                  {currentStep === 4 && "Provide a reference"}
                  {currentStep === 5 && "Your credit assessment is complete"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Step 1: Personal Info */}
                {currentStep === 1 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name" className="text-slate-700">
                          Full Name
                          <RequiredStar />
                        </Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          onBlur={() => handleBlur("name")}
                          className={`bg-white/50 border-white/30 text-slate-800 placeholder:text-slate-500 ${
                            touched.name && errors.name ? "border-red-500" : ""
                          }`}
                          placeholder="Enter your full name"
                        />
                        {touched.name && errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                      </div>
                      <div>
                        <Label htmlFor="email" className="text-slate-700">
                          Email Address
                          <RequiredStar />
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          onBlur={() => handleBlur("email")}
                          className={`bg-white/50 border-white/30 text-slate-800 placeholder:text-slate-500 ${
                            touched.email && errors.email ? "border-red-500" : ""
                          }`}
                          placeholder="Enter your email"
                        />
                        {touched.email && errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="phone" className="text-slate-700">
                        Phone Number
                        <RequiredStar />
                      </Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        onBlur={() => handleBlur("phone")}
                        className={`bg-white/50 border-white/30 text-slate-800 placeholder:text-slate-500 ${
                          touched.phone && errors.phone ? "border-red-500" : ""
                        }`}
                        placeholder="Enter your phone number"
                      />
                      {touched.phone && errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Financial Data */}
                {currentStep === 2 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                    <div className="space-y-4">
                      <Label className="text-slate-800 text-lg">Recurring Payments</Label>
                      <p className="text-slate-600 text-sm">How many months have you made timely rent/EMI payments?</p>
                      <div className="px-4">
                        <Slider
                          value={formData.rentMonths}
                          onValueChange={(value) => setFormData({ ...formData, rentMonths: value })}
                          max={12}
                          min={0}
                          step={1}
                          className="w-full"
                        />
                        <div className="flex justify-between text-sm text-slate-600 mt-2">
                          <span>0 months</span>
                          <span className="text-slate-800 font-medium">{formData.rentMonths[0]} months</span>
                          <span>12 months</span>
                        </div>
                      </div>
                    </div>

                    <Separator className="bg-slate-200" />

                    <div className="space-y-4">
                      <Label className="text-slate-800 text-lg flex items-center gap-2">
                        <Smartphone className="w-5 h-5" />
                        Mobile Recharge
                        <RequiredStar />
                      </Label>
                      <RadioGroup
                        value={formData.mobileRecharge}
                        onValueChange={(value) => {
                          setFormData({ ...formData, mobileRecharge: value })
                          handleBlur("mobileRecharge")
                        }}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="yes" id="mobile-yes" />
                          <Label htmlFor="mobile-yes" className="text-slate-700">
                            Yes, I recharge regularly
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="no" id="mobile-no" />
                          <Label htmlFor="mobile-no" className="text-slate-700">
                            No, I don't recharge regularly
                          </Label>
                        </div>
                      </RadioGroup>
                      {touched.mobileRecharge && errors.mobileRecharge && (
                        <p className="text-red-500 text-sm mt-1">{errors.mobileRecharge}</p>
                      )}
                    </div>

                    <Separator className="bg-slate-200" />

                    <div className="space-y-4">
                      <Label className="text-slate-800 text-lg flex items-center gap-2">
                        <Zap className="w-5 h-5" />
                        Utility Bills
                        <RequiredStar />
                      </Label>
                      <RadioGroup
                        value={formData.utilityBill}
                        onValueChange={(value) => {
                          setFormData({ ...formData, utilityBill: value })
                          handleBlur("utilityBill")
                        }}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="yes" id="utility-yes" />
                          <Label htmlFor="utility-yes" className="text-slate-700">
                            Yes, I have utility bills in my name
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="no" id="utility-no" />
                          <Label htmlFor="utility-no" className="text-slate-700">
                            No, I don't have utility bills
                          </Label>
                        </div>
                      </RadioGroup>
                      {touched.utilityBill && errors.utilityBill && (
                        <p className="text-red-500 text-sm mt-1">{errors.utilityBill}</p>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Documents */}
                {currentStep === 3 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                    <div
                      className={`${formData.mobileRecharge === "yes" ? "grid grid-cols-1 md:grid-cols-2 gap-6" : ""}`}
                    >
                      <Card className="glass-card border-white/20">
                        <CardHeader>
                          <CardTitle className="text-slate-800 text-lg flex items-center gap-2">
                            <FileText className="w-5 h-5" />
                            Rent/EMI Proof
                            <RequiredStar />
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div
                            className={`border-2 border-dashed ${
                              touched.rentProof && errors.rentProof ? "border-red-500" : "border-slate-300"
                            } rounded-lg p-6 text-center hover:border-blue-400 transition-colors cursor-pointer`}
                          >
                            <input
                              type="file"
                              accept=".pdf,.jpg,.jpeg,.png"
                              onChange={(e) => {
                                if (e.target.files?.[0]) {
                                  handleFileUpload("rentProof", e.target.files[0])
                                  handleBlur("rentProof")
                                }
                              }}
                              className="hidden"
                              id="rent-upload"
                            />
                            <label htmlFor="rent-upload" className="cursor-pointer">
                              <Upload className="w-8 h-8 text-slate-500 mx-auto mb-2" />
                              <p className="text-slate-700 text-sm">
                                {files.rentProof ? files.rentProof.name : "Click to upload or drag and drop"}
                              </p>
                              <p className="text-slate-500 text-xs mt-1">PDF, JPG, PNG up to 10MB</p>
                            </label>
                          </div>
                          {touched.rentProof && errors.rentProof && (
                            <p className="text-red-500 text-sm mt-1">{errors.rentProof}</p>
                          )}
                        </CardContent>
                      </Card>

                      {formData.mobileRecharge === "yes" && (
                        <Card className="glass-card border-white/20">
                          <CardHeader>
                            <CardTitle className="text-slate-800 text-lg flex items-center gap-2">
                              <Smartphone className="w-5 h-5" />
                              Mobile Recharge Proof
                              <RequiredStar />
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div
                              className={`border-2 border-dashed ${
                                touched.mobileProof && errors.mobileProof ? "border-red-500" : "border-slate-300"
                              } rounded-lg p-6 text-center hover:border-blue-400 transition-colors cursor-pointer`}
                            >
                              <input
                                type="file"
                                accept=".pdf,.jpg,.jpeg,.png"
                                onChange={(e) => {
                                  if (e.target.files?.[0]) {
                                    handleFileUpload("mobileProof", e.target.files[0])
                                    handleBlur("mobileProof")
                                  }
                                }}
                                className="hidden"
                                id="mobile-upload"
                              />
                              <label htmlFor="mobile-upload" className="cursor-pointer">
                                <Upload className="w-8 h-8 text-slate-500 mx-auto mb-2" />
                                <p className="text-slate-700 text-sm">
                                  {files.mobileProof ? files.mobileProof.name : "Click to upload or drag and drop"}
                                </p>
                                <p className="text-slate-500 text-xs mt-1">PDF, JPG, PNG up to 10MB</p>
                              </label>
                            </div>
                            {touched.mobileProof && errors.mobileProof && (
                              <p className="text-red-500 text-sm mt-1">{errors.mobileProof}</p>
                            )}
                          </CardContent>
                        </Card>
                      )}
                    </div>

                    {formData.utilityBill === "yes" && (
                      <Card className="glass-card border-white/20">
                        <CardHeader>
                          <CardTitle className="text-slate-800 text-lg flex items-center gap-2">
                            <Zap className="w-5 h-5" />
                            Utility Bill Proof
                            <RequiredStar />
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div
                            className={`border-2 border-dashed ${
                              touched.utilityProof && errors.utilityProof ? "border-red-500" : "border-slate-300"
                            } rounded-lg p-6 text-center hover:border-blue-400 transition-colors cursor-pointer`}
                          >
                            <input
                              type="file"
                              accept=".pdf,.jpg,.jpeg,.png"
                              onChange={(e) => {
                                if (e.target.files?.[0]) {
                                  handleFileUpload("utilityProof", e.target.files[0])
                                  handleBlur("utilityProof")
                                }
                              }}
                              className="hidden"
                              id="utility-upload"
                            />
                            <label htmlFor="utility-upload" className="cursor-pointer">
                              <Upload className="w-8 h-8 text-slate-500 mx-auto mb-2" />
                              <p className="text-slate-700 text-sm">
                                {files.utilityProof ? files.utilityProof.name : "Click to upload or drag and drop"}
                              </p>
                              <p className="text-slate-500 text-xs mt-1">PDF, JPG, PNG up to 10MB</p>
                            </label>
                          </div>
                          {touched.utilityProof && errors.utilityProof && (
                            <p className="text-red-500 text-sm mt-1">{errors.utilityProof}</p>
                          )}
                        </CardContent>
                      </Card>
                    )}

                    <Card className="glass-card border-white/20">
                      <CardHeader>
                        <CardTitle className="text-slate-800 text-lg flex items-center gap-2">
                          <Zap className="w-5 h-5" />
                          UPI Transaction History
                        </CardTitle>
                        <CardDescription className="text-slate-600">
                          Upload your UPI transaction CSV for spending pattern analysis
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors cursor-pointer">
                          <input
                            type="file"
                            accept=".csv"
                            onChange={(e) => {
                              const file = e.target.files?.[0]
                              if (file) {
                                handleFileUpload("upiCsv", file)
                                analyzeUpiFile(file)
                              }
                            }}
                            className="hidden"
                            id="upi-upload"
                          />
                          <label htmlFor="upi-upload" className="cursor-pointer">
                            <Upload className="w-12 h-12 text-slate-500 mx-auto mb-4" />
                            <p className="text-slate-700">{files.upiCsv ? files.upiCsv.name : "Upload UPI CSV File"}</p>
                            <p className="text-slate-500 text-sm mt-2">CSV files only, up to 5MB</p>
                          </label>
                        </div>

                        {upiAnalysis && (
                          <div className="mt-4 p-4 bg-white/30 rounded-lg">
                            <h4 className="text-slate-800 font-medium mb-2">UPI Analysis Results:</h4>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <span className="text-slate-600">Total Transactions:</span>
                                <span className="text-slate-800 ml-2">{upiAnalysis.totalTransactions}</span>
                              </div>
                              <div>
                                <span className="text-slate-600">Avg Monthly Spending:</span>
                                <span className="text-slate-800 ml-2">₹{upiAnalysis.avgMonthlySpending}</span>
                              </div>
                              <div>
                                <span className="text-slate-600">Consistent Spending:</span>
                                <span
                                  className={`ml-2 ${
                                    upiAnalysis.consistentSpending ? "text-emerald-600" : "text-red-600"
                                  }`}
                                >
                                  {upiAnalysis.consistentSpending ? "Yes" : "No"}
                                </span>
                              </div>
                              <div>
                                <span className="text-slate-600">Financial Stability:</span>
                                <span className="text-slate-800 ml-2">{upiAnalysis.financialStability}/100</span>
                              </div>
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                )}

                {/* Step 4: References */}
                {currentStep === 4 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="refName" className="text-slate-700">
                          Reference Name
                          <RequiredStar />
                        </Label>
                        <Input
                          id="refName"
                          value={formData.referenceName}
                          onChange={(e) => setFormData({ ...formData, referenceName: e.target.value })}
                          onBlur={() => handleBlur("referenceName")}
                          className={`bg-white/50 border-white/30 text-slate-800 placeholder:text-slate-500 ${
                            touched.referenceName && errors.referenceName ? "border-red-500" : ""
                          }`}
                          placeholder="Enter reference name"
                        />
                        {touched.referenceName && errors.referenceName && (
                          <p className="text-red-500 text-sm mt-1">{errors.referenceName}</p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="relationship" className="text-slate-700">
                          Relationship
                          <RequiredStar />
                        </Label>
                        <Input
                          id="relationship"
                          value={formData.referenceRelationship}
                          onChange={(e) => setFormData({ ...formData, referenceRelationship: e.target.value })}
                          onBlur={() => handleBlur("referenceRelationship")}
                          className={`bg-white/50 border-white/30 text-slate-800 placeholder:text-slate-500 ${
                            touched.referenceRelationship && errors.referenceRelationship ? "border-red-500" : ""
                          }`}
                          placeholder="e.g., Friend, Colleague, Family"
                        />
                        {touched.referenceRelationship && errors.referenceRelationship && (
                          <p className="text-red-500 text-sm mt-1">{errors.referenceRelationship}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <Label className="text-slate-800 text-lg">
                        Reference Feedback
                        <RequiredStar />
                      </Label>
                      <p className="text-slate-600 text-sm mb-4">How would they rate your financial behavior?</p>
                      <RadioGroup
                        value={formData.referenceFeedback}
                        onValueChange={(value) => {
                          setFormData({ ...formData, referenceFeedback: value })
                          handleBlur("referenceFeedback")
                        }}
                        className="space-y-3"
                      >
                        <div className="flex items-center space-x-2 p-3 rounded-lg bg-emerald-50 border border-emerald-200">
                          <RadioGroupItem value="positive" id="positive" />
                          <Label htmlFor="positive" className="text-slate-800 flex items-center gap-2">
                            <Star className="w-4 h-4 text-emerald-600" />
                            Positive - Very reliable with money
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2 p-3 rounded-lg bg-amber-50 border border-amber-200">
                          <RadioGroupItem value="neutral" id="neutral" />
                          <Label htmlFor="neutral" className="text-slate-800 flex items-center gap-2">
                            <Star className="w-4 h-4 text-amber-600" />
                            Neutral - Generally responsible
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2 p-3 rounded-lg bg-red-50 border border-red-200">
                          <RadioGroupItem value="negative" id="negative" />
                          <Label htmlFor="negative" className="text-slate-800 flex items-center gap-2">
                            <Star className="w-4 h-4 text-red-600" />
                            Negative - Has some financial challenges
                          </Label>
                        </div>
                      </RadioGroup>
                      {touched.referenceFeedback && errors.referenceFeedback && (
                        <p className="text-red-500 text-sm mt-1">{errors.referenceFeedback}</p>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* Step 5: Results */}
                {currentStep === 5 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="space-y-8 text-center"
                  >
                    {verificationStatus === "verified" && score ? (
                      <>
                        <div className="relative">
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                            className="w-48 h-48 mx-auto relative"
                          >
                            <div className="w-full h-full rounded-full gradient-fintech p-1 shadow-2xl">
                              <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                                <div className="text-center">
                                  <div className="text-4xl font-bold text-slate-800 mb-2">{score.total}</div>
                                  <div className="text-sm text-slate-600">out of 100</div>
                                </div>
                              </div>
                            </div>
                          </motion.div>

                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="mt-6"
                          >
                            <Badge
                              className={`text-lg px-4 py-2 ${getGrade(score.total).bg} ${
                                getGrade(score.total).color
                              } border-0`}
                            >
                              Grade {getGrade(score.total).grade}
                            </Badge>
                          </motion.div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                          <Card className="glass-card border-white/20">
                            <CardHeader>
                              <CardTitle className="text-slate-800 text-lg">Score Breakdown</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                              <div className="flex justify-between">
                                <span className="text-slate-600">Recurring Payments</span>
                                <span className="text-slate-800 font-medium">
                                  {score.components.recurringPayments}/30
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-slate-600">Mobile Recharge</span>
                                <span className="text-slate-800 font-medium">{score.components.mobileRecharge}/20</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-slate-600">Utility Bills</span>
                                <span className="text-slate-800 font-medium">{score.components.utilityBill}/15</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-slate-600">UPI Consistency</span>
                                <span className="text-slate-800 font-medium">{score.components.upiConsistency}/20</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-slate-600">Reference Check</span>
                                <span className="text-slate-800 font-medium">
                                  {score.components.referenceFeedback}/15
                                </span>
                              </div>
                            </CardContent>
                          </Card>

                          <Card className="glass-card border-white/20">
                            <CardHeader>
                              <CardTitle className="text-slate-800 text-lg">Actions</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                              <Button
                                onClick={downloadPDF}
                                disabled={loading}
                                className="w-full gradient-fintech text-white hover:opacity-90"
                              >
                                {loading ? (
                                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                ) : (
                                  <Download className="w-4 h-4 mr-2" />
                                )}
                                Download Report
                              </Button>

                              <div className="space-y-2">
                                <Input
                                  placeholder="Enter email to send report"
                                  value={emailInput}
                                  onChange={(e) => setEmailInput(e.target.value)}
                                  className="bg-white/50 border-white/30 text-slate-800 placeholder:text-slate-500"
                                  onKeyPress={(e) => {
                                    if (e.key === "Enter" && emailInput) {
                                      sendEmail(emailInput)
                                    }
                                  }}
                                />
                                <Button
                                  variant="outline"
                                  className="w-full border-slate-300 text-slate-800 hover:bg-slate-100"
                                  onClick={() => emailInput && sendEmail(emailInput)}
                                  disabled={loading || !emailInput}
                                >
                                  {loading ? (
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                  ) : (
                                    <Mail className="w-4 h-4 mr-2" />
                                  )}
                                  Send Email
                                </Button>
                              </div>

                              <div className="flex gap-2">
                                <Button
                                  variant="outline"
                                  className="flex-1 border-slate-300 text-black hover:bg-slate-100"
                                  onClick={copyReportLink}
                                >
                                  <Copy className="w-4 h-4 mr-2" />
                                  Copy Link
                                </Button>
                                <Button
                                  variant="outline"
                                  className="flex-1 border-slate-300 text-black hover:bg-slate-100"
                                  onClick={shareReport}
                                >
                                  <Share className="w-4 h-4 mr-2" />
                                  Share
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        </div>

                        {score.recommendations && score.recommendations.length > 0 && (
                          <Card className="glass-card border-white/20 text-left">
                            <CardHeader>
                              <CardTitle className="text-slate-800 text-lg">Recommendations</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <ul className="space-y-2">
                                {score.recommendations.map((rec: string, index: number) => (
                                  <li key={index} className="text-slate-700 flex items-start">
                                    <span className="text-slate-800 mr-2">{index + 1}.</span>
                                    {rec}
                                  </li>
                                ))}
                              </ul>
                            </CardContent>
                          </Card>
                        )}
                      </>
                    ) : verificationStatus === "rejected" ? (
                      <Card className="bg-red-50 border-red-200">
                        <CardHeader>
                          <CardTitle className="text-slate-800 text-xl">Assessment Rejected</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <p className="text-slate-700">
                            Your assessment has been reviewed and could not be verified. This may be due to:
                          </p>
                          <ul className="text-left list-disc pl-5 text-slate-700 space-y-1">
                            <li>Insufficient or unclear documentation</li>
                            <li>Inconsistent information provided</li>
                            <li>Unable to verify reference details</li>
                          </ul>
                          <Button
                            onClick={() => setCurrentStep(1)}
                            className="mt-4 bg-red-600 text-white hover:bg-red-700"
                          >
                            Start New Assessment
                          </Button>
                        </CardContent>
                      </Card>
                    ) : (
                      <Card className="bg-gradient-to-br from-blue-50 to-emerald-50 border-blue-200">
                        <CardHeader>
                          <CardTitle className="text-slate-800 text-xl">Assessment Pending Verification</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                          <div className="flex flex-col items-center justify-center py-6">
                            <div className="w-16 h-16 rounded-full border-4 border-t-blue-500 border-r-emerald-300 border-b-blue-500 border-l-emerald-300 animate-spin mb-4"></div>
                            <p className="text-slate-700 text-center max-w-md">
                              Your documents are being reviewed by our team. Once verified, your trust score will be
                              generated. This typically takes 1-24 hours.
                            </p>
                          </div>

                          <div className="flex flex-col items-center gap-4">
                            <Button
                              onClick={checkVerificationStatus}
                              disabled={loading}
                              className="gradient-fintech text-white hover:opacity-90"
                            >
                              {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                              Refresh Status
                            </Button>
                            <p className="text-xs text-slate-600">Assessment ID: {assessmentId}</p>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </motion.div>
                )}
                {/* Navigation Buttons */}
                {currentStep < 5 && (
                  <div className="flex justify-between pt-6">
                    <Button
                      variant="outline"
                      onClick={handlePrevious}
                      disabled={currentStep === 1}
                      className="bg-white/90 border border-slate-300 text-slate-800 hover:bg-slate-100 hover:text-slate-900"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Previous
                    </Button>

                    {currentStep === 4 ? (
                      <Button
                        onClick={handleSubmit}
                        className="gradient-fintech text-white hover:opacity-90"
                        disabled={!formData.referenceFeedback || loading}
                      >
                        {loading ? (
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        ) : (
                          <TrendingUp className="w-4 h-4 mr-2" />
                        )}
                        Generate Score
                      </Button>
                    ) : (
                      <Button onClick={handleNext} className="gradient-fintech text-white hover:opacity-90">
                        Next
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
