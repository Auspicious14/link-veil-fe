export type Link = {
  _id: string;
  title: string;
  url: string; // Backend uses 'url' but frontend uses 'destinationUrl'
  destinationUrl?: string; // For backward compatibility
  shortId: string; // Backend uses 'shortId' but frontend uses 'shortUrl'
  shortUrl?: string; // For backward compatibility
  fullUrl?: string; // Full URL including base URL
  visibility: 'public' | 'request' | 'private';
  approvalMode: 'manual' | 'auto' | 'domain';
  approvedDomain?: string;
  approvedUsers?: string[];
  clickCount: number;
  pendingRequestCount?: number; // Frontend calculation
  owner: string;
  createdAt: string;
  updatedAt: string;
};