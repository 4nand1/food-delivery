import type { ReactNode } from "react";
import AdminShell from "@/app/_components/admin/AdminShell";

type AdminLayoutProps = {
  children: ReactNode;
};

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <AdminShell>{children}</AdminShell>
    </div>
  );
}
