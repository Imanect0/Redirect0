"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { AnalyticsResponse, api } from "@/lib/api";
import { colorPalette } from "@/lib/utils";
import { useEffect, useState } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface AnalyticsChartProps {
  codes: string[];
}

interface ChartDataItem {
  date: string;
  [key: string]: string | number;
}

export function AnalyticsChart({ codes }: AnalyticsChartProps) {
  const [analytics, setAnalytics] = useState<AnalyticsResponse | null>(null);
  const [range, setRange] = useState<string>("7d");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (codes.length > 0) {
      fetchAnalytics();
    }
  }, [codes, range]);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const data = await api.getAnalytics(codes, range);
      setAnalytics(data);
    } catch (error) {
      toast({
        title: "エラー",
        description: "アナリティクスデータの取得に失敗しました",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // 日付をマージして、統合されたチャートデータを作成
  const prepareChartData = (): ChartDataItem[] => {
    if (!analytics) return [];

    // すべての日付を収集
    const allDates = new Set<string>();
    Object.values(analytics).forEach((stats) => {
      stats.forEach((item) => allDates.add(item.date));
    });

    // 日付でソート
    const sortedDates = Array.from(allDates).sort();

    // 各日付のデータポイントを作成
    return sortedDates.map((date) => {
      const dataPoint: ChartDataItem = { date };

      Object.entries(analytics).forEach(([code, stats]) => {
        const stat = stats.find((s) => s.date === date);
        dataPoint[code] = stat ? stat.count : 0;
      });

      return dataPoint;
    });
  };

  const chartData = prepareChartData();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-pulse text-primary">読み込み中...</div>
      </div>
    );
  }

  if (!analytics || Object.keys(analytics).length === 0) {
    return (
      <div className="text-center p-12 border border-dashed rounded-lg">
        <p className="text-muted-foreground">
          アナリティクスデータがありません。
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">ID別アクセス統計</h2>
        <Tabs defaultValue={range} onValueChange={setRange}>
          <TabsList>
            <TabsTrigger value="7d">7日間</TabsTrigger>
            <TabsTrigger value="30d">30日間</TabsTrigger>
            <TabsTrigger value="90d">90日間</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            {codes.map((code, index) => (
              <Line
                key={code}
                type="monotone"
                dataKey={code}
                stroke={colorPalette[index % colorPalette.length]}
                activeDot={{ r: 8 }}
                name={`ID: ${code}`}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b">
              <th className="text-left p-3">日付</th>
              {codes.map((code) => (
                <th key={code} className="text-left p-3">
                  ID: {code}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {chartData.map((item) => (
              <tr key={item.date} className="border-b hover:bg-muted/50">
                <td className="p-3">{item.date}</td>
                {codes.map((code) => (
                  <td key={code} className="p-3">
                    {item[code]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
