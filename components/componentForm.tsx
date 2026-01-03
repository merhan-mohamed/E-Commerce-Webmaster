"use client"
import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import Link from "next/link"

    export default function ContactForm() {
  const [Name, setName] = useState("")
  const [Email, setEmail] = useState("")
  const [Phone, setPhone] = useState("")
  const [Message, setMessage] = useState("")
  const [error, setError] = useState<string>("")
  const [success, setSuccess] = useState<string>("")
  const [loading, setLoading] = useState(false)
  const [hasToken, setHasToken] = useState<boolean>(false)

  // Detect sign-in status from localStorage token
  useEffect(() => {
    if (typeof window === "undefined") return
    const token = localStorage.getItem("AccessToken")
    setHasToken(!!token)

    const onStorage = (e: StorageEvent) => {
      if (e.key === "AccessToken") {
        setHasToken(!!e.newValue)
      }
    }
    window.addEventListener("storage", onStorage)
    return () => window.removeEventListener("storage", onStorage)
  }, [])

  const handleContact = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")
    try {
      // Get auth token if user is logged in
      const AccessToken = typeof window !== "undefined" ? localStorage.getItem("AccessToken") : null

      // Block submit if not signed in
      if (!AccessToken) {
        // Don't show the bottom error; rely on the banner + disabled button
        return
      }
      setLoading(true)

      const res = await fetch("/api/contact-us/add-ContactUs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(AccessToken ? { Authorization: `Bearer ${AccessToken}` } : {}),
        },
        body: JSON.stringify({ Name, Phone, Email, Message }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data?.message || "Failed to send message")
        return
      }

      setSuccess(data?.message || "Your message has been sent successfully.")
      // Reset form
      setName("")
      setEmail("")
      setPhone("")
      setMessage("")
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Server Error"
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className="max-w-2xl mx-auto text-left space-y-5" onSubmit={handleContact}>
      {!hasToken && (
        <div className="w-full rounded-md border border-amber-300 bg-amber-50 p-3 text-amber-900">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm">
              You are not signed in. Please
              {" "}
              <Link href="/auth/login" className="underline underline-offset-4 text-amber-900 font-medium">
                sign in
              </Link>
              {" "}
              to send a message.
            </p>
            <Link href="/auth/login">
              <Button size="sm" variant="default" className="bg-primary text-white">
                Go to Login
              </Button>
            </Link>
          </div>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
        <div className="space-y-1.5">
          <Label htmlFor="name" className="text-sm text-main">
            Name
          </Label>
          <Input
            id="name"
            type="text"
            required
            value={Name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-bgsoft p-2.5 focus:outline-none focus:ring-1 focus:ring-bluemain transition-all duration-200"
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="email" className="text-sm text-main">Email</Label>
          <Input
            id="email"
            type="email"
            required
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-bgsoft p-2.5 focus:outline-none focus:ring-1 focus:ring-bluemain transition-all duration-200"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="phone" className="block mb-1 text-sm text-main">
          Phone number
        </Label>
        <Input
          id="phone"
          type="text"
          required
          value={Phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full bg-bgsoft p-2.5 focus:outline-none focus:ring-1 focus:ring-bluemain transition-all duration-200"
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="message" className="block mb-1 text-sm text-main">
          Your message
        </Label>
        <Textarea
          id="message"
          rows={6}
          required
          value={Message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full bg-bgsoft border border-grayborder p-2.5 focus:outline-none focus:ring-1 focus:ring-bluemain transition-all duration-200 resize-none"
        />
      </div>

      <div className="space-y-2">
        <Button
          type="submit"
          size="lg"
          disabled={loading || !hasToken}
          className="bg-primary text-white text-sm cursor-pointer disabled:opacity-70"
        >
          {loading ? "Sending..." : "Send message"}
        </Button>
        {!hasToken && (
          <div>
            <Link href="/auth/login">
              <Button variant="outline" size="sm">
                Login to send a message
              </Button>
            </Link>
          </div>
        )}
        {hasToken && error && <p className="text-red-500 text-sm">{error}</p>}
        {success && <p className="text-green-600 text-sm">{success}</p>}
      </div>
    </form>
  )
}
