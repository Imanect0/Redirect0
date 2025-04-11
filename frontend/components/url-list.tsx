"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { api, UrlHistoryItem } from "@/lib/api";
import { formatDate } from "@/lib/utils";
import { BarChart2, Copy, ExternalLink } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

export function UrlList() {
  const [urls, setUrls] = useState<UrlHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchUrls();
  }, []);

  const fetchUrls = async () => {
    try {
      setLoading(true);
      const data = await api.getUrlHistory();
      setUrls(data);
    } catch (error) {
      toast({
        title: "エラー",
        description: "URLリストの取得に失敗しました",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (index: number) => {
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-pulse text-primary">読み込み中...</div>
      </div>
    );
  }

  if (urls.length === 0) {
    return (
      <div className="text-center p-12 border border-dashed rounded-lg">
        <p className="text-muted-foreground">
          短縮URLの履歴がありません。URLを短縮してみましょう。
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">短縮URL履歴</h2>
        <Button variant="outline" size="sm" onClick={fetchUrls}>
          更新
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b">
              <th className="text-left p-3">ID</th>
              <th className="text-left p-3">元URL</th>
              <th className="text-left p-3">生成日時</th>
              <th className="text-left p-3">クリック数</th>
              <th className="text-left p-3">最終アクセス</th>
              <th className="text-left p-3">アクション</th>
            </tr>
          </thead>
          <tbody>
            {urls.map((url, index) => (
              <tr key={url.code} className="border-b hover:bg-muted/50">
                <td className="p-3">
                  <div className="flex items-center">
                    <a
                      href={api.getFullShortUrl(url.code)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      {url.code}
                    </a>
                    <CopyToClipboard
                      text={api.getFullShortUrl(url.code)}
                      onCopy={() => handleCopy(index)}
                    >
                      <Button variant="ghost" size="sm" className="ml-1">
                        {copiedIndex === index ? (
                          "コピー済み"
                        ) : (
                          <Copy className="h-3 w-3" />
                        )}
                      </Button>
                    </CopyToClipboard>
                  </div>
                </td>
                <td
                  className="p-3 truncate max-w-[200px]"
                  title={url.original_url}
                >
                  <a
                    href={url.original_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline flex items-center"
                  >
                    {url.original_url}
                    <ExternalLink className="ml-1 h-3 w-3" />
                  </a>
                </td>
                <td className="p-3">
                  {url.created_at ? formatDate(url.created_at) : "不明"}
                </td>
                <td className="p-3">{url.click_count}</td>
                <td className="p-3">
                  {url.last_accessed_at
                    ? formatDate(url.last_accessed_at)
                    : "なし"}
                </td>
                <td className="p-3">
                  <Link href={`/analytics?codes=${url.code}`}>
                    <Button variant="outline" size="sm">
                      <BarChart2 className="h-4 w-4 mr-1" />
                      分析
                    </Button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
