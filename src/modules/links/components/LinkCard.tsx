import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link as LinkType } from "../types";
import { Copy, Trash2, Settings, Users, BarChart, Share2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/src/lib/axios";
import { ShareModal } from "./ShareModal";

interface LinkCardProps {
  link: LinkType;
}

export function LinkCard({ link }: LinkCardProps) {
  const [shortUrl, setShortUrl] = useState("");
  const queryClient = useQueryClient();

  useEffect(() => {
    setShortUrl(`${window.location.origin}/link/${link.shortUrl}`);
  }, [link.shortUrl]);

  const copyToClipboard = () => {
    if (!shortUrl) return;
    navigator.clipboard.writeText(shortUrl);
    toast.success("Short URL copied to clipboard!");
  };

  const deleteMutation = useMutation({
    mutationFn: (linkId: string) => api.delete(`/links/${linkId}`),
    onSuccess: () => {
      toast.success("Link deleted successfully.");
      queryClient.invalidateQueries({ queryKey: ["links"] });
    },
    onError: (error: any) => {
      toast.error("Failed to delete link.", {
        description: error.message || "An unexpected error occurred.",
      });
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>{link.title}</CardTitle>
        <CardDescription>
          <a
            href={link.destinationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            {link.destinationUrl}
          </a>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium">Short URL</p>
          <div className="flex items-center gap-2">
            <a
              href={shortUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-primary hover:underline"
            >
              {shortUrl}
            </a>
            <Button variant="ghost" size="icon" onClick={copyToClipboard}>
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span>{link.pendingRequestCount} Pending Requests</span>
          </div>
          <div className="flex items-center gap-2">
            <BarChart className="h-4 w-4 text-muted-foreground" />
            <span>{link.clickCount} Total Clicks</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <ShareModal shortUrl={shortUrl}>
          <Button variant="ghost">
            <Share2 className="mr-2 h-4 w-4" /> Share
          </Button>
        </ShareModal>
        <Button variant="outline" asChild>
          <Link href={`/manage/${link._id}`}>
            <Settings className="mr-2 h-4 w-4" /> Manage
          </Link>
        </Button>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive">
              <Trash2 className="mr-2 h-4 w-4" /> Delete
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete this
                link and all associated data.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => deleteMutation.mutate(link._id)}
                disabled={deleteMutation.isPending}
              >
                {deleteMutation.isPending ? "Deleting..." : "Delete"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
}
