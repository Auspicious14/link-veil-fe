import { Button } from "@/components/ui/button";
import Link from "next/link";
import Head from "next/head";

export default function IndexPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Linkveil",
    "applicationCategory": "Productivity",
    "operatingSystem": "Web",
    "description": "Create secure, private, and cloaked links to protect your online identity. Share content without revealing the source.",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  return (
    <>
      <Head>
        <title>Linkveil - Secure and Private Cloaked Links</title>
        <meta
          name="description"
          content="Create secure, private, and cloaked links to protect your online identity. Share content without revealing the source."
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>
      <main className="flex-grow flex items-center justify-center">
        <section className="text-center">
          <h1 className="text-5xl font-bold">Welcome to Linkveil</h1>
          <p className="text-xl mt-4">
            Create secure and private cloaked links that protect your identity.
          </p>
          <Link href="/signup" passHref>
            <Button className="mt-8">Get Started</Button>
          </Link>
        </section>
      </main>
    </>
  );
}