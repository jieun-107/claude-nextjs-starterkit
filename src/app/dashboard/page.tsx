import type { Metadata } from "next";
import { Activity, CreditCard, TrendingUp, Users } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const metadata: Metadata = {
  title: "대시보드",
};

// 샘플 통계 데이터 (실제 데이터 연동 시 API 나 DB 조회로 교체하세요)
const stats = [
  { title: "총 사용자", value: "12,480", icon: Users, hint: "전월 대비 +8%" },
  { title: "활성 세션", value: "1,204", icon: Activity, hint: "실시간 기준" },
  {
    title: "매출",
    value: "₩8,920,000",
    icon: CreditCard,
    hint: "이번 달 누계",
  },
  { title: "전환율", value: "3.4%", icon: TrendingUp, hint: "지난 7일 평균" },
];

// 샘플 주문 데이터
const orders = [
  { id: "ORD-1001", customer: "김철수", amount: "₩120,000", status: "완료" },
  { id: "ORD-1002", customer: "이영희", amount: "₩58,000", status: "처리 중" },
  { id: "ORD-1003", customer: "박민수", amount: "₩240,000", status: "완료" },
  { id: "ORD-1004", customer: "정수연", amount: "₩33,000", status: "취소" },
];

// 상태별 뱃지 variant 매핑
const statusVariant: Record<
  (typeof orders)[number]["status"],
  "default" | "secondary" | "destructive"
> = {
  완료: "default",
  "처리 중": "secondary",
  취소: "destructive",
} as const;

// 대시보드 페이지: 통계 카드, 탭, 최근 주문 테이블 샘플
export default function DashboardPage() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-10">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">대시보드</h1>
        <p className="text-sm text-muted-foreground">
          샘플 데이터로 구성된 대시보드 화면입니다.
        </p>
      </div>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="gap-1">
              <div className="flex items-center justify-between">
                <CardDescription>{stat.title}</CardDescription>
                <stat.icon
                  className="size-4 text-muted-foreground"
                  aria-hidden
                />
              </div>
              <CardTitle className="text-2xl">{stat.value}</CardTitle>
              <CardDescription>{stat.hint}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </section>

      <Tabs defaultValue="orders">
        <TabsList>
          <TabsTrigger value="orders">최근 주문</TabsTrigger>
          <TabsTrigger value="notes">메모</TabsTrigger>
        </TabsList>

        <TabsContent value="orders" className="mt-4">
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>주문번호</TableHead>
                  <TableHead>고객</TableHead>
                  <TableHead className="text-right">금액</TableHead>
                  <TableHead>상태</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>{order.customer}</TableCell>
                    <TableCell className="text-right">{order.amount}</TableCell>
                    <TableCell>
                      <Badge variant={statusVariant[order.status]}>
                        {order.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        <TabsContent value="notes" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>메모</CardTitle>
              <CardDescription>
                탭 콘텐츠 영역의 예시입니다. 필요한 내용으로 바꿔 사용하세요.
              </CardDescription>
            </CardHeader>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
