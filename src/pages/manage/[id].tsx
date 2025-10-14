import { useRouter } from "next/router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { RequestList } from "@/modules/requests/components/RequestList";
import { AccessSettings } from "@/modules/links/components/AccessSettings";
import { AccessStatus } from "@/modules/links/components/AccessStatus";
import { LinkStats } from "@/modules/links/components/LinkStats";
import { Link as LinkType } from "@/modules/links/types";
import { Request } from "@/modules/requests/types";
import api from "@/lib/axios";
import { toast } from "sonner";

const fetchLinkData = async (id: string) => {
  try {
    const [linkRes, requestsRes] = await Promise.all([
      api.get(`/links/${id}`),
      api.get(`/links/${id}/requests`),
    ]);
    
    // Handle the API response structure
    const linkData = linkRes.data.data || linkRes.data;
    const requestsData = requestsRes.data.data || requestsRes.data || [];
    
    // Transform backend data to match frontend expectations
    const transformedLink = {
      ...linkData,
      destinationUrl: linkData.url,
      shortUrl: linkData.shortId,
      requireApproval: linkData.visibility === 'request'
    };
    
    return { 
      link: transformedLink as LinkType, 
      requests: requestsData as Request[] 
    };
  } catch (error) {
    console.error('Error fetching link data:', error);
    throw error;
  }
};

import ProtectedRoute from "@/components/layout/ProtectedRoute";

function ManageLinkContent() {
  const router = useRouter();
  const { id } = router.query;
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["manageLink", id],
    queryFn: () => fetchLinkData(id as string),
    enabled: !!id,
  });

  const updateRequestMutation = useMutation({
    mutationFn: ({ requestId, status }: { requestId: string; status: "approved" | "rejected" }) => {
      return api.patch(`/requests/${requestId}`, { status });
    },
    onSuccess: () => {
      toast.success("Request status updated successfully.");
      queryClient.invalidateQueries({ queryKey: ["manageLink", id] });
    },
    onError: (error) => {
      toast.error("Failed to update request", {
        description: error.message || "An unexpected error occurred.",
      });
    },
  });

  const handleApprove = (requestId: string) => {
    updateRequestMutation.mutate({ requestId, status: "approved" });
  };

  const handleReject = (requestId: string) => {
    updateRequestMutation.mutate({ requestId, status: "rejected" });
  };

  if (isLoading) return <div className="text-center py-20">Loading...</div>;
  if (error) return <div className="text-center py-20 text-destructive">Error loading link data.</div>;

  return (
    <div className="container mx-auto py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <p className="text-sm text-muted-foreground">Managing Link</p>
          <h1 className="text-3xl font-bold tracking-tight">{data?.link?.title}</h1>
          <p className="text-muted-foreground mt-2">
            {data?.link?.destinationUrl || data?.link?.url}
          </p>
        </div>

        {data && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-semibold mb-4">Access Requests</h2>
              <RequestList
                requests={data.requests}
                onApprove={handleApprove}
                onReject={handleReject}
              />
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-4">Settings</h2>
              <div className="space-y-6">
                {data.link && (
                  <>
                    <LinkStats link={data.link} />
                    <AccessStatus link={data.link} />
                    <AccessSettings link={data.link} />
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ManageLinkPage() {
  return (
    <ProtectedRoute>
      <ManageLinkContent />
    </ProtectedRoute>
  );
}