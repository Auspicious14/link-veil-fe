import { useQuery } from "@tanstack/react-query";
import { LinkCard } from "@/modules/links/components/LinkCard";
import { LinkCardSkeleton } from "@/modules/links/components/LinkCardSkeleton";
import { Link as LinkType } from "@/modules/links/types";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PlusCircle } from "lucide-react";
import api from "@/lib/axios";
import ProtectedRoute from "@/components/layout/ProtectedRoute";

const fetchLinks = async (): Promise<LinkType[]> => {
  const response = await api.get("/links");
  const links = response.data.data || [];
  
  // Transform backend data to match frontend expectations
  return links.map((link: LinkType) => ({
    ...link,
    destinationUrl: link.url,
    shortUrl: link.shortId,
    // Calculate pending request count if not provided
    pendingRequestCount: link.pendingRequestCount || 0
  }));
};

function DashboardContent() {
  const { data: links, isLoading, error } = useQuery({
    queryKey: ["links"],
    queryFn: fetchLinks,
  });

  return (
    <div className="container mx-auto py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Your Links</h1>
          <p className="text-muted-foreground">
            Manage your shared links and view their performance.
          </p>
        </div>
        <Button asChild>
          <Link href="/create">
            <PlusCircle className="mr-2 h-4 w-4" />
            Create New Link
          </Link>
        </Button>
      </div>

      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <LinkCardSkeleton key={i} />
          ))}
        </div>
      )}
      {error && <p className="text-destructive">Error loading links.</p>}

      {!isLoading && links && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {links.map((link) => (
            <LinkCard key={link._id} link={link} />
          ))}
        </div>
      )}

      {!isLoading && !error && links && links.length === 0 && (
        <div className="text-center py-20 border-2 border-dashed rounded-lg">
          <h2 className="text-xl font-semibold">No links yet</h2>
          <p className="text-muted-foreground mt-2">
            Get started by creating your first private link.
          </p>
          <Button asChild className="mt-6">
            <Link href="/create">Create Link</Link>
          </Button>
        </div>
      )}
    </div>
  );
}

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}