'use client';

import { useState } from 'react';
import { Link as LinkType } from '../types';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/axios';
import { toast } from 'sonner';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface AccessSettingsProps {
  link: LinkType;
}

export function AccessSettings({ link }: AccessSettingsProps) {
  const [visibility, setVisibility] = useState<'public' | 'request' | 'private'>(link.visibility);
  const [approvalMode, setApprovalMode] = useState<'manual' | 'auto' | 'domain'>(link.approvalMode);
  const [approvedDomain, setApprovedDomain] = useState<string>(link.approvedDomain || '');
  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: (data: {
      visibility: 'public' | 'request' | 'private';
      approvalMode: 'manual' | 'auto' | 'domain';
      approvedDomain?: string;
    }) => {
      return api.patch(`/links/${link._id}`, data);
    },
    onSuccess: () => {
      toast.success('Access settings updated successfully');
      queryClient.invalidateQueries({ queryKey: ['manageLink', link._id] });
    },
    onError: (error: any) => {
      toast.error('Failed to update access settings', {
        description: error.message || 'An unexpected error occurred',
      });
    },
  });

  const handleSubmit = () => {
    const data: any = {
      visibility,
      approvalMode,
    };

    if (approvalMode === 'domain') {
      if (!approvedDomain) {
        toast.error('Approved domain is required when domain approval mode is selected');
        return;
      }
      data.approvedDomain = approvedDomain;
    }

    updateMutation.mutate(data);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Access Settings</CardTitle>
        <CardDescription>
          Control who can access your link and how access requests are handled.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="visibility">Visibility</Label>
          <Select
            value={visibility}
            onValueChange={(value: 'public' | 'request' | 'private') => setVisibility(value)}
            disabled={updateMutation.isPending}
          >
            <SelectTrigger id="visibility">
              <SelectValue placeholder="Select visibility" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="public">Public (Anyone can access)</SelectItem>
              <SelectItem value="request">Request (Users must request access)</SelectItem>
              <SelectItem value="private">Private (Only you can access)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {visibility === 'request' && (
          <div className="space-y-2">
            <Label htmlFor="approvalMode">Approval Mode</Label>
            <Select
              value={approvalMode}
              onValueChange={(value: 'manual' | 'auto' | 'domain') => setApprovalMode(value)}
              disabled={updateMutation.isPending}
            >
              <SelectTrigger id="approvalMode">
                <SelectValue placeholder="Select approval mode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="manual">Manual (You approve each request)</SelectItem>
                <SelectItem value="auto">Auto (All requests are automatically approved)</SelectItem>
                <SelectItem value="domain">Domain (Approve based on email domain)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}

        {visibility === 'request' && approvalMode === 'domain' && (
          <div className="space-y-2">
            <Label htmlFor="approvedDomain">Approved Domain</Label>
            <Input
              id="approvedDomain"
              placeholder="example.com"
              value={approvedDomain}
              onChange={(e) => setApprovedDomain(e.target.value)}
              disabled={updateMutation.isPending}
            />
          </div>
        )}

        <Button
          onClick={handleSubmit}
          disabled={updateMutation.isPending}
          className="w-full"
        >
          {updateMutation.isPending ? 'Updating...' : 'Update Access Settings'}
        </Button>
      </CardContent>
    </Card>
  );
}