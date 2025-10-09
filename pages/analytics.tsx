import ProtectedRoute from "@/components/layout/ProtectedRoute";
import { VisitChart } from "@/modules/links/components/VisitChart";

// Dummy data for the chart
const dummyAnalyticsData = [
  { name: "Day 1", visits: 400 },
  { name: "Day 2", visits: 300 },
  { name: "Day 3", visits: 600 },
  { name: "Day 4", visits: 278 },
  { name: "Day 5", visits: 189 },
  { name: "Day 6", visits: 239 },
  { name: "Day 7", visits: 349 },
];

function AnalyticsContent() {
  return (
    <div className="container mx-auto py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Link Analytics</h1>
        <p className="text-muted-foreground">
          View visit trends for your shared links.
        </p>
      </div>
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4">Visits Over Last 7 Days</h2>
        <VisitChart data={dummyAnalyticsData} />
      </div>
    </div>
  );
}

export default function AnalyticsPage() {
  return (
    <ProtectedRoute>
      <AnalyticsContent />
    </ProtectedRoute>
  );
}