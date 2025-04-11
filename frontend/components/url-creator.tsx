"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { api } from "@/lib/api";
import { Check, Copy, Link as LinkIcon } from "lucide-react";
import { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

export function UrlCreator() {
  const [url, setUrl] = useState("");
  const [shortCode, setShortCode] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!url) {
      toast({
        title: "エラー",
        description: "URLを入力してください",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);
      const response = await api.createShortUrl(url);
      setShortCode(response.code);
      toast({
        title: "成功",
        description: "URLが短縮されました",
      });
    } catch (error) {
      toast({
        title: "エラー",
        description:
          error instanceof Error ? error.message : "URLの短縮に失敗しました",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
    toast({
      title: "コピーしました",
      description: "短縮URLがクリップボードにコピーされました",
    });
  };

  const shortUrl = shortCode ? api.getFullShortUrl(shortCode) : null;

  return (
    <div className="w-full max-w-3xl mx-auto p-6 bg-card rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 flex items-center">
        <LinkIcon className="mr-2 h-6 w-6" />
        URLを短縮する
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <Input
            type="url"
            placeholder="https://example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="flex-1"
            disabled={isLoading}
          />
          <Button type="submit" disabled={isLoading || !url}>
            {isLoading ? "短縮中..." : "短縮する"}
          </Button>
        </div>
      </form>

      {shortUrl && (
        <div className="mt-6 p-4 bg-muted rounded-md">
          <p className="text-sm font-medium mb-2">短縮URL:</p>
          <div className="flex items-center justify-between rounded-md bg-background p-2">
            <a
              href={shortUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              {shortUrl}
            </a>
            <CopyToClipboard text={shortUrl} onCopy={handleCopy}>
              <Button variant="ghost" size="sm">
                {isCopied ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </CopyToClipboard>
          </div>
        </div>
      )}
    </div>
  );
}
