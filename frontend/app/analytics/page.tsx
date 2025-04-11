"use client";

import { UrlComparison } from "@/components/url-comparison";
import { useSearchParams } from "next/navigation";

export default function AnalyticsPage() {
  const searchParams = useSearchParams();
  const codes = searchParams.get("codes")?.split(",") || [];

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">アクセス分析</h1>
        <p className="text-muted-foreground">
          短縮URLのアクセス状況を分析します。複数のURLを選択して比較することもできます。
        </p>
      </div>
      <div className="mt-6">
        <UrlComparison initialCodes={codes} />
      </div>
    </div>
  );
}
