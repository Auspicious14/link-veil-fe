import { useRouter } from "next/router";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { Link as LinkType } from "@/modules/links/types";
import { AccessRequestForm } from "@/modules/links/components/AccessRequestForm";
import api from "@/lib/axios";
import { toast } from "sonner";

const fetchLink = async (id: string): Promise<LinkType> => {
  try {
    const response = await api.get(`/links/${id}`);
    // Handle the API response structure
    const linkData = response.data.data || response.data;
    
    // Transform backend data to match frontend expectations
    return {
      ...linkData,
      destinationUrl: linkData.url,
      shortUrl: linkData.shortId,
      // For the public link page, we determine if approval is required based on visibility
      requireApproval: linkData.visibility === 'request'
    };
  } catch (error) {
    console.error('Error fetching link:', error);
    throw error;
  }
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
    if (!link) return;
    
    // If link is public, redirect immediately
    if (link.visibility === 'public') {
      window.location.href = link.destinationUrl || link.url;
      return;
    }
    
    // For private links, check if user is the owner (would require auth check)
    // For request links, we'll show the request access UI
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
  // This content is for private or request-based links.
  if (link.visibility === 'private') {
    return (
      <div className="container mx-auto flex items-center justify-center min-h-[calc(100vh-8rem)]">
        <div className="text-center max-w-lg">
          <h1 className="text-3xl font-bold tracking-tight mb-4">{link.title}</h1>
          <p className="text-lg text-muted-foreground mb-4">This link is private and can only be accessed by the owner.</p>
          <Button 
            variant="outline" 
            onClick={() => router.push('/')}
          >
            Return to Home
          </Button>
        </div>
      </div>
    );
  }

  // For links that require approval
  return (
    <div className="container mx-auto flex items-center justify-center min-h-[calc(100vh-8rem)]">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">{link.title}</h1>
          <p className="text-muted-foreground">This link requires approval from the creator.</p>
        </div>

        {requestAccessMutation.isSuccess ? (
          <div className="text-center p-6 border rounded-lg bg-muted/50">
            <p className="text-lg text-green-600 mb-4">Request Sent!</p>
            <p className="text-muted-foreground">You will be notified once the creator approves your request.</p>
          </div>
        ) : (
          <AccessRequestForm 
            link={link} 
            onRequestSubmitted={() => {
              // Refresh the query to get updated status
              requestAccessMutation.reset();
              requestAccessMutation.mutate();
            }} 
          />
        )}
      </div>
    </div>
  );
}