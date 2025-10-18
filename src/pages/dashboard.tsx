import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import api from "@/lib/axios";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

import { LinkCard } from "@/modules/links/components/LinkCard";
import { Link } from "@/modules/links/types";

export default function DashboardPage() {
  const router = useRouter();
  const [links, setLinks] = useState<Link[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchLinks() {
      try {
        const response = await api.get("/links");
        if (response.data.success) {
          setLinks(response.data.data);
        }
      } catch (error) {
        toast.error("Failed to fetch links", {
          description:
            (error as any).response?.data?.message || "An error occurred.",
        });
        if ((error as any).response?.status === 401) {
          localStorage.removeItem("token");
          router.push("/login");
        }
      } finally {
        setIsLoading(false);
      }
    }

    fetchLinks();
  }, [router]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!", {
      description: text,
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="container flex items-center justify-between h-16 px-4 mx-auto">
          <h1 className="text-2xl font-bold text-primary">Dashboard</h1>
        </div>
      </header>
      <main className="container p-4 mx-auto mt-6">
        {links.length === 0 ? (
          <div className="text-center">
            <p className="text-lg text-gray-500">
              You haven&apos;t created any links yet.
            </p>
            <Button onClick={() => router.push("/create")} className="mt-4">
              Create your first link
            </Button>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {links.map((link) => (
              <LinkCard key={link.shortId} link={link} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
