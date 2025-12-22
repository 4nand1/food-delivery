"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";

const PRIMARY_BTN =
  "h-[44px] w-full rounded-md bg-zinc-900 text-sm font-medium text-white hover:bg-zinc-800";
const TITLE = "text-[20px] font-semibold text-zinc-900";
const SUBTITLE = "text-sm text-[#71717A]";

export default function VerifyEmailPage() {
  const router = useRouter();
  const sp = useSearchParams();
  const email = sp.get("email") ?? "";

  return (
    <>
      <div className="w-[416px] space-y-4">
        <div className="space-y-1">
          <p className={TITLE}>Check your email</p>
          <p className={SUBTITLE}>
            We sent a reset link to{" "}
            <span className="font-medium text-zinc-900">{email}</span>
          </p>
        </div>

        <Button
          type="button"
          className={PRIMARY_BTN}
          onClick={() =>
            router.push(`/forgot-password/new-password?email=${encodeURIComponent(email)}`)
          }
        >
          I&apos;ve verified
        </Button>

        <Button
          type="button"
          variant="link"
          className="justify-start px-0 text-sm text-zinc-600 underline"
          onClick={() => console.log("RESEND EMAIL:", email)}
        >
          Resend email
        </Button>

        <Link
          href="/login"
          className="text-sm text-zinc-600 underline underline-offset-2"
        >
          Back to login
        </Link>
      </div>

      <img
        src="/Frame 1321316047.png"
        className="hidden md:block"
        alt="Auth illustration"
      />
    </>
  );
}
