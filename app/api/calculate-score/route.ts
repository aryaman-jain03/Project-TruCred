import { type NextRequest, NextResponse } from "next/server"

interface ScoreComponents {
  recurringPayments: number
  mobileRecharge: number
  utilityBill: number
  upiConsistency: number
  referenceFeedback: number
}

interface ScoreBreakdown {
  total: number
  components: ScoreComponents
  grade: string
  recommendations: string[]
}

function calculateScore(data: any): ScoreBreakdown {
  const components: ScoreComponents = {
    recurringPayments: 0,
    mobileRecharge: 0,
    utilityBill: 0,
    upiConsistency: 0,
    referenceFeedback: 0,
  }

  // Recurring payments (0-30 points)
  components.recurringPayments = Math.min(data.rentMonths * 2.5, 30)

  // Mobile recharge (0-20 points)
  components.mobileRecharge = data.mobileRecharge === "yes" ? 20 : 0

  // Utility bill (0-15 points)
  components.utilityBill = data.utilityBill === "yes" ? 15 : 0

  // UPI consistency (0-20 points)
  components.upiConsistency = data.upiConsistency ? 20 : 0

  // Reference feedback (0-15 points)
  if (data.referenceFeedback === "positive") components.referenceFeedback = 15
  else if (data.referenceFeedback === "neutral") components.referenceFeedback = 10
  else if (data.referenceFeedback === "negative") components.referenceFeedback = 3

  const total = Object.values(components).reduce((sum, score) => sum + score, 0)

  let grade = "D"
  if (total >= 85) grade = "A+"
  else if (total >= 75) grade = "A"
  else if (total >= 65) grade = "B+"
  else if (total >= 55) grade = "B"
  else if (total >= 45) grade = "C+"
  else if (total >= 35) grade = "C"

  const recommendations = generateRecommendations(components, total)

  return {
    total: Math.round(total),
    components,
    grade,
    recommendations,
  }
}

function generateRecommendations(components: ScoreComponents, total: number): string[] {
  const recommendations = []

  if (components.recurringPayments < 25) {
    recommendations.push("Maintain consistent rent/EMI payments to improve your score")
  }

  if (components.mobileRecharge === 0) {
    recommendations.push("Regular mobile recharges show financial discipline")
  }

  if (components.utilityBill === 0) {
    recommendations.push("Having utility bills in your name demonstrates financial responsibility")
  }

  if (components.upiConsistency === 0) {
    recommendations.push("Upload UPI transaction history to show spending consistency")
  }

  if (total < 50) {
    recommendations.push("Consider building a stronger financial track record over the next few months")
  }

  return recommendations
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const scoreBreakdown = calculateScore(data)

    return NextResponse.json({
      success: true,
      score: scoreBreakdown,
    })
  } catch (error) {
    console.error("Score calculation error:", error)
    return NextResponse.json({ success: false, message: "Failed to calculate score" }, { status: 500 })
  }
}
