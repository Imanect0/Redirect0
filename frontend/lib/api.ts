import { API_BASE_URL } from './utils';

// レスポンス型定義
export interface CreateUrlResponse {
	code: string;
}

export interface UrlHistoryItem {
	code: string;
	original_url: string;
	created_at: string; // 生成日時を追加
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

// APIクライアント
export const api = {
	// URLを短縮する
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
			throw new Error(errorData.error || 'URLの短縮に失敗しました');
		}

		return response.json();
	},

	// 短縮URL履歴を取得
	async getUrlHistory(): Promise<UrlHistoryItem[]> {
		const response = await fetch(`${API_BASE_URL}/history`, {
			credentials: 'include',
		});

		if (!response.ok) {
			const errorData = await response.json();
			throw new Error(errorData.error || '履歴の取得に失敗しました');
		}

		return response.json();
	},

	// アナリティクスデータを取得
	async getAnalytics(codes: string[], range: string = '7d'): Promise<AnalyticsResponse> {
		const codesParam = codes.join(',');
		const response = await fetch(`${API_BASE_URL}/analytics?codes=${codesParam}&range=${range}`, {
			credentials: 'include',
		});

		if (!response.ok) {
			const errorData = await response.json();
			throw new Error(errorData.error || 'アナリティクスの取得に失敗しました');
		}

		return response.json();
	},

	// フルショートURL生成
	getFullShortUrl(code: string): string {
		// リダイレクト先のURLを正しく構築
		// APIサーバーのアドレスを使用
		const apiUrl = new URL(API_BASE_URL);
		return `${apiUrl.protocol}//${apiUrl.host}/${code}`;
	}
};
