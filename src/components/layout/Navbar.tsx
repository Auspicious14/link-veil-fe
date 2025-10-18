import Link from "next/link";
import { Button } from "../ui/button";
import Image from "next/image";
import { useAuth } from "@/hooks/useAuth";

export default function Navbar() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav className="bg-white shadow-sm py-2">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="text-xl font-bold text-primary">
          <Image
            src="/link-veil-logo.png"
            alt="LinkVeil"
            width={100}
            height={50}
          />
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
              <Button asChild variant="ghost">
                <Link href="/login">Log In</Link>
              </Button>
              <Button asChild>
                <Link href="/signup">Sign Up</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
