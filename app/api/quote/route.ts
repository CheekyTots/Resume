import type { NextRequest } from "next/server"

export const dynamic = "force-dynamic" // ensure always fresh

export async function GET(_req: NextRequest) {
  try {
    const res = await fetch("https://api.quotable.io/random?tags=wisdom,philosophy,science", { cache: "no-store" })

    if (!res.ok) {
      throw new Error(`Upstream error ${res.status}`)
    }

    const data = await res.json()
    return Response.json({ text: data.content, author: data.author })
  } catch (err) {
    // graceful fallback
    return Response.json(
      {
        text: "The unexamined life is not worth living.",
        author: "Socrates",
        fallback: true,
      },
      { status: 200 },
    )
  }
}
