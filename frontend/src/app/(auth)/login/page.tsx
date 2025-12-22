"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  username: z
    .string()
    .min(2, "Please enter a valid email address")
    .max(50)
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(20, "Password must not exceed 20 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
      "Password must include uppercase, lowercase letters, and a number"
    ),
});

const LINK =
  "text-xs text-zinc-500 underline underline-offset-2 hover:text-zinc-700";
const INPUT =
  "h-[44px] rounded-md border border-zinc-300 text-sm placeholder:text-zinc-400 focus:border-zinc-900 focus:ring-0";
const PRIMARY_BTN =
  "h-[44px] w-full rounded-md bg-zinc-900 text-sm font-medium text-white hover:bg-zinc-800";

export default function LogInPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { username: "", password: "" },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("LOGIN:", values);
    // TODO: backend -> POST /auth/login
  };

  return (
    <>
      <div className="w-[416px]">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 flex flex-col"
          >
            <div>
              <p className="font-semibold text-[26px]">Log In</p>
              <p className="text-[16px] text-[#71717A]">
                Log in to enjoy your favorite dishes.
              </p>
            </div>

            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className={INPUT}
                      placeholder="Enter your email address"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className={INPUT}
                      placeholder="Enter your password"
                      {...field}
                      type="password"
                    />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />

            <Link
              href="/forgot-password"
              className="text-sm text-zinc-600 underline underline-offset-2"
            >
              Forgot password?
            </Link>

            <Button type="submit" className={PRIMARY_BTN}>
              Let&apos;s go
            </Button>

            <div className="flex gap-2 items-center">
              <p className="text-[#71717A]">Don&apos;t have an account?</p>
              <Link href="/signup" className={LINK}>
                Sign up
              </Link>
            </div>
          </form>
        </Form>
      </div>

      <img
        src="/Frame 1321316047.png"
        className="hidden md:block"
        alt="Login illustration"
      />
    </>
  );
}
