import Link from "next/link";

export function Footer() {
  return (
    <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-border">
      <p className="text-xs text-muted-foreground">
        &copy; {new Date().getFullYear()} John Doe. All rights reserved.
      </p>
      <nav className="sm:ml-auto flex gap-4 sm:gap-6">
        <Link
          href="/#about"
          className="text-xs hover:underline underline-offset-4 text-muted-foreground"
        >
          About
        </Link>
        <Link
          href="/projects"
          className="text-xs hover:underline underline-offset-4 text-muted-foreground"
        >
          Projects
        </Link>
        <Link
          href="/services"
          className="text-xs hover:underline underline-offset-4 text-muted-foreground"
        >
          Services
        </Link>
        <Link
          href="/#contact"
          className="text-xs hover:underline underline-offset-4 text-muted-foreground"
        >
          Contact
        </Link>
      </nav>
    </footer>
  );
}
