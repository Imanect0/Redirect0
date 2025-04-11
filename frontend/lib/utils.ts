import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

// Base URL for API communication
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

// Date format helper
export function formatDate(dateString: string): string {
	return new Date(dateString).toLocaleDateString('ja-JP', {
		year: 'numeric',
		month: 'short',
		day: 'numeric'
	});
}

// Get short code from URL
export function extractCodeFromUrl(url: string): string {
	const parts = url.split('/');
	return parts[parts.length - 1];
}

// Color palette for graphs
export const colorPalette = [
	"#3498db", "#e74c3c", "#2ecc71", "#f39c12",
	"#9b59b6", "#1abc9c", "#e67e22", "#34495e"
];
