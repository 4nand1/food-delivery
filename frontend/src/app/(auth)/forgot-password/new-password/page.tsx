"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
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

const schema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
        "Must include uppercase, lowercase and a number"
      ),
    confirmPassword: z.string(),
  })
  .refine((d) => d.password === d.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

const INPUT =
  "h-[44px] rounded-md border border-zinc-300 text-sm placeholder:text-zinc-400 focus:border-zinc-900 focus:ring-0";
const PRIMARY_BTN =
  "h-[44px] w-full rounded-md bg-zinc-900 text-sm font-medium text-white hover:bg-zinc-800";
const TITLE = "text-[20px] font-semibold text-zinc-900";
const SUBTITLE = "text-sm text-[#71717A]";

export default function NewPasswordPage() {
  const router = useRouter();
  const sp = useSearchParams();
  const email = sp.get("email") ?? "";

  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { password: "", confirmPassword: "" },
  });

  const onSubmit = (values: z.infer<typeof schema>) => {
    console.log("RESET PASS:", { email, ...values });
    // TODO: backend -> POST /auth/forgot-password/reset (+token)
    router.push("/login");
  };

  return (
    <>
      <div className="w-[416px] space-y-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-1">
              <p className={TITLE}>Create new password</p>
              <p className={SUBTITLE}>
                Setting a new password for{" "}
                <span className="font-medium text-zinc-900">{email}</span>
              </p>
            </div>

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className={INPUT}
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className={INPUT}
                      type={showPassword ? "text" : "password"}
                      placeholder="Confirm password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <label className="flex items-center gap-2 text-xs text-zinc-600">
              <input
                type="checkbox"
                checked={showPassword}
                onChange={(e) => setShowPassword(e.target.checked)}
                className="h-4 w-4 accent-zinc-900"
              />
              Show password
            </label>

            <Button type="submit" className={PRIMARY_BTN}> 
              Let&apos;s go
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
