import Link from "next/link";
import { FiGithub } from "react-icons/fi";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="py-8">
      <div className="container mx-auto flex flex-col items-center justify-center gap-3 text-center md:text-left md:flex-col">
        <div className="grid grid-cols-[1fr,1fr,1fr] gap-[10vw]  items-center justify-between  ">
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
        <div className="flex justify-center items-center gap-6">
          <Link href="/contact" className="text-sm text-muted-foreground hover:text-primary">
            <FaXTwitter />
          </Link>
          <Link href="/contact" className="text-sm text-muted-foreground hover:text-primary">
            <FiGithub />
          </Link>
        </div>
        <p className="text-sm text-center text-muted-foreground mb-4 md:mb-0">
          &copy; {new Date().getFullYear()} LinkVeil. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
