import Link from "next/link";
import { Button } from "../ui/button";
import Image from "next/image";
import { useAuth } from "@/hooks/useAuth";

export default function Navbar() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav className="border-b supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between">
        <Link href="/" className="font-bold text-lg">
          LinkVeil
        </Link>
        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <>
              {/* <Button asChild variant="ghost">
                <Link href="/dashboard">Dashboard</Link>
              </Button> */}
              <Button asChild>
                <Link href="/create">Create Link</Link>
              </Button>
              <Button variant="outline" size="sm" onClick={logout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button asChild>
                <Link href="/signup">Get started</Link>
              </Button>
              <Button asChild variant="secondary">
                <Link href="/login">Sign in</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
