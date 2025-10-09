import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] text-center px-4">
      <section className="py-20 md:py-32">
        <div className="container mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4">
            Share links privately. Approve who sees them.
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Control who gets access to your shared content — no more chaotic DMs.
          </p>
          <div className="flex justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/dashboard">Get Started</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="#features">See How It Works</Link>
            </Button>
          </div>
        </div>
      </section>

      <section id="features" className="py-20 md:py-32 bg-secondary w-full">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-12">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            <div className="flex flex-col items-center gap-4">
              <div className="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl">1</div>
              <h3 className="font-bold text-xl">Create Link</h3>
              <p className="text-muted-foreground">
                Paste your destination URL and decide if you want to approve requests.
              </p>
            </div>
            <div className="flex flex-col items-center gap-4">
              <div className="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl">2</div>
              <h3 className="font-bold text-xl">Share Link</h3>
              <p className="text-muted-foreground">
                Share the private LinkVeil URL with your audience.
              </p>
            </div>
            <div className="flex flex-col items-center gap-4">
               <div className="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl">3</div>
              <h3 className="font-bold text-xl">Approve Requests</h3>
              <p className="text-muted-foreground">
                Get notified of new access requests and approve them with one click.
              </p>
            </div>
            <div className="flex flex-col items-center gap-4">
               <div className="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl">4</div>
              <h3 className="font-bold text-xl">Track Access</h3>
              <p className="text-muted-foreground">
                See who has accessed your link and manage permissions.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}