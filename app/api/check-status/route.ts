import { type NextRequest, NextResponse } from "next/server"
import { readFile } from "fs/promises"
import path from "path"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ success: false, message: "Assessment ID is required" }, { status: 400 })
    }

    const dbPath = path.join(process.cwd(), "data", "assessments.json")

    let assessments = []
    try {
      const data = await readFile(dbPath, "utf-8")
      assessments = JSON.parse(data)
    } catch {
      return NextResponse.json({ success: false, message: "No assessments found" }, { status: 404 })
    }

    const assessment = assessments.find((a: any) => a.id === id)
    if (!assessment) {
      return NextResponse.json({ success: false, message: "Assessment not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      status: assessment.status,
      verifiedAt: assessment.verifiedAt || null,
    })
  } catch (error) {
    console.error("Failed to check assessment status:", error)
    return NextResponse.json({ success: false, message: "Failed to check status" }, { status: 500 })
  }
}
