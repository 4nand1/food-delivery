"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/(client)/context/AuthProvider";
import { Toaster } from "@/components/ui/sonner";
import { HeaderAdmin } from "./_components/HeaderAdmin";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    if (!user || user.role !== "admin") {
      router.replace("/Login");
    }
  }, [isLoading, router, user]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#E4E4E7]">
        <p className="text-sm text-[#71717A]">Checking admin access...</p>
      </div>
    );
  }

  if (!user || user.role !== "admin") {
    return null;
  }

  return (
    <div className="flex min-h-screen w-full overflow-x-hidden bg-[#E4E4E7]">
      <HeaderAdmin />
      <Toaster />
      <main className="min-w-0 flex-1">{children}</main>
    </div>
  );
}
