import { type NextRequest, NextResponse } from "next/server"
import { writeFile, mkdir } from "fs/promises"
import { existsSync } from "fs"
import path from "path"
import { v4 as uuidv4 } from "uuid"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()

    // Extract form fields
    const assessmentData = {
      id: uuidv4(),
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      rentMonths: Number.parseInt(formData.get("rentMonths") as string),
      mobileRecharge: formData.get("mobileRecharge") as string,
      utilityBill: formData.get("utilityBill") as string,
      referenceName: formData.get("referenceName") as string,
      referenceRelationship: formData.get("referenceRelationship") as string,
      referenceFeedback: formData.get("referenceFeedback") as string,
      submittedAt: new Date().toISOString(),
      status: "pending_verification",
    }

    // Handle file uploads
    const files = {
      rentProof: formData.get("rentProof") as File,
      mobileProof: formData.get("mobileProof") as File,
      utilityProof: formData.get("utilityProof") as File,
      upiCsv: formData.get("upiCsv") as File,
    }

    const uploadDir = path.join(process.cwd(), "uploads", assessmentData.id)
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true })
    }

    // Save files
    const savedFiles: Record<string, string> = {}
    for (const [key, file] of Object.entries(files)) {
      if (file && file.size > 0) {
        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)
        const filename = `${key}_${Date.now()}_${file.name}`
        const filepath = path.join(uploadDir, filename)
        await writeFile(filepath, buffer)
        savedFiles[key] = filepath
      }
    }

    // Save assessment data to database (using JSON file for demo)
    const dbPath = path.join(process.cwd(), "data", "assessments.json")
    const dbDir = path.dirname(dbPath)
    if (!existsSync(dbDir)) {
      await mkdir(dbDir, { recursive: true })
    }

    let assessments = []
    try {
      const existingData = await import(dbPath).catch(() => ({ default: [] }))
      assessments = existingData.default || []
    } catch {
      assessments = []
    }

    const fullAssessment = {
      ...assessmentData,
      files: savedFiles,
    }

    assessments.push(fullAssessment)
    await writeFile(dbPath, JSON.stringify(assessments, null, 2))

    return NextResponse.json({
      success: true,
      assessmentId: assessmentData.id,
      message: "Assessment submitted successfully. Files are being verified.",
    })
  } catch (error) {
    console.error("Assessment submission error:", error)
    return NextResponse.json({ success: false, message: "Failed to submit assessment" }, { status: 500 })
  }
}
