"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";

const schema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

const INPUT =
  "h-[44px] rounded-md border border-zinc-300 text-sm placeholder:text-zinc-400 focus:border-zinc-900 focus:ring-0";
const PRIMARY_BTN =
  "h-[44px] w-full rounded-md bg-zinc-900 text-sm font-medium text-white hover:bg-zinc-800";
const TITLE = "text-[20px] font-semibold text-zinc-900";
const SUBTITLE = "text-sm text-[#71717A]";

export default function ForgotPasswordPage() {
  const router = useRouter();

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { email: "" },
  });

  const onSubmit = (values: z.infer<typeof schema>) => {
    console.log("SEND RESET:", values.email);
    // TODO: backend -> POST /auth/forgot-password
    router.push(`/forgot-password/verify?email=${encodeURIComponent(values.email)}`);
  };

  return (
    <>
      <div className="w-[416px] space-y-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-1">
              <p className={TITLE}>Reset your password</p>
              <p className={SUBTITLE}>Enter your email to receive a reset link.</p>
            </div>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className={INPUT}
                      placeholder="email@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className={PRIMARY_BTN}>
              Send reset link
            </Button>

            <Link
              href="/login"
              className="text-sm text-zinc-600 underline underline-offset-2"
            >
              Back to login
            </Link>
          </form>
        </Form>
      </div>

      <img
        src="/Frame 1321316047.png"
        className="hidden md:block"
        alt="Auth illustration"
      />
    </>
  );
}
