import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t py-8">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between text-center md:text-left">
        <p className="text-sm text-muted-foreground mb-4 md:mb-0">
          &copy; {new Date().getFullYear()} LinkVeil. All rights reserved.
        </p>
        <div className="flex items-center gap-6">
          <Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary">
            Privacy
          </Link>
          <Link href="/terms" className="text-sm text-muted-foreground hover:text-primary">
            Terms
          </Link>
          <Link href="/contact" className="text-sm text-muted-foreground hover:text-primary">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}