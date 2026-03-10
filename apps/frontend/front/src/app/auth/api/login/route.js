// app/api/auth/login/route.js
import { NextResponse } from "next/server"

export async function POST(req) {
    const { username, password } = await req.json()

    // простий приклад: перевірка логіна
    if (username === "admin" && password === "123") {
        return NextResponse.json({ token: "abc123", user: { username } })
    } else {
        return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }
}