import { BarChart2, History, Link2 } from "lucide-react";
import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <Link2 className="h-6 w-6" />
            <span className="inline-block font-bold">Redirect0</span>
          </Link>
          <nav className="flex gap-6">
            <Link
              href="/"
              className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              Home
            </Link>
            <Link
              href="/history"
              className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              <History className="mr-1 h-4 w-4" />
              History
            </Link>
            <Link
              href="/analytics"
              className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              <BarChart2 className="mr-1 h-4 w-4" />
              Analytics
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
