"use client";

import { useState } from "react";
import Link from "next/link";
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

const emailSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

const passwordSchema = z
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

const FORM_W = "w-[380px]";
const TITLE = "text-[20px] font-semibold text-zinc-900";
const SUBTITLE = "text-sm text-[#71717A]";
const INPUT =
  "h-[44px] rounded-md border border-zinc-300 text-sm placeholder:text-zinc-400 focus:border-zinc-900 focus:ring-0";
const PRIMARY_BTN =
  "h-[44px] w-full rounded-md bg-zinc-900 text-sm font-medium text-white hover:bg-zinc-800";
const LINK =
  "text-xs text-zinc-500 underline underline-offset-2 hover:text-zinc-700";

export default function SignupPage() {
  const [step, setStep] = useState<"email" | "password">("email");
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const emailForm = useForm<z.infer<typeof emailSchema>>({
    resolver: zodResolver(emailSchema),
    defaultValues: { email: "" },
  });

  const passwordForm = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
    defaultValues: { password: "", confirmPassword: "" },
  });

  const onEmailSubmit = (values: z.infer<typeof emailSchema>) => {
    setEmail(values.email);
    setStep("password");
  };

  const onPasswordSubmit = (values: z.infer<typeof passwordSchema>) => {
    console.log("SIGNUP:", { email, ...values });
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center gap-10 px-6 bg-zinc-100">
      <div className={FORM_W}>
        {step === "email" && (
          <Form {...emailForm}>
            <form
              onSubmit={emailForm.handleSubmit(onEmailSubmit)}
              className="space-y-4"
            >
              <div className="space-y-1">
                <p className={TITLE}>Create your account</p>
                <p className={SUBTITLE}>Enter your email to continue.</p>
              </div>

              <FormField
                control={emailForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className={INPUT}
                        placeholder="Enter your email address"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className={PRIMARY_BTN}>
                Continue
              </Button>

              <p className="text-xs text-zinc-500">
                Already have an account?{" "}
                <Link href="/login" className={LINK}>
                  Log in
                </Link>
              </p>
            </form>
          </Form>
        )}

        {step === "password" && (
          <Form {...passwordForm}>
            <form
              onSubmit={passwordForm.handleSubmit(onPasswordSubmit)}
              className="space-y-4"
            >
              <div className="space-y-1">
                <p className={TITLE}>Create a strong password</p>
                <p className={SUBTITLE}>
                  Signing up as{" "}
                  <span className="font-medium text-zinc-900">{email}</span>
                </p>
              </div>

              <FormField
                control={passwordForm.control}
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
                control={passwordForm.control}
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
              <div className="flex items-center gap-2 text-xs text-zinc-600">
                <input
                  type="checkbox"
                  checked={showPassword}
                  onChange={(e) => setShowPassword(e.target.checked)}
                  className="h-4 w-4 accent-zinc-900"
                />
                Show password
              </div>

              <div className="flex gap-2">
                <Button type="submit" className={PRIMARY_BTN}>
                  Let&apos;s go
                </Button>
              </div>

              <p className="text-xs text-zinc-500">
                Already have an account?{" "}
                <Link href="/login" className={LINK}>
                  Log in
                </Link>
              </p>
            </form>
          </Form>
        )}
      </div>

      <img
        src="/Frame 1321316047.png"
        className="hidden md:block max-w-[560px]"
        alt="Auth illustration"
      />
    </div>
  );
}
