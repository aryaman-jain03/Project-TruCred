import { type NextRequest, NextResponse } from "next/server"
import { jsPDF } from "jspdf"

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const { assessmentData, scoreData, upiAnalysis } = data

    // Create new PDF document with better settings
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
      putOnlyUsedFonts: true,
      floatPrecision: 16,
    })

    const pageWidth = doc.internal.pageSize.getWidth()
    const pageHeight = doc.internal.pageSize.getHeight()
    const margin = 20

    // Colors
    const primaryBlue = "#3B82F6"
    const emeraldGreen = "#10B981"
    const darkGray = "#1F2937"
    const lightGray = "#6B7280"

    // Helper function to add gradient-like header
    const addHeader = () => {
      // Header background
      doc.setFillColor(59, 130, 246) // Blue
      doc.rect(0, 0, pageWidth, 40, "F")

      // Logo area (shield icon representation)
      doc.setFillColor(255, 255, 255)
      doc.circle(25, 20, 8, "F")
      doc.setFillColor(59, 130, 246)
      doc.setFontSize(12)
      doc.setFont("helvetica", "bold")
      doc.setTextColor(255, 255, 255)
      doc.text("🛡️", 21, 24)

      // Title
      doc.setFontSize(24)
      doc.setFont("helvetica", "bold")
      doc.setTextColor(255, 255, 255)
      doc.text("TruCred Financial Report", 40, 20)

      doc.setFontSize(12)
      doc.setFont("helvetica", "normal")
      doc.text("Alternative Credit Scoring Assessment", 40, 28)

      // Date
      doc.setFontSize(10)
      doc.text(
        `Generated: ${new Date().toLocaleDateString("en-IN", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}`,
        pageWidth - 60,
        20,
      )

      doc.text(
        `Valid until: ${new Date(Date.now() + 6 * 30 * 24 * 60 * 60 * 1000).toLocaleDateString("en-IN", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}`,
        pageWidth - 60,
        28,
      )
    }

    // Helper function to add footer
    const addFooter = (pageNum: number, totalPages: number) => {
      doc.setFontSize(8)
      doc.setTextColor(lightGray)
      doc.text(`TruCred Alternative Credit Scoring System | Page ${pageNum} of ${totalPages}`, margin, pageHeight - 10)
      doc.text(
        `Report ID: ${assessmentData.name.replace(/\s+/g, "")}-${Date.now().toString().slice(-6)}`,
        pageWidth - 80,
        pageHeight - 10,
      )
    }

    // Page 1: Main Report
    addHeader()

    // Personal Information Section
    let yPos = 60
    doc.setFontSize(16)
    doc.setFont("helvetica", "bold")
    doc.setTextColor(darkGray)
    doc.text("Personal Information", margin, yPos)

    // Underline
    doc.setDrawColor(59, 130, 246)
    doc.setLineWidth(0.5)
    doc.line(margin, yPos + 2, margin + 60, yPos + 2)
    

    yPos += 15
    doc.setFontSize(11)
    doc.setFont("helvetica", "normal")
    doc.setTextColor(darkGray)

    const personalInfo = [
      [`Name:`, assessmentData.name],
      [`Email:`, assessmentData.email],
      [`Phone:`, assessmentData.phone],
      [`Date:`, new Date().toLocaleDateString("en-IN")],
    ]

    personalInfo.forEach(([label, value]) => {
      doc.setFont("helvetica", "bold")
      doc.text(label, margin, yPos)
      doc.setFont("helvetica", "normal")
      doc.text(value, margin + 30, yPos)
      yPos += 8
    })

    // Trust Score Section (Prominent)
    yPos += 10

    // Score circle background
    doc.setFillColor(248, 250, 252)
    doc.roundedRect(margin, yPos, pageWidth - 2 * margin, 50, 5, 5, "F")

    // Score circle
    const centerX = pageWidth / 2
    const centerY = yPos + 25

    // Outer circle
    doc.setFillColor(59, 130, 246)
    doc.circle(centerX - 60, centerY, 20, "F")

    // Inner circle
    doc.setFillColor(255, 255, 255)
    doc.circle(centerX - 60, centerY, 18, "F")

    // Score text
    doc.setFontSize(24)
    doc.setFont("helvetica", "bold")
    doc.setTextColor(59, 130, 246)
    doc.text(scoreData.total.toString(), centerX - 68, centerY + 2)

    doc.setFontSize(10)
    doc.setTextColor(lightGray)
    doc.text("/100", centerX - 55, centerY + 8)

    // Grade badge
    doc.setFillColor(16, 185, 129)
    doc.roundedRect(centerX - 20, centerY - 10, 40, 20, 10, 10, "F")
    doc.setFontSize(16)
    doc.setFont("helvetica", "bold")
    doc.setTextColor(255, 255, 255)
    doc.text(`Grade ${scoreData.grade}`, centerX - 15, centerY + 2)

    // Score interpretation
    yPos += 60
    doc.setFontSize(12)
    doc.setFont("helvetica", "bold")
    doc.setTextColor(darkGray)
    doc.text("Score Interpretation", margin, yPos)

    yPos += 10
    doc.setFontSize(10)
    doc.setFont("helvetica", "normal")
    let interpretation = ""
    if (scoreData.total >= 85) interpretation = "Excellent financial behavior with strong creditworthiness"
    else if (scoreData.total >= 75) interpretation = "Very good financial profile with reliable payment patterns"
    else if (scoreData.total >= 65) interpretation = "Good financial standing with room for improvement"
    else if (scoreData.total >= 55) interpretation = "Fair financial behavior, consider building stronger patterns"
    else interpretation = "Developing financial profile, focus on consistent payment behavior"

    doc.text(interpretation, margin, yPos, { maxWidth: pageWidth - 2 * margin })

    // Score Breakdown Section
    yPos += 20
    doc.setFontSize(14)
    doc.setFont("helvetica", "bold")
    doc.setTextColor(darkGray)
    doc.text("Detailed Score Breakdown", margin, yPos)

    doc.setDrawColor(59, 130, 246)
    doc.line(margin, yPos + 2, margin + 70, yPos + 2)

    yPos += 15

    // Create a table-like structure for score components
    const components = [
      {
        name: "Recurring Payments (Rent/EMI)",
        score: scoreData.components.recurringPayments,
        max: 30,
        description: "Consistency in rent and EMI payments",
      },
      {
        name: "Mobile Recharge Pattern",
        score: scoreData.components.mobileRecharge,
        max: 20,
        description: "Regular mobile recharge behavior",
      },
      {
        name: "Utility Bill Management",
        score: scoreData.components.utilityBill,
        max: 15,
        description: "Utility bill payment responsibility",
      },
      {
        name: "UPI Transaction Consistency",
        score: scoreData.components.upiConsistency,
        max: 20,
        description: "Spending pattern stability",
      },
      {
        name: "Reference Verification",
        score: scoreData.components.referenceFeedback,
        max: 15,
        description: "Peer validation of financial behavior",
      },
    ]

    components.forEach((component, index) => {
      // Component name
      doc.setFontSize(11)
      doc.setFont("helvetica", "bold")
      doc.setTextColor(darkGray)
      doc.text(component.name, margin, yPos)

      // Score
      doc.setFont("helvetica", "bold")
      doc.setTextColor(
        component.score === component.max
          ? emeraldGreen
          : component.score > component.max * 0.7
            ? primaryBlue
            : lightGray,
      )
      doc.text(`${component.score}/${component.max}`, pageWidth - 40, yPos)

      // Progress bar
      const barWidth = 60
      const barHeight = 3
      const barX = pageWidth - 110
      const barY = yPos - 2

      // Background bar
      doc.setFillColor(230, 230, 230)
      doc.rect(barX, barY, barWidth, barHeight, "F")

      // Progress bar
      const progressWidth = (component.score / component.max) * barWidth
      doc.setFillColor(
        component.score === component.max ? 16 : component.score > component.max * 0.7 ? 59 : 107,
        component.score === component.max ? 185 : component.score > component.max * 0.7 ? 130 : 114,
        component.score === component.max ? 129 : component.score > component.max * 0.7 ? 246 : 139,
      )
      doc.rect(barX, barY, progressWidth, barHeight, "F")

      // Description
      yPos += 6
      doc.setFontSize(9)
      doc.setFont("helvetica", "normal")
      doc.setTextColor(lightGray)
      doc.text(component.description, margin + 5, yPos)

      yPos += 12
    })

    // UPI Analysis Section (if available)
    if (upiAnalysis && yPos < pageHeight - 60) {
      yPos += 10
      doc.setFontSize(14)
      doc.setFont("helvetica", "bold")
      doc.setTextColor(darkGray)
      doc.text("UPI Transaction Analysis", margin, yPos)

      doc.setDrawColor(59, 130, 246)
      doc.line(margin, yPos + 2, margin + 70, yPos + 2)

      yPos += 15
      doc.setFontSize(10)
      doc.setFont("helvetica", "normal")

      const upiMetrics = [
        [`Total Transactions:`, upiAnalysis.totalTransactions.toString()],
        [`Average Monthly Spending:`, `₹${upiAnalysis.avgMonthlySpending.toLocaleString("en-IN")}`],
        [`Average Monthly Income:`, `₹${upiAnalysis.avgMonthlyIncome.toLocaleString("en-IN")}`],
        [`Spending Consistency:`, upiAnalysis.consistentSpending ? "Consistent" : "Variable"],
        [`Regular Income Pattern:`, upiAnalysis.regularIncome ? "Yes" : "No"],
        [`Financial Stability Score:`, `${upiAnalysis.financialStability}/100`],
      ]

      upiMetrics.forEach(([label, value]) => {
        doc.setFont("helvetica", "bold")
        doc.setTextColor(darkGray)
        doc.text(label, margin, yPos)
        doc.setFont("helvetica", "normal")
        doc.setTextColor(lightGray)
        doc.text(value, margin + 60, yPos)
        yPos += 7
      })
    }

    addFooter(1, 2)

    // Page 2: Recommendations and Additional Details
    doc.addPage()
    addHeader()

    yPos = 60
    doc.setFontSize(16)
    doc.setFont("helvetica", "bold")
    doc.setTextColor(darkGray)
    doc.text("Recommendations for Improvement", margin, yPos)

    doc.setDrawColor(59, 130, 246)
    doc.line(margin, yPos + 2, margin + 80, yPos + 2)

    yPos += 15

    if (scoreData.recommendations && scoreData.recommendations.length > 0) {
      scoreData.recommendations.forEach((rec: string, index: number) => {
        doc.setFontSize(11)
        doc.setFont("helvetica", "bold")
        doc.setTextColor(primaryBlue)
        doc.text(`${index + 1}.`, margin, yPos)

        doc.setFont("helvetica", "normal")
        doc.setTextColor(darkGray)
        doc.text(rec, margin + 8, yPos, { maxWidth: pageWidth - 2 * margin - 8 })
        yPos += 12
      })
    } else {
      doc.setFontSize(11)
      doc.setFont("helvetica", "normal")
      doc.setTextColor(emeraldGreen)
      doc.text(
        "Excellent! Your financial profile shows strong patterns. Continue maintaining your current financial discipline.",
        margin,
        yPos,
        { maxWidth: pageWidth - 2 * margin },
      )
    }

    // Spending Categories (if UPI data available)
    if (upiAnalysis && upiAnalysis.spendingCategories) {
      yPos += 20
      doc.setFontSize(14)
      doc.setFont("helvetica", "bold")
      doc.setTextColor(darkGray)
      doc.text("Spending Pattern Analysis", margin, yPos)

      doc.setDrawColor(59, 130, 246)
      doc.line(margin, yPos + 2, margin + 70, yPos + 2)

      yPos += 15

      const categories = Object.entries(upiAnalysis.spendingCategories)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 6)

      categories.forEach(([category, amount]) => {
        doc.setFontSize(10)
        doc.setFont("helvetica", "normal")
        doc.setTextColor(darkGray)
        doc.text(category, margin, yPos)
        doc.text(`₹${amount.toLocaleString("en-IN")}`, pageWidth - 40, yPos)
        yPos += 8
      })
    }

    // Verification Certificate
    yPos += 20
    doc.setFillColor(248, 250, 252)
    doc.roundedRect(margin, yPos, pageWidth - 2 * margin, 40, 5, 5, "F")

    yPos += 15
    doc.setFontSize(12)
    doc.setFont("helvetica", "bold")
    doc.setTextColor(emeraldGreen)
    doc.text("✓ VERIFIED REPORT", margin + 10, yPos)

    yPos += 8
    doc.setFontSize(9)
    doc.setFont("helvetica", "normal")
    doc.setTextColor(darkGray)
    doc.text(
      "This report has been verified by TruCred's assessment team and is valid for official use.",
      margin + 10,
      yPos,
    )
    doc.text("Report can be independently verified at: verify.trucred.com", margin + 10, yPos + 6)

    // Important Notes
    yPos += 30
    doc.setFontSize(12)
    doc.setFont("helvetica", "bold")
    doc.setTextColor(darkGray)
    doc.text("Important Notes", margin, yPos)

    yPos += 10
    doc.setFontSize(9)
    doc.setFont("helvetica", "normal")
    doc.setTextColor(lightGray)

    const notes = [
      "• This report is based on alternative credit scoring methodology",
      "• Score reflects financial behavior patterns and payment consistency",
      "• Report validity: 6 months from generation date",
      "• For queries, contact: trucred.india@gmail.com",
    ]

    notes.forEach((note) => {
      doc.text(note, margin, yPos)
      yPos += 6
    })

    addFooter(2, 2)

    // Generate PDF buffer
    const pdfBuffer = doc.output("arraybuffer")

    return new NextResponse(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="TruCred-Report-${assessmentData.name.replace(/\s+/g, "-")}.pdf"`,
      },
    })
  } catch (error) {
    console.error("PDF generation error:", error)
    return NextResponse.json({ success: false, message: "Failed to generate PDF" }, { status: 500 })
  }
}
