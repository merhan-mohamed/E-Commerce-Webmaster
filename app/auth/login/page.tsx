
import { LoginForm } from "@/components/login-form"
import Image from "next/image"
export default function LoginPage() {
    return (
        <div className="flex h-screen max-lg:flex-col">
            <div className="flex flex-col gap-4 p-6 md:p-10 flex-1 ">
                <div className="flex flex-1 items-center justify-center">
                    <div className="w-full max-w-xs ">
                        <LoginForm />
                    </div>
                </div>
            </div>
            <div className="relative flex-1 hidden lg:block">
                <Image
                    src="/AuthImage.jpg"
                    alt="Image"
                    width={400}
                    height={400}
                    className=" object-cover w-full h-full"
                />
            </div>
        </div>
    )
}
