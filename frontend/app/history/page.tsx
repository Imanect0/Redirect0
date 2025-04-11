import { UrlList } from "@/components/url-list";

export const metadata = {
  title: "履歴 | Redirect0",
  description: "短縮したURLの履歴を確認できます。",
};

export default function HistoryPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">URL履歴</h1>
        <p className="text-muted-foreground">
          以前に短縮したURLの一覧と、それぞれのアクセス数を確認できます。
        </p>
      </div>
      <div className="mt-6">
        <UrlList />
      </div>
    </div>
  );
}
