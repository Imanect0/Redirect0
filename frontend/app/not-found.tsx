import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 py-10">
      <h2 className="text-4xl font-bold">404</h2>
      <p className="text-xl">ページが見つかりませんでした</p>
      <Link href="/">
        <Button>ホームに戻る</Button>
      </Link>
    </div>
  );
}
