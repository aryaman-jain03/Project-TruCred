import { type NextRequest, NextResponse } from "next/server"
import { parse } from "csv-parse/sync"

interface UpiTransaction {
  date: string
  amount: number
  type: "credit" | "debit"
  description: string
  balance?: number
}

interface UpiAnalysis {
  totalTransactions: number
  avgMonthlySpending: number
  avgMonthlyIncome: number
  consistentSpending: boolean
  regularIncome: boolean
  financialStability: number
  spendingCategories: Record<string, number>
  monthlyTrends: Array<{
    month: string
    income: number
    spending: number
    netFlow: number
  }>
  largestExpenses: Array<{
    description: string
    amount: number
    date: string
  }>
}

function categorizeTransaction(description: string): string {
  const desc = description.toLowerCase()

  if (desc.includes("salary") || (desc.includes("transfer") && desc.includes("credit"))) return "Income"
  if (desc.includes("food") || desc.includes("swiggy") || desc.includes("zomato") || desc.includes("restaurant"))
    return "Food & Dining"
  if (desc.includes("grocery") || desc.includes("supermarket") || desc.includes("vegetables")) return "Groceries"
  if (desc.includes("fuel") || desc.includes("petrol") || desc.includes("diesel") || desc.includes("gas")) return "Fuel"
  if (desc.includes("movie") || desc.includes("entertainment") || desc.includes("netflix") || desc.includes("spotify"))
    return "Entertainment"
  if (desc.includes("medical") || desc.includes("hospital") || desc.includes("pharmacy") || desc.includes("doctor"))
    return "Healthcare"
  if (desc.includes("shopping") || desc.includes("amazon") || desc.includes("flipkart") || desc.includes("myntra"))
    return "Shopping"
  if (desc.includes("transport") || desc.includes("uber") || desc.includes("ola") || desc.includes("metro"))
    return "Transportation"
  if (desc.includes("recharge") || desc.includes("mobile") || desc.includes("internet") || desc.includes("wifi"))
    return "Utilities"
  if (desc.includes("rent") || desc.includes("emi") || desc.includes("loan")) return "Rent/EMI"

  return "Others"
}

