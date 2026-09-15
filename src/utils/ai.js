const BASE = import.meta.env.VITE_API_URL

export async function askAI({ question, activeFile, history = [] }) {
    const res = await fetch(`${BASE}/api/ai/ask`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question, activeFile, history }),
    })

    if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body.error || `Request failed (${res.status})`)
    }

    const data = await res.json()
    return data.answer
}