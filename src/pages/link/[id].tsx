import { useRouter } from "next/router";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { Link as LinkType } from "@/modules/links/types";
import api from "@/lib/axios";
import { toast } from "sonner";

const fetchLink = async (id: string): Promise<LinkType> => {
  const { data } = await api.get(`/links/${id}`);
  return data;
};

export default function PublicLinkPage() {
  const router = useRouter();
  const { id } = router.query;

  const { data: link, isLoading, error } = useQuery({
    queryKey: ["link", id],
    queryFn: () => fetchLink(id as string),
    enabled: !!id,
    retry: false,
  });

  const requestAccessMutation = useMutation({
    mutationFn: () => api.post("/requests", { linkId: id }),
    onSuccess: () => {
      toast.success("Your request has been sent!", {
        description: "The creator has been notified. You will get access once your request is approved.",
      });
    },
    onError: (error) => {
      toast.error("Failed to send request", {
        description: error.message || "Please try again.",
      });
    }
  });

  useEffect(() => {
    if (link && !link.requireApproval) {
      // If no approval is required, redirect immediately
      window.location.href = link.destinationUrl;
    }
    // A real implementation would also check if the user is already approved.
    // For this implementation, we assume if requireApproval is true, the user needs to request access.
  }, [link]);

  if (isLoading) {
    return <div className="text-center py-20">Loading link...</div>;
  }

  if (error) {
    return <div className="text-center py-20 text-destructive">Error: Link not found or invalid.</div>;
  }

  if (!link) {
    return null; // or a loading state
  }

  // If link is public, it would have already redirected via useEffect.
  // This content is for private links.
  if (!link.requireApproval) {
    return <div className="text-center py-20">Redirecting...</div>
  }

  return (
    <div className="container mx-auto flex items-center justify-center min-h-[calc(100vh-8rem)]">
      <div className="text-center max-w-lg">
        <h1 className="text-3xl font-bold tracking-tight mb-4">{link.title}</h1>

        {requestAccessMutation.isSuccess ? (
          <div>
            <p className="text-lg text-green-600 mb-4">Request Sent!</p>
            <p className="text-muted-foreground">You will be notified once the creator approves your request.</p>
          </div>
        ) : (
          <div>
            <p className="text-lg text-muted-foreground mb-8">This link is private and requires approval from the creator.</p>
            <Button
              size="lg"
              onClick={() => requestAccessMutation.mutate()}
              disabled={requestAccessMutation.isPending}
            >
              {requestAccessMutation.isPending ? "Requesting..." : "Request Access"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}