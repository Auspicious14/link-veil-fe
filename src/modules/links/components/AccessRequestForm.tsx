'use client';

import { useState } from 'react';
import { Link as LinkType } from '../types';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useMutation } from '@tanstack/react-query';
import api from '@/lib/axios';
import { toast } from 'sonner';

interface AccessRequestFormProps {
  link: LinkType;
  onRequestSubmitted?: () => void;
}

export function AccessRequestForm({ link, onRequestSubmitted }: AccessRequestFormProps) {
  const [email, setEmail] = useState('');

  const requestMutation = useMutation({
    mutationFn: (data: { email: string }) => {
      return api.post(`/links/${link._id}/request-access`, data);
    },
    onSuccess: () => {
      toast.success('Access request submitted successfully');
      setEmail('');
      if (onRequestSubmitted) {
        onRequestSubmitted();
      }
    },
    onError: (error: any) => {
      toast.error('Failed to submit access request', {
        description: error.response?.data?.message || 'An unexpected error occurred',
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error('Email is required');
      return;
    }
    requestMutation.mutate({ email });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Request Access</CardTitle>
        <CardDescription>
          This link requires approval. Submit your email to request access.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={requestMutation.isPending}
                required
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            type="submit" 
            className="w-full"
            disabled={requestMutation.isPending}
          >
            {requestMutation.isPending ? 'Submitting...' : 'Request Access'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}