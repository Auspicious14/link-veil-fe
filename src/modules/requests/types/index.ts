export type Request = {
  _id: string;
  linkId: string;
  userIdentifier: string; // This could be an email or a unique ID
  status: "pending" | "approved" | "rejected";
  createdAt: string;
};