import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";
import ProtectedRoute from "@/components/layout/ProtectedRoute";
import { AuthProvider } from "@/hooks/useAuth";

const queryClient = new QueryClient();

const protectedRoutes = ["/dashboard", "/create"];

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isProtectedRoute = protectedRoutes.includes(router.pathname);

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
              {isProtectedRoute ? (
                <ProtectedRoute>
                  <Component {...pageProps} />
                </ProtectedRoute>
              ) : (
                <Component {...pageProps} />
              )}
            </main>
            <Footer />
          </div>
          <Toaster />
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
