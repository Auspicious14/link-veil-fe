import { LoginForm } from "@/modules/auth/components/LoginForm";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="container mx-auto flex items-center justify-center py-12">
      <div className="mx-auto grid w-[350px] gap-6">
        <div className="grid gap-2 text-center">
          <h1 className="text-3xl font-bold">Log In</h1>
          <p className="text-balance text-muted-foreground">
            Enter your email below to log in to your account
          </p>
        </div>
        <LoginForm />
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="underline">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}