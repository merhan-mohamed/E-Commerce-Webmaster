"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { setAuth } from "@/features/auth/authSlice";

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const dispatch = useDispatch();
  const router = useRouter();
  const [Name, setName] = useState("");
  const [Phone, setPhone] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [error, setError] = useState("");
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Name,
          Phone,
          Email,
          Password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        const AccessToken = data.AccessToken;
        const userId = data.user.id;
        localStorage.setItem("AccessToken", AccessToken);
        localStorage.setItem("userId", userId);
        dispatch(setAuth({ AccessToken, userId }));
        router.push("/");
      } else {
        setError(data.message || "حدث خطأ أثناء التسجيل");
      }
    } catch (err: Error | unknown) {
      const message = err instanceof Error ? err.message : "Server Error";
      setError(message);
    }
  };
  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      {...props}
      onSubmit={handleRegister}
    >
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold text-primary">
            Create your account
          </h1>
          <p className="text-muted-foreground text-sm text-balance">
            Fill in the form below to create your account
          </p>
        </div>
        <Field>
          <FieldLabel htmlFor="name"> Name</FieldLabel>
          <Input
            id="name"
            type="text"
            placeholder="John Doe"
            required
            value={Name}
            onChange={(e) => setName(e.target.value)}
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="name"> Phone</FieldLabel>
          <Input
            id="phone"
            type="text"
            placeholder="01012345678"
            required
            value={Phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            required
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <FieldDescription>
            We&apos;ll use this to contact you. We will not share your email
            with anyone else.
          </FieldDescription>
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
          <FieldDescription>
            Must be at least 8 characters long.
          </FieldDescription>
        </Field>
        <Field>
          <Button type="submit">Create Account</Button>
        </Field>
        <Field>
        {error && <p className="text-center text-red-500">{error}</p>}
          <FieldDescription className="px-6 text-center">
            Already have an account? <Link href="/auth/login">Sign in</Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}
