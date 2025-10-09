export type Link = {
  _id: string;
  title: string;
  destinationUrl: string;
  shortUrl: string;
  requireApproval: boolean;
  clickCount: number;
  pendingRequestCount: number; // Assuming the API will provide this count
  createdAt: string;
  updatedAt: string;
};