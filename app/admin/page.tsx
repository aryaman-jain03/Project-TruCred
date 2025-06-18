"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Shield, Eye, CheckCircle, XCircle, Clock, FileText, Users } from "lucide-react"

interface Assessment {
  id: string
  name: string
  email: string
  phone: string
  submittedAt: string
  status: "pending_verification" | "verified" | "rejected"
  files: Record<string, string>
  rentMonths: number
  mobileRecharge: string
  utilityBill: string
  referenceName: string
  referenceRelationship: string
  referenceFeedback: string
}

export default function AdminDashboard() {
  const [assessments, setAssessments] = useState<Assessment[]>([])
  const [selectedAssessment, setSelectedAssessment] = useState<Assessment | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [adminPassword, setAdminPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const handleLogin = () => {
    // Simple password check (in production, use proper authentication)
    if (adminPassword === "admin123") {
      setIsAuthenticated(true)
      fetchAssessments()
    } else {
      alert("Invalid password")
    }
  }

  const fetchAssessments = async () => {
    try {
      const response = await fetch("/api/admin/assessments")
      const data = await response.json()
      if (data.success) {
        setAssessments(data.assessments)
      }
    } catch (error) {
      console.error("Failed to fetch assessments:", error)
    }
  }

  const updateAssessmentStatus = async (id: string, status: string, notes?: string) => {
    setLoading(true)
    try {
      const response = await fetch("/api/admin/update-status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status, notes }),
      })

      if (response.ok) {
        fetchAssessments()
        setSelectedAssessment(null)
      }
    } catch (error) {
      console.error("Failed to update status:", error)
    }
    setLoading(false)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending_verification":
        return (
          <Badge variant="outline" className="text-amber-600 border-amber-300 bg-amber-50">
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </Badge>
        )
      case "verified":
        return (
          <Badge variant="outline" className="text-emerald-600 border-emerald-300 bg-emerald-50">
            <CheckCircle className="w-3 h-3 mr-1" />
            Verified
          </Badge>
        )
      case "rejected":
        return (
          <Badge variant="outline" className="text-red-600 border-red-300 bg-red-50">
            <XCircle className="w-3 h-3 mr-1" />
            Rejected
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const stats = {
    total: assessments.length,
    pending: assessments.filter((a) => a.status === "pending_verification").length,
    verified: assessments.filter((a) => a.status === "verified").length,
    rejected: assessments.filter((a) => a.status === "rejected").length,
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-emerald-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <Card className="w-full max-w-md glass-card border-white/20 relative z-10">
          <CardHeader className="text-center">
            <div className="w-16 h-16 gradient-fintech rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-slate-800 text-2xl">Admin Login</CardTitle>
            <CardDescription className="text-slate-600">Enter admin password to access dashboard</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="password" className="text-slate-700">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                className="bg-white/50 border-white/30 text-slate-800 placeholder:text-slate-500"
                placeholder="Enter admin password"
                onKeyPress={(e) => e.key === "Enter" && handleLogin()}
              />
            </div>
            <Button onClick={handleLogin} className="w-full gradient-fintech text-white hover:opacity-90">
              Login
            </Button>
          </CardContent>
        </Card>
      </div>
    )
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
                <p className="text-sm text-slate-600">Document Verification Dashboard</p>
              </div>
            </div>
            <Button
              variant="outline"
              onClick={() => setIsAuthenticated(false)}
              className="border-slate-300 text-black hover:bg-slate-100"
            >
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="glass-card border-white/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Total Assessments</CardTitle>
              <Users className="h-4 w-4 text-slate-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-800">{stats.total}</div>
            </CardContent>
          </Card>

          <Card className="glass-card border-white/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Pending Review</CardTitle>
              <Clock className="h-4 w-4 text-amber-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-600">{stats.pending}</div>
            </CardContent>
          </Card>

          <Card className="glass-card border-white/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Verified</CardTitle>
              <CheckCircle className="h-4 w-4 text-emerald-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-emerald-600">{stats.verified}</div>
            </CardContent>
          </Card>

          <Card className="glass-card border-white/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Rejected</CardTitle>
              <XCircle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{stats.rejected}</div>
            </CardContent>
          </Card>
        </div>

        {/* Assessments Table */}
        <Card className="glass-card border-white/20">
          <CardHeader>
            <CardTitle className="text-slate-800">Assessment Submissions</CardTitle>
            <CardDescription className="text-slate-600">Review and verify submitted documents</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-slate-200">
                  <TableHead className="text-slate-600">Name</TableHead>
                  <TableHead className="text-slate-600">Email</TableHead>
                  <TableHead className="text-slate-600">Submitted</TableHead>
                  <TableHead className="text-slate-600">Status</TableHead>
                  <TableHead className="text-slate-600">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {assessments.map((assessment) => (
                  <TableRow key={assessment.id} className="border-slate-200">
                    <TableCell className="text-slate-800 font-medium">{assessment.name}</TableCell>
                    <TableCell className="text-slate-700">{assessment.email}</TableCell>
                    <TableCell className="text-slate-700">
                      {new Date(assessment.submittedAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>{getStatusBadge(assessment.status)}</TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-blue-300 text-blue-600 hover:bg-blue-50"
                            onClick={() => setSelectedAssessment(assessment)}
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            Review
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="glass-card border-white/20 text-slate-800 max-w-4xl max-h-[80vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>Assessment Review - {selectedAssessment?.name}</DialogTitle>
                            <DialogDescription className="text-slate-600">
                              Review submitted documents and update verification status
                            </DialogDescription>
                          </DialogHeader>

                          {selectedAssessment && (
                            <div className="space-y-6">
                              {/* Personal Info */}
                              <div>
                                <h3 className="text-lg font-semibold text-slate-800 mb-3">Personal Information</h3>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                  <div>
                                    <span className="text-slate-600">Name:</span>
                                    <span className="text-slate-800 ml-2">{selectedAssessment.name}</span>
                                  </div>
                                  <div>
                                    <span className="text-slate-600">Email:</span>
                                    <span className="text-slate-800 ml-2">{selectedAssessment.email}</span>
                                  </div>
                                  <div>
                                    <span className="text-slate-600">Phone:</span>
                                    <span className="text-slate-800 ml-2">{selectedAssessment.phone}</span>
                                  </div>
                                  <div>
                                    <span className="text-slate-600">Rent Months:</span>
                                    <span className="text-slate-800 ml-2">{selectedAssessment.rentMonths}</span>
                                  </div>
                                </div>
                              </div>

                              {/* Financial Data */}
                              <div>
                                <h3 className="text-lg font-semibold text-slate-800 mb-3">Financial Information</h3>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                  <div>
                                    <span className="text-slate-600">Mobile Recharge:</span>
                                    <span className="text-slate-800 ml-2">{selectedAssessment.mobileRecharge}</span>
                                  </div>
                                  <div>
                                    <span className="text-slate-600">Utility Bill:</span>
                                    <span className="text-slate-800 ml-2">{selectedAssessment.utilityBill}</span>
                                  </div>
                                  <div>
                                    <span className="text-slate-600">Reference:</span>
                                    <span className="text-slate-800 ml-2">{selectedAssessment.referenceName}</span>
                                  </div>
                                  <div>
                                    <span className="text-slate-600">Reference Feedback:</span>
                                    <span className="text-slate-800 ml-2">{selectedAssessment.referenceFeedback}</span>
                                  </div>
                                </div>
                              </div>

                              {/* Uploaded Files */}
                              <div>
                                <h3 className="text-lg font-semibold text-slate-800 mb-3">Uploaded Documents</h3>
                                <div className="space-y-2">
                                  {Object.entries(selectedAssessment.files).map(([key, path]) => (
                                    <div
                                      key={key}
                                      className="flex items-center justify-between p-3 bg-white/30 rounded-lg"
                                    >
                                      <div className="flex items-center">
                                        <FileText className="w-4 h-4 text-slate-600 mr-2" />
                                        <span className="text-slate-800">
                                          {key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
                                        </span>
                                      </div>
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        className="border-blue-300 text-blue-600 hover:bg-blue-50"
                                      >
                                        View File
                                      </Button>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              {/* Status Update */}
                              <div>
                                <h3 className="text-lg font-semibold text-slate-800 mb-3">Update Status</h3>
                                <div className="flex gap-3">
                                  <Button
                                    onClick={() => updateAssessmentStatus(selectedAssessment.id, "verified")}
                                    disabled={loading}
                                    className="bg-emerald-600 hover:bg-emerald-700 text-white"
                                  >
                                    <CheckCircle className="w-4 h-4 mr-2" />
                                    Verify
                                  </Button>
                                  <Button
                                    onClick={() => updateAssessmentStatus(selectedAssessment.id, "rejected")}
                                    disabled={loading}
                                    className="bg-red-600 hover:bg-red-700 text-white"
                                  >
                                    <XCircle className="w-4 h-4 mr-2" />
                                    Reject
                                  </Button>
                                </div>
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
//