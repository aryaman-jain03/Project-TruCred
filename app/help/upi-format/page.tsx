"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Shield, Download, FileText, CheckCircle, AlertTriangle, Info } from "lucide-react"
import Link from "next/link"

export default function UpiFormatPage() {
  const downloadSampleCSV = () => {
    const sampleData = `Date,Description,Amount,Type,Balance
2024-01-15,UPI-SWIGGY-ORDER-12345,250.00,Debit,15750.00
2024-01-15,UPI-SALARY-CREDIT-COMPANY,25000.00,Credit,16000.00
2024-01-14,UPI-GROCERY-STORE-456,450.00,Debit,16000.00
2024-01-14,UPI-MOBILE-RECHARGE-789,199.00,Debit,16450.00
2024-01-13,UPI-RENT-PAYMENT-JAN,12000.00,Debit,16649.00
2024-01-13,UPI-REFUND-AMAZON-123,299.00,Credit,28649.00
2024-01-12,UPI-FUEL-PETROL-PUMP,2000.00,Debit,28350.00
2024-01-12,UPI-NETFLIX-SUBSCRIPTION,199.00,Debit,30350.00
2024-01-11,UPI-MEDICAL-PHARMACY,350.00,Debit,30549.00
2024-01-11,UPI-UBER-RIDE-789,150.00,Debit,30899.00`

    const blob = new Blob([sampleData], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "sample-upi-transactions.csv"
    document.body.appendChild(a)
    a.click()
    window.URL.revokeObjectURL(url)
    document.body.removeChild(a)
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
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 gradient-fintech rounded-xl flex items-center justify-center shadow-lg">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-800">TruCred</h1>
                <p className="text-sm text-slate-600">UPI CSV Format Guide</p>
              </div>
            </Link>
            <Link href="/assessment">
              <Button className="gradient-fintech text-white hover:opacity-90">Start Assessment</Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <Badge className="mb-4 glass-button text-blue-700 border-blue-200 hover:bg-blue-50">
              <FileText className="w-4 h-4 mr-2" />
              CSV Format Guide
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-slate-800">UPI CSV Format Requirements</h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Learn how to format your UPI transaction data for accurate analysis by TruCred's scoring system
            </p>
          </div>

          {/* Required Format */}
          <Card className="glass-card border-white/20">
            <CardHeader>
              <CardTitle className="text-slate-800 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-600" />
                Required CSV Format
              </CardTitle>
              <CardDescription className="text-slate-600">
                Your CSV file must include these columns in the exact format shown below
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-slate-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                <div className="text-yellow-400 mb-2"># Required columns (case-insensitive):</div>
                <div className="text-white">Date,Description,Amount,Type,Balance</div>
                <div className="text-gray-400 mt-2"># Example data:</div>
                <div className="text-blue-300">2024-01-15,UPI-SWIGGY-ORDER-12345,250.00,Debit,15750.00</div>
                <div className="text-blue-300">2024-01-15,UPI-SALARY-CREDIT,25000.00,Credit,41000.00</div>
                <div className="text-blue-300">2024-01-14,UPI-GROCERY-STORE,450.00,Debit,16000.00</div>
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button onClick={downloadSampleCSV} className="gradient-fintech text-white hover:opacity-90">
                  <Download className="w-4 h-4 mr-2" />
                  Download Sample CSV
                </Button>
                <Link href="/assessment">
                  <Button variant="outline" className="w-full border-slate-300 text-black hover:bg-slate-100">
                    Start Assessment
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Column Specifications */}
          <Card className="glass-card border-white/20">
            <CardHeader>
              <CardTitle className="text-slate-800">Column Specifications</CardTitle>
              <CardDescription className="text-slate-600">
                Detailed requirements for each column in your CSV file
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Date Column */}
                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="text-lg font-semibold text-slate-800 mb-2">Date</h3>
                  <div className="space-y-2 text-sm">
                    <div>
                      <strong>Format:</strong> <code className="bg-slate-100 px-2 py-1 rounded">YYYY-MM-DD</code>
                    </div>
                    <div>
                      <strong>Example:</strong> <code className="bg-slate-100 px-2 py-1 rounded">2024-01-15</code>
                    </div>
                    <div>
                      <strong>Required:</strong> <Badge className="bg-red-100 text-red-800">Yes</Badge>
                    </div>
                    <p className="text-slate-600">Transaction date in ISO format (Year-Month-Day)</p>
                  </div>
                </div>

                {/* Description Column */}
                <div className="border-l-4 border-emerald-500 pl-4">
                  <h3 className="text-lg font-semibold text-slate-800 mb-2">Description</h3>
                  <div className="space-y-2 text-sm">
                    <div>
                      <strong>Format:</strong> <code className="bg-slate-100 px-2 py-1 rounded">Text</code>
                    </div>
                    <div>
                      <strong>Example:</strong>{" "}
                      <code className="bg-slate-100 px-2 py-1 rounded">UPI-SWIGGY-ORDER-12345</code>
                    </div>
                    <div>
                      <strong>Required:</strong> <Badge className="bg-red-100 text-red-800">Yes</Badge>
                    </div>
                    <p className="text-slate-600">Transaction description or narration from your bank statement</p>
                  </div>
                </div>

                {/* Amount Column */}
                <div className="border-l-4 border-violet-500 pl-4">
                  <h3 className="text-lg font-semibold text-slate-800 mb-2">Amount</h3>
                  <div className="space-y-2 text-sm">
                    <div>
                      <strong>Format:</strong>{" "}
                      <code className="bg-slate-100 px-2 py-1 rounded">Number (without currency symbol)</code>
                    </div>
                    <div>
                      <strong>Example:</strong> <code className="bg-slate-100 px-2 py-1 rounded">250.00</code>
                    </div>
                    <div>
                      <strong>Required:</strong> <Badge className="bg-red-100 text-red-800">Yes</Badge>
                    </div>
                    <p className="text-slate-600">
                      Transaction amount as positive number (₹ symbol will be added automatically)
                    </p>
                  </div>
                </div>

                {/* Type Column */}
                <div className="border-l-4 border-amber-500 pl-4">
                  <h3 className="text-lg font-semibold text-slate-800 mb-2">Type</h3>
                  <div className="space-y-2 text-sm">
                    <div>
                      <strong>Format:</strong> <code className="bg-slate-100 px-2 py-1 rounded">Credit</code> or{" "}
                      <code className="bg-slate-100 px-2 py-1 rounded">Debit</code>
                    </div>
                    <div>
                      <strong>Example:</strong> <code className="bg-slate-100 px-2 py-1 rounded">Debit</code>
                    </div>
                    <div>
                      <strong>Required:</strong> <Badge className="bg-amber-100 text-amber-800">Optional</Badge>
                    </div>
                    <p className="text-slate-600">
                      Transaction type (if not provided, will be inferred from description)
                    </p>
                  </div>
                </div>

                {/* Balance Column */}
                <div className="border-l-4 border-slate-500 pl-4">
                  <h3 className="text-lg font-semibold text-slate-800 mb-2">Balance</h3>
                  <div className="space-y-2 text-sm">
                    <div>
                      <strong>Format:</strong> <code className="bg-slate-100 px-2 py-1 rounded">Number</code>
                    </div>
                    <div>
                      <strong>Example:</strong> <code className="bg-slate-100 px-2 py-1 rounded">15750.00</code>
                    </div>
                    <div>
                      <strong>Required:</strong> <Badge className="bg-amber-100 text-amber-800">Optional</Badge>
                    </div>
                    <p className="text-slate-600">Account balance after the transaction</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Common Issues */}
          <Card className="glass-card border-white/20">
            <CardHeader>
              <CardTitle className="text-slate-800 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
                Common Issues & Solutions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h4 className="font-semibold text-red-800 mb-2">❌ Invalid Date Format</h4>
                  <p className="text-red-700 text-sm mb-2">
                    <strong>Problem:</strong> Using DD/MM/YYYY or MM/DD/YYYY format
                  </p>
                  <p className="text-red-700 text-sm">
                    <strong>Solution:</strong> Use YYYY-MM-DD format (e.g., 2024-01-15)
                  </p>
                </div>

                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h4 className="font-semibold text-red-800 mb-2">❌ Currency Symbols in Amount</h4>
                  <p className="text-red-700 text-sm mb-2">
                    <strong>Problem:</strong> Including ₹ or commas in amount (₹1,250.00)
                  </p>
                  <p className="text-red-700 text-sm">
                    <strong>Solution:</strong> Use plain numbers only (1250.00)
                  </p>
                </div>

                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h4 className="font-semibold text-red-800 mb-2">❌ Missing Required Columns</h4>
                  <p className="text-red-700 text-sm mb-2">
                    <strong>Problem:</strong> CSV missing Date, Amount, or Description columns
                  </p>
                  <p className="text-red-700 text-sm">
                    <strong>Solution:</strong> Ensure all required columns are present with correct names
                  </p>
                </div>

                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                  <h4 className="font-semibold text-emerald-800 mb-2">✅ Best Practices</h4>
                  <ul className="text-emerald-700 text-sm space-y-1">
                    <li>• Include at least 3-6 months of transaction data</li>
                    <li>• Remove any header rows except the column names</li>
                    <li>• Ensure no empty rows in the middle of data</li>
                    <li>• Use UTF-8 encoding when saving the CSV file</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Analysis Benefits */}
          <Card className="glass-card border-white/20">
            <CardHeader>
              <CardTitle className="text-slate-800 flex items-center gap-2">
                <Info className="w-5 h-5 text-blue-600" />
                What We Analyze
              </CardTitle>
              <CardDescription className="text-slate-600">
                How your UPI data contributes to your TruCred score
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-slate-800">Spending Patterns</h4>
                  <ul className="text-slate-600 text-sm space-y-2">
                    <li>• Monthly spending consistency</li>
                    <li>• Category-wise expense analysis</li>
                    <li>• Large transaction patterns</li>
                    <li>• Seasonal spending variations</li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h4 className="font-semibold text-slate-800">Financial Behavior</h4>
                  <ul className="text-slate-600 text-sm space-y-2">
                    <li>• Income vs. expense ratio</li>
                    <li>• Regular income patterns</li>
                    <li>• Financial stability indicators</li>
                    <li>• Cash flow management</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CTA */}
          <Card className="glass-card border-white/20 text-center">
            <CardContent className="py-12">
              <h2 className="text-3xl font-bold mb-4 text-slate-800">Ready to Upload Your UPI Data?</h2>
              <p className="text-slate-600 mb-8 max-w-2xl mx-auto">
                Now that you understand the format requirements, start your TruCred assessment and upload your UPI
                transaction CSV for comprehensive analysis.
              </p>
              <Link href="/assessment">
                <Button size="lg" className="gradient-fintech text-white hover:opacity-90 text-lg px-8 py-6">
                  Start Assessment Now
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
