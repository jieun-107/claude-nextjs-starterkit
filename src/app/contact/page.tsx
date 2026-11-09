"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

// 입력값 검증 스키마 (zod v4)
const contactSchema = z.object({
  name: z.string().min(2, "이름은 2자 이상 입력해 주세요."),
  email: z.email("올바른 이메일 주소를 입력해 주세요."),
  message: z.string().min(10, "문의 내용은 10자 이상 입력해 주세요."),
});

type ContactFormValues = z.infer<typeof contactSchema>;

// 문의 폼 샘플: react-hook-form + zod 검증 + sonner 토스트
// 실제 전송은 하지 않고 지연 후 성공 토스트만 표시합니다. Server Action 이나 API 로 교체하세요.
export default function ContactPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", message: "" },
  });

  const onSubmit = async (values: ContactFormValues) => {
    // 전송을 흉내 내기 위한 지연 (실제 구현 시 제거)
    await new Promise((resolve) => setTimeout(resolve, 800));
    console.log("문의 데이터:", values);
    toast.success("문의가 접수되었습니다.", {
      description: `${values.name}님, 빠르게 답변드리겠습니다.`,
    });
    reset();
  };

  return (
    <div className="mx-auto flex max-w-xl flex-col px-4 py-10">
      <Card>
        <CardHeader>
          <CardTitle>문의하기</CardTitle>
          <CardDescription>
            궁금한 점을 남겨 주시면 확인 후 답변드리겠습니다.
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <CardContent className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="name">이름</Label>
              <Input
                id="name"
                placeholder="홍길동"
                aria-invalid={!!errors.name}
                {...register("name")}
              />
              {errors.name && (
                <p className="text-sm text-destructive">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="email">이메일</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                aria-invalid={!!errors.email}
                {...register("email")}
              />
              {errors.email && (
                <p className="text-sm text-destructive">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="message">문의 내용</Label>
              <Textarea
                id="message"
                rows={5}
                placeholder="문의 내용을 입력해 주세요."
                aria-invalid={!!errors.message}
                {...register("message")}
              />
              {errors.message && (
                <p className="text-sm text-destructive">
                  {errors.message.message}
                </p>
              )}
            </div>
          </CardContent>

          <CardFooter className="justify-end">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "전송 중..." : "보내기"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
