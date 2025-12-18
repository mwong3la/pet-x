import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password, name, phone } = body

    // Validate required fields
    if (!email || !password || !name || !phone) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    // Validate password length
    if (password.length < 8) {
      return NextResponse.json({ error: "Password must be at least 8 characters" }, { status: 400 })
    }

    // TODO: Hash password and store in database
    // For now, we'll simulate a successful registration
    console.log("[v0] Registration attempt:", { email, name, phone })

    // Simulate database operation
    await new Promise((resolve) => setTimeout(resolve, 500))

    // TODO: Create session/JWT token
    const user = {
      id: Date.now().toString(),
      email,
      name,
      phone,
    }

    return NextResponse.json(
      {
        success: true,
        user,
        message: "Account created successfully",
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("[v0] Registration error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
