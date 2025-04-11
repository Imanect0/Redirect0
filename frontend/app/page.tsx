import { UrlCreator } from "@/components/url-creator";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center space-y-12">
      <section className="w-full max-w-4xl space-y-6 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Shorten URLs and Analyze Performance
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground mx-auto">
          Make long URLs short and simple. Track access counts to measure
          effectiveness.
        </p>
      </section>

      <UrlCreator />

      <section className="w-full max-w-5xl">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 bg-card">
            <div className="rounded-full bg-primary/10 p-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6 text-primary"
              >
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold">Easy URL Shortening</h3>
            <p className="text-center text-muted-foreground">
              Shorten long URLs in seconds. Copy and share easily.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 bg-card">
            <div className="rounded-full bg-primary/10 p-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6 text-primary"
              >
                <rect x="2" y="2" width="20" height="20" rx="5"></rect>
                <path d="m9 12 2 2 4-4"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold">Access Analytics</h3>
            <p className="text-center text-muted-foreground">
              Check daily access counts for your shared URLs.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 bg-card">
            <div className="rounded-full bg-primary/10 p-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6 text-primary"
              >
                <circle cx="8" cy="8" r="6"></circle>
                <path d="M18.09 10.37A6 6 0 1 1 10.34 18.1"></path>
                <path d="M7 6h2v4"></path>
                <path d="m19 16-3 1.5"></path>
                <path d="M15 20h-3"></path>
                <path d="M15 16h.01"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold">Statistical Comparison</h3>
            <p className="text-center text-muted-foreground">
              Compare access statistics for multiple URLs to measure
              effectiveness.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
