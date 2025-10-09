import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/router";
import { useEffect, ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // If loading is finished and user is not authenticated, redirect.
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isLoading, isAuthenticated, router]);

  // While loading, show a loading spinner or some placeholder content.
  if (isLoading) {
    return <div className="text-center py-20">Loading...</div>;
  }

  // If authenticated, render the children.
  // If not authenticated, the useEffect will have already started the redirect,
  // so we can render null or a loading spinner to avoid flashing content.
  if (isAuthenticated) {
    return <>{children}</>;
  }

  return <div className="text-center py-20">Loading...</div>; // Or null
}
