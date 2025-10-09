import { useRouter } from "next/router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { RequestList } from "@/modules/requests/components/RequestList";
import { Link as LinkType } from "@/modules/links/types";
import { Request } from "@/modules/requests/types";
import api from "@/lib/axios";
import { toast } from "sonner";

const fetchLinkData = async (id: string) => {
  const [linkRes, requestsRes] = await Promise.all([
    api.get(`/links/${id}`),
    api.get(`/links/${id}/requests`),
  ]);
  return { link: linkRes.data as LinkType, requests: requestsRes.data as Request[] };
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
        </div>

        {data && (
          <RequestList
            requests={data.requests}
            onApprove={handleApprove}
            onReject={handleReject}
          />
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