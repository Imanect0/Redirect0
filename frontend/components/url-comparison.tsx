"use client";

import { AnalyticsChart } from "@/components/analytics-chart";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { api, UrlHistoryItem } from "@/lib/api";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

export function UrlComparison({
  initialCodes = [],
}: {
  initialCodes?: string[];
}) {
  const [selectedCodes, setSelectedCodes] = useState<string[]>(initialCodes);
  const [availableUrls, setAvailableUrls] = useState<UrlHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchUrls();
  }, []);

  const fetchUrls = async () => {
    try {
      setLoading(true);
      const data = await api.getUrlHistory();
      setAvailableUrls(data);
    } catch (error) {
      toast({
        title: "エラー",
        description: "URL履歴の取得に失敗しました",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddUrl = (code: string) => {
    if (!selectedCodes.includes(code)) {
      setSelectedCodes([...selectedCodes, code]);
    }
  };

  const handleRemoveUrl = (code: string) => {
    setSelectedCodes(selectedCodes.filter((c) => c !== code));
  };

  // 選択されていないURL一覧
  const unselectedUrls = availableUrls.filter(
    (url) => !selectedCodes.includes(url.code)
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-xl font-bold">ID比較</h2>
        <div className="flex items-center gap-2">
          <Select
            disabled={loading || unselectedUrls.length === 0}
            onValueChange={handleAddUrl}
          >
            <SelectTrigger className="w-[220px]">
              <SelectValue placeholder="IDを追加" />
            </SelectTrigger>
            <SelectContent>
              {unselectedUrls.map((url) => (
                <SelectItem key={url.code} value={url.code}>
                  {url.code} ({url.original_url.substring(0, 20)}...)
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* 選択されたID一覧 */}
      <div className="flex flex-wrap gap-2">
        {selectedCodes.map((code) => {
          const url = availableUrls.find((u) => u.code === code);
          return (
            <div
              key={code}
              className="flex items-center gap-2 bg-muted px-3 py-1.5 rounded-full"
            >
              <span className="text-sm font-medium">{code}</span>
              {url && (
                <span
                  className="text-xs text-muted-foreground truncate max-w-[150px]"
                  title={url.original_url}
                >
                  ({url.original_url.substring(0, 15)}...)
                </span>
              )}
              <Button
                variant="ghost"
                size="sm"
                className="h-5 w-5 p-0"
                onClick={() => handleRemoveUrl(code)}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          );
        })}
        {selectedCodes.length === 0 && (
          <div className="text-muted-foreground text-sm">
            比較するIDを選択してください
          </div>
        )}
      </div>

      {selectedCodes.length > 0 && <AnalyticsChart codes={selectedCodes} />}
    </div>
  );
}
