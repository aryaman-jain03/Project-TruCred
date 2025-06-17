import { type NextRequest, NextResponse } from "next/server"
import { readFile } from "fs/promises"
import path from "path"

export async function GET(request: NextRequest) {
  try {
    const dbPath = path.join(process.cwd(), "data", "assessments.json")

    let assessments = []
    try {
      const data = await readFile(dbPath, "utf-8")
      assessments = JSON.parse(data)
    } catch {
      assessments = []
    }

    return NextResponse.json({
      success: true,
      assessments: assessments.sort(
        (a: any, b: any) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime(),
      ),
    })
  } catch (error) {
    console.error("Failed to fetch assessments:", error)
    return NextResponse.json({ success: false, message: "Failed to fetch assessments" }, { status: 500 })
  }
}
