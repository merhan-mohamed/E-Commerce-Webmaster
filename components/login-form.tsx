"use client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { useRouter } from "next/navigation"
import { setAuth } from "@/features/auth/authSlice"
import { getLocalCart, clearLocalCart } from "@/lib/cartLocal"

export function LoginForm({
    className,
    ...props
}: React.ComponentProps<"form">) {
    const dispatch = useDispatch()
    const router = useRouter()
    const [Phone, setPhone] = useState("")
    const [Password, setPassword] = useState("")
    const [error, setError] = useState("")

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")
        try {
            const res = await fetch("/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    Phone,
                    Password,
                }),
            })

            const data = await res.json()

            if (res.ok) {
                const AccessToken = data.AccessToken
                const userId = data.user.id
                // client-side token policy: 10 minutes expiry from now
                const expiresAt = Date.now() + 10 * 60 * 1000
                localStorage.setItem("AccessToken", AccessToken)
                localStorage.setItem("userId", userId)
                localStorage.setItem("expiresAt", String(expiresAt))
                dispatch(setAuth({ AccessToken, userId, expiresAt }))

                // Sync any guest cart items to the server cart
                try {
                    const localItems = getLocalCart();
                    if (localItems.length) {
                        await Promise.all(
                            localItems.map((it) =>
                                fetch("/api/cart/add-cart", {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json",
                                        Authorization: `Bearer ${AccessToken}`,
                                    },
                                    body: JSON.stringify({
                                        userId,
                                        productId: it.productId,
                                        quantity: it.quantity || 1,
                                    }),
                                })
                            )
                        );
                        clearLocalCart();
                    }
                } catch (syncErr) {
                    console.warn("Cart sync after login encountered an issue", syncErr);
                }

                router.push("/")
            } else {
                setError(data.message || "حدث خطأ أثناء تسجيل الدخول")
            }
        } catch (err: Error | unknown) {
    const message = err instanceof Error ? err.message : "Server Error";
    setError(message);
  }
    }

    return (
        <form className={cn("flex flex-col gap-6", className)} {...props} onSubmit={handleLogin}>
            <FieldGroup>
                <div className="flex flex-col items-center gap-1 text-center p-3">
                    <h1 className="text-2xl font-bold text-primary">Login to your account</h1>
                    <p className="text-muted-foreground text-sm text-balance">
                        Enter your phone and password to login
                    </p>
                </div>
                <Field>
                    <FieldLabel htmlFor="phone">Phone</FieldLabel>
                    <Input
                        id="phone"
                        type="text"
                        placeholder="01015121678"
                        required
                        value={Phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </Field>
                <Field>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <Input
                        id="password"
                        type="password"
                        required
                        value={Password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Field>
                <Field>
                    <Button type="submit" variant="default">
                        Login
                    </Button>
                </Field>
                {
                    error &&(
                        <p className="text-center text-red-500">{error}</p>
                    )
                }
                <Field>
                    <FieldDescription className="text-center">
                        Don&apos;t have an account?{" "}
                        <Link href="/auth/register" className="underline underline-offset-4">
                            Sign up
                        </Link>
                    </FieldDescription>
                </Field>
            </FieldGroup>
        </form>
    )
}
