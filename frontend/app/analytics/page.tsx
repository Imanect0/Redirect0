"use client";

import { UrlComparison } from "@/components/url-comparison";
import { useSearchParams } from "next/navigation";

export default function AnalyticsPage() {
  const searchParams = useSearchParams();
  const codes = searchParams.get("codes")?.split(",") || [];

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Access Analysis</h1>
        <p className="text-muted-foreground">
          Analyze the access status of shortened URLs. You can also select and compare multiple URLs.
        </p>
      </div>
      <div className="mt-6">
        <UrlComparison initialCodes={codes} />
      </div>
    </div>
  );
}
