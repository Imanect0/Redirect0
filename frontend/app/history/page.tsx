import { UrlList } from "@/components/url-list";

export const metadata = {
  title: "History | Redirect0",
  description: "Check the history of shortened URLs.",
};

export default function HistoryPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">URL History</h1>
        <p className="text-muted-foreground">
          View a list of previously shortened URLs and their respective access counts.
        </p>
      </div>
      <div className="mt-6">
        <UrlList />
      </div>
    </div>
  );
}
