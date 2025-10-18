import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Button } from "../ui/button";
import Image from "next/image";

export default function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, [router.asPath]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    router.push("/login");
  };

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
              <Button variant="outline" size="sm" onClick={handleLogout}>
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
