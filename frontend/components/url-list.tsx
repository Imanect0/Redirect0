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
        title: "Error",
        description: "Failed to retrieve URL list",
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
        <div className="animate-pulse text-primary">Loading...</div>
      </div>
    );
  }

  if (urls.length === 0) {
    return (
      <div className="text-center p-12 border border-dashed rounded-lg">
        <p className="text-muted-foreground">
          No shortened URL history. Try shortening a URL.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Shortened URL History</h2>
        <Button variant="outline" size="sm" onClick={fetchUrls}>
          Refresh
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b">
              <th className="text-left p-3">ID</th>
              <th className="text-left p-3">Original URL</th>
              <th className="text-left p-3">Created At</th>
              <th className="text-left p-3">Click Count</th>
              <th className="text-left p-3">Last Accessed</th>
              <th className="text-left p-3">Actions</th>
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
                          "Copied"
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
                  {url.created_at ? formatDate(url.created_at) : "Unknown"}
                </td>
                <td className="p-3">{url.click_count}</td>
                <td className="p-3">
                  {url.last_accessed_at
                    ? formatDate(url.last_accessed_at)
                    : "None"}
                </td>
                <td className="p-3">
                  <Link href={`/analytics?codes=${url.code}`}>
                    <Button variant="outline" size="sm">
                      <BarChart2 className="h-4 w-4 mr-1" />
                      Analyze
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
