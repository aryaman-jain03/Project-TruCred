import { type NextRequest, NextResponse } from "next/server"
import { readFile, writeFile } from "fs/promises"
import path from "path"

export async function POST(request: NextRequest) {
  try {
    const { id, status, notes } = await request.json()

    const dbPath = path.join(process.cwd(), "data", "assessments.json")

    let assessments = []
    try {
      const data = await readFile(dbPath, "utf-8")
      assessments = JSON.parse(data)
    } catch {
      return NextResponse.json({ success: false, message: "No assessments found" }, { status: 404 })
    }

    const assessmentIndex = assessments.findIndex((a: any) => a.id === id)
    if (assessmentIndex === -1) {
      return NextResponse.json({ success: false, message: "Assessment not found" }, { status: 404 })
    }

    assessments[assessmentIndex].status = status
    assessments[assessmentIndex].verifiedAt = new Date().toISOString()
    if (notes) {
      assessments[assessmentIndex].verificationNotes = notes
    }

    await writeFile(dbPath, JSON.stringify(assessments, null, 2))

    // If verified, trigger score calculation and PDF generation
    if (status === "verified") {
      // You can add additional logic here to automatically generate
      // the final score and send email notification
    }

    return NextResponse.json({
      success: true,
      message: "Assessment status updated successfully",
    })
  } catch (error) {
    console.error("Failed to update assessment status:", error)
    return NextResponse.json({ success: false, message: "Failed to update status" }, { status: 500 })
  }
}
