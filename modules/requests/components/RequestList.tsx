import { Request } from "../types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, X } from "lucide-react";

interface RequestListProps {
  requests: Request[];
  onApprove: (requestId: string) => void;
  onReject: (requestId: string) => void;
}

export function RequestList({ requests, onApprove, onReject }: RequestListProps) {
  const pendingRequests = requests.filter((r) => r.status === "pending");
  const approvedRequests = requests.filter((r) => r.status === "approved");

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Pending Requests ({pendingRequests.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {pendingRequests.length > 0 ? (
            <ul className="space-y-4">
              {pendingRequests.map((request) => (
                <li key={request._id} className="flex items-center justify-between">
                  <p className="text-sm font-medium">{request.userIdentifier}</p>
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="outline" onClick={() => onApprove(request._id)}>
                      <Check className="h-4 w-4 mr-2" /> Approve
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => onReject(request._id)}>
                      <X className="h-4 w-4 mr-2" /> Reject
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground">No pending requests.</p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Approved Users ({approvedRequests.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {approvedRequests.length > 0 ? (
            <ul className="space-y-2">
              {approvedRequests.map((request) => (
                <li key={request._id} className="text-sm text-muted-foreground">
                  {request.userIdentifier}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground">No users have been approved yet.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}