import { API_BASE_URL } from './utils';

// Response type definitions
export interface CreateUrlResponse {
	code: string;
}

export interface UrlHistoryItem {
	code: string;
	original_url: string;
	created_at: string; // Added creation date
	click_count: number;
	last_accessed_at: string | null;
}

export interface DailyStats {
	date: string;
	count: number;
}

export interface AnalyticsResponse {
	[code: string]: DailyStats[];
}

// API client
export const api = {
	// Shorten a URL
	async createShortUrl(url: string): Promise<CreateUrlResponse> {
		const response = await fetch(`${API_BASE_URL}/create`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ url }),
			credentials: 'include',
		});

		if (!response.ok) {
			const errorData = await response.json();
			throw new Error(errorData.error || 'Failed to shorten URL');
		}

		return response.json();
	},

	// Get shortened URL history
	async getUrlHistory(): Promise<UrlHistoryItem[]> {
		const response = await fetch(`${API_BASE_URL}/history`, {
			credentials: 'include',
		});

		if (!response.ok) {
			const errorData = await response.json();
			throw new Error(errorData.error || 'Failed to retrieve history');
		}

		return response.json();
	},

	// Get analytics data
	async getAnalytics(codes: string[], range: string = '7d'): Promise<AnalyticsResponse> {
		const codesParam = codes.join(',');
		const response = await fetch(`${API_BASE_URL}/analytics?codes=${codesParam}&range=${range}`, {
			credentials: 'include',
		});

		if (!response.ok) {
			const errorData = await response.json();
			throw new Error(errorData.error || 'Failed to retrieve analytics');
		}

		return response.json();
	},

	// Generate full short URL
	getFullShortUrl(code: string): string {
		// Properly construct the redirect URL
		// Using the API server address
		const apiUrl = new URL(API_BASE_URL);
		return `${apiUrl.protocol}//${apiUrl.host}/${code}`;
	}
};
