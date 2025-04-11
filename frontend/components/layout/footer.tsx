export function Footer() {
  return (
    <footer className="py-6 md:py-0 border-t">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Redirect0 - URLの短縮・分析サービス
        </p>
      </div>
    </footer>
  );
}
