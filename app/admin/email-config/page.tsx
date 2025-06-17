"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { Shield, Mail, CheckCircle, AlertCircle, Send, Settings } from "lucide-react"
import Link from "next/link"

export default function EmailConfigPage() {
  const [config, setConfig] = useState({
    smtpHost: "smtp.gmail.com",
    smtpPort: "587",
    emailAddress: "trucred.india@gmail.com",
    displayName: "TruCred Support Team",
    provider: "Gmail",
  })
  const [testEmail, setTestEmail] = useState("")
  const [testing, setTesting] = useState(false)
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null)
  const { toast } = useToast()

  const testEmailConfiguration = async () => {
    if (!testEmail) {
      toast({
        title: "Email Required",
        description: "Please enter a test email address",
        variant: "destructive",
      })
      return
    }

    setTesting(true)
    setTestResult(null)

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: testEmail,
          subject: "TruCred Email Configuration Test",
          assessmentData: {
            name: "Test User",
            score: 85,
            grade: "A",
          },
          pdfBuffer: "", // Empty for test
        }),
      })

      const data = await response.json()

      setTestResult({
        success: data.success,
        message: data.message || data.error || "Unknown result",
      })

      if (data.success) {
        toast({
          title: "Email Test Successful",
          description: `Test email sent to ${testEmail}`,
        })
      } else {
        toast({
          title: "Email Test Failed",
          description: data.message,
          variant: "destructive",
        })
      }
    } catch (error) {
      setTestResult({
        success: false,
        message: "Network error or server unavailable",
      })
      toast({
        title: "Test Failed",
        description: "Could not connect to email service",
        variant: "destructive",
      })
    }

    setTesting(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-emerald-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Header */}
      <header className="glass border-b border-white/20 relative z-10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 gradient-fintech rounded-xl flex items-center justify-center shadow-lg">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-800">TruCred Admin</h1>
                <p className="text-sm text-slate-600">Email Configuration</p>
              </div>
            </div>
            <Link href="/admin">
              <Button variant="outline" className="border-slate-300 text-black hover:bg-slate-100">
                Back to Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Current Configuration */}
          <Card className="glass-card border-white/20">
            <CardHeader>
              <CardTitle className="text-slate-800 flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Current Email Configuration
              </CardTitle>
              <CardDescription className="text-slate-600">Active email settings for TruCred reports</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label className="text-slate-700 font-medium">SMTP Host</Label>
                  <div className="mt-1 p-3 bg-white/50 rounded-lg border border-white/30">
                    <span className="text-slate-800">{config.smtpHost}</span>
                  </div>
                </div>
                <div>
                  <Label className="text-slate-700 font-medium">SMTP Port</Label>
                  <div className="mt-1 p-3 bg-white/50 rounded-lg border border-white/30">
                    <span className="text-slate-800">{config.smtpPort}</span>
                  </div>
                </div>
                <div>
                  <Label className="text-slate-700 font-medium">Email Address</Label>
                  <div className="mt-1 p-3 bg-white/50 rounded-lg border border-white/30">
                    <span className="text-slate-800">{config.emailAddress}</span>
                  </div>
                </div>
                <div>
                  <Label className="text-slate-700 font-medium">Display Name</Label>
                  <div className="mt-1 p-3 bg-white/50 rounded-lg border border-white/30">
                    <span className="text-slate-800">{config.displayName}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-4">
                <Badge className="glass-button text-emerald-700 border-emerald-200 bg-emerald-50">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  {config.provider} Configured
                </Badge>
                <Badge className="glass-button text-blue-700 border-blue-200 bg-blue-50">
                  <Mail className="w-4 h-4 mr-1" />
                  TLS Encryption Enabled
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Email Test */}
          <Card className="glass-card border-white/20">
            <CardHeader>
              <CardTitle className="text-slate-800 flex items-center gap-2">
                <Send className="w-5 h-5" />
                Test Email Configuration
              </CardTitle>
              <CardDescription className="text-slate-600">
                Send a test email to verify the configuration is working correctly
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="testEmail" className="text-slate-700 font-medium">
                  Test Email Address
                </Label>
                <Input
                  id="testEmail"
                  type="email"
                  value={testEmail}
                  onChange={(e) => setTestEmail(e.target.value)}
                  placeholder="Enter email address to test"
                  className="bg-white/50 border-white/30 text-slate-800 placeholder:text-slate-500"
                />
              </div>

              <Button
                onClick={testEmailConfiguration}
                disabled={testing || !testEmail}
                className="gradient-fintech text-white hover:opacity-90"
              >
                {testing ? (
                  <>
                    <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Sending Test Email...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Send Test Email
                  </>
                )}
              </Button>

              {testResult && (
                <div
                  className={`p-4 rounded-lg border ${
                    testResult.success
                      ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                      : "bg-red-50 border-red-200 text-red-800"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {testResult.success ? (
                      <CheckCircle className="w-5 h-5 text-emerald-600" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-red-600" />
                    )}
                    <span className="font-medium">{testResult.success ? "Test Successful" : "Test Failed"}</span>
                  </div>
                  <p className="mt-1 text-sm">{testResult.message}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Email Template Preview */}
          <Card className="glass-card border-white/20">
            <CardHeader>
              <CardTitle className="text-slate-800 flex items-center gap-2">
                <Mail className="w-5 h-5" />
                Email Template Preview
              </CardTitle>
              <CardDescription className="text-slate-600">Preview of the email template sent to users</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-white rounded-lg border border-slate-200 p-6 max-h-96 overflow-y-auto">
                <div className="bg-gradient-to-r from-blue-500 to-emerald-500 text-white p-6 rounded-t-lg text-center">
                  <h1 className="text-2xl font-bold">🛡️ TruCred Financial Report</h1>
                  <p className="mt-2">Your Alternative Credit Score Assessment</p>
                </div>
                <div className="p-6 space-y-4">
                  <h2 className="text-blue-800 text-lg font-semibold">Hello [User Name],</h2>
                  <p className="text-slate-700">
                    Congratulations! Your financial assessment has been completed and verified by our team. Your TruCred
                    report is now ready for use.
                  </p>
                  <div className="bg-gradient-to-r from-blue-50 to-emerald-50 p-4 rounded-lg text-center">
                    <h3 className="text-blue-800 font-semibold">Your Trust Score</h3>
                    <div className="bg-gradient-to-r from-blue-500 to-emerald-500 text-white px-6 py-3 rounded-full inline-block mt-2 font-bold">
                      [Score]/100 (Grade [Grade])
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="bg-slate-50 p-3 rounded">
                      <h4 className="text-blue-700 font-medium">📊 Complete Score Breakdown</h4>
                      <p className="text-slate-600">Detailed analysis of all scoring components</p>
                    </div>
                    <div className="bg-slate-50 p-3 rounded">
                      <h4 className="text-blue-700 font-medium">💳 UPI Transaction Analysis</h4>
                      <p className="text-slate-600">Spending patterns and financial behavior insights</p>
                    </div>
                  </div>
                  <div className="bg-emerald-50 border border-emerald-200 p-3 rounded text-center">
                    <span className="text-emerald-800 font-medium">✓ VERIFIED REPORT</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Configuration Notes */}
          <Card className="glass-card border-white/20">
            <CardHeader>
              <CardTitle className="text-slate-800">Configuration Notes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-slate-600">
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <p>
                  <strong>Gmail App Password:</strong> Using app-specific password for enhanced security
                </p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <p>
                  <strong>TLS Encryption:</strong> All emails are sent with TLS encryption on port 587
                </p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <p>
                  <strong>Professional Template:</strong> Responsive HTML template with TruCred branding
                </p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <p>
                  <strong>PDF Attachment:</strong> Professional reports automatically attached to emails
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