function analyzeUpiTransactions(csvContent: string): UpiAnalysis {
  try {
    // Parse CSV with flexible column mapping
    const records = parse(csvContent, {
      columns: true,
      skip_empty_lines: true,
      trim: true,
    })

    if (records.length === 0) {
      throw new Error("No transactions found in CSV")
    }

    // Detect column names (case-insensitive)
    const firstRecord = records[0]
    const columnMap: Record<string, string> = {}

    Object.keys(firstRecord).forEach((key) => {
      const lowerKey = key.toLowerCase()
      if (lowerKey.includes("date")) columnMap.date = key
      if (lowerKey.includes("amount")) columnMap.amount = key
      if (lowerKey.includes("type") || lowerKey.includes("transaction")) columnMap.type = key
      if (lowerKey.includes("description") || lowerKey.includes("narration") || lowerKey.includes("details"))
        columnMap.description = key
      if (lowerKey.includes("balance")) columnMap.balance = key
    })

    // Validate required columns
    if (!columnMap.date || !columnMap.amount || !columnMap.description) {
      throw new Error("Required columns missing. Please ensure CSV has Date, Amount, and Description columns.")
    }

    const transactions: UpiTransaction[] = records
      .map((record: any) => {
        const amount = Math.abs(Number.parseFloat(record[columnMap.amount] || "0"))
        let type: "credit" | "debit" = "debit"

        // Determine transaction type
        if (columnMap.type) {
          const typeValue = record[columnMap.type].toLowerCase()
          type = typeValue.includes("credit") ? "credit" : "debit"
        } else {
          // Infer from description or amount sign
          const desc = record[columnMap.description].toLowerCase()
          if (desc.includes("credit") || desc.includes("salary") || desc.includes("refund")) {
            type = "credit"
          }
        }

        return {
          date: record[columnMap.date],
          amount,
          type,
          description: record[columnMap.description] || "",
          balance: columnMap.balance ? Number.parseFloat(record[columnMap.balance] || "0") : undefined,
        }
      })
      .filter((t) => t.amount > 0) // Remove zero amount transactions

    // Group transactions by month
    const monthlyData: {
      [key: string]: { credits: number; debits: number; count: number; transactions: UpiTransaction[] }
    } = {}
    const spendingCategories: Record<string, number> = {}

    transactions.forEach((transaction) => {
      const monthKey = transaction.date.substring(0, 7) // YYYY-MM format
      if (!monthlyData[monthKey]) {
        monthlyData[monthKey] = { credits: 0, debits: 0, count: 0, transactions: [] }
      }

      monthlyData[monthKey].transactions.push(transaction)
      monthlyData[monthKey].count++

      if (transaction.type === "credit") {
        monthlyData[monthKey].credits += transaction.amount
      } else {
        monthlyData[monthKey].debits += transaction.amount

        // Categorize spending
        const category = categorizeTransaction(transaction.description)
        spendingCategories[category] = (spendingCategories[category] || 0) + transaction.amount
      }
    })

    const months = Object.keys(monthlyData).sort()
    const avgMonthlySpending =
      months.length > 0 ? months.reduce((sum, month) => sum + monthlyData[month].debits, 0) / months.length : 0

    const avgMonthlyIncome =
      months.length > 0 ? months.reduce((sum, month) => sum + monthlyData[month].credits, 0) / months.length : 0

    // Calculate spending consistency (coefficient of variation)
    const spendingVariance =
      months.length > 1
        ? months.reduce((sum, month) => {
            const diff = monthlyData[month].debits - avgMonthlySpending
            return sum + diff * diff
          }, 0) / months.length
        : 0

    const spendingStdDev = Math.sqrt(spendingVariance)
    const coefficientOfVariation = avgMonthlySpending > 0 ? spendingStdDev / avgMonthlySpending : 1
    const consistentSpending = coefficientOfVariation < 0.3 // Less than 30% variation

    // Check for regular income
    const incomeMonths = months.filter((month) => monthlyData[month].credits > avgMonthlySpending * 0.5)
    const regularIncome = incomeMonths.length >= months.length * 0.7 // Income in 70% of months

    // Calculate financial stability score (0-100)
    let stabilityScore = 0
    if (consistentSpending) stabilityScore += 25
    if (regularIncome) stabilityScore += 25
    if (avgMonthlyIncome > avgMonthlySpending) stabilityScore += 20 // Positive cash flow
    if (transactions.length > 50) stabilityScore += 15 // Good transaction history
    if (avgMonthlySpending > 5000 && avgMonthlySpending < 100000) stabilityScore += 15 // Reasonable spending range

    // Monthly trends
    const monthlyTrends = months.map((month) => ({
      month,
      income: monthlyData[month].credits,
      spending: monthlyData[month].debits,
      netFlow: monthlyData[month].credits - monthlyData[month].debits,
    }))

    // Largest expenses
    const largestExpenses = transactions
      .filter((t) => t.type === "debit")
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 5)
      .map((t) => ({
        description: t.description,
        amount: t.amount,
        date: t.date,
      }))

    return {
      totalTransactions: transactions.length,
      avgMonthlySpending: Math.round(avgMonthlySpending),
      avgMonthlyIncome: Math.round(avgMonthlyIncome),
      consistentSpending,
      regularIncome,
      financialStability: Math.min(stabilityScore, 100),
      spendingCategories,
      monthlyTrends,
      largestExpenses,
    }
  } catch (error) {
    console.error("UPI parsing error:", error)
    throw new Error(`Failed to parse UPI CSV: ${error instanceof Error ? error.message : "Unknown error"}`)
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("upiCsv") as File

    if (!file) {
      return NextResponse.json(
        {
          success: false,
          message: "No UPI CSV file provided",
          format: "Required format: Date, Amount, Description, Type (optional)",
        },
        { status: 400 },
      )
    }

    if (!file.name.toLowerCase().endsWith(".csv")) {
      return NextResponse.json(
        {
          success: false,
          message: "Please upload a CSV file only",
        },
        { status: 400 },
      )
    }

    const csvContent = await file.text()

    if (csvContent.trim().length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "CSV file is empty",
        },
        { status: 400 },
      )
    }

    const analysis = analyzeUpiTransactions(csvContent)

    return NextResponse.json({
      success: true,
      analysis,
      message: `Successfully analyzed ${analysis.totalTransactions} transactions`,
    })
  } catch (error) {
    console.error("UPI analysis error:", error)
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Failed to analyze UPI transactions",
        format:
          "Required CSV format: Date (YYYY-MM-DD), Amount (number), Description (text), Type (Credit/Debit - optional)",
      },
      { status: 500 },
    )
  }
}
