import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

// API通信用のベースURL
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

// 日付フォーマットのヘルパー
export function formatDate(dateString: string): string {
	return new Date(dateString).toLocaleDateString('ja-JP', {
		year: 'numeric',
		month: 'short',
		day: 'numeric'
	});
}

// URLの短縮コードを取得
export function extractCodeFromUrl(url: string): string {
	const parts = url.split('/');
	return parts[parts.length - 1];
}

// グラフ用の色パレット
export const colorPalette = [
	"#3498db", "#e74c3c", "#2ecc71", "#f39c12",
	"#9b59b6", "#1abc9c", "#e67e22", "#34495e"
];
