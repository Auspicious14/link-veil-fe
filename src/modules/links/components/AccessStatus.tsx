'use client';

import { Link as LinkType } from '../types';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Globe, Lock, Clock } from 'lucide-react';

interface AccessStatusProps {
  link: LinkType;
}

export function AccessStatus({ link }: AccessStatusProps) {
  const getVisibilityDetails = () => {
    switch (link.visibility) {
      case 'public':
        return {
          icon: <Globe className="h-4 w-4" />,
          label: 'Public',
          description: 'Anyone can access this link without approval.',
          color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
        };
      case 'private':
        return {
          icon: <Lock className="h-4 w-4" />,
          label: 'Private',
          description: 'Only you can access this link.',
          color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
        };
      case 'request':
        return {
          icon: <Clock className="h-4 w-4" />,
          label: 'Request Access',
          description: getApprovalModeDescription(),
          color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
        };
      default:
        return {
          icon: <Globe className="h-4 w-4" />,
          label: 'Public',
          description: 'Anyone can access this link without approval.',
          color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
        };
    }
  };

  const getApprovalModeDescription = () => {
    switch (link.approvalMode) {
      case 'manual':
        return 'Users must request access and you must manually approve each request.';
      case 'auto':
        return 'Users must request access, but all requests are automatically approved.';
      case 'domain':
        return `Users must request access. Requests from ${link.approvedDomain || 'approved domains'} are automatically approved.`;
      default:
        return 'Users must request access for this link.';
    }
  };

  const { icon, label, description, color } = getVisibilityDetails();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Access Status</span>
          <Badge className={color} variant="outline">
            <span className="flex items-center gap-1">
              {icon}
              {label}
            </span>
          </Badge>
        </CardTitle>
        <CardDescription>
          Control who can access your link
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{description}</p>
        
        {link.visibility === 'request' && (
          <div className="mt-4 text-sm">
            <div className="font-medium">Current status:</div>
            <ul className="list-disc pl-5 mt-1 space-y-1 text-muted-foreground">
              <li>{link.pendingRequestCount || 0} pending access requests</li>
              <li>{link.approvedUsers?.length || 0} approved users</li>
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}