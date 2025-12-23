import type { ReactNode } from "react";
import AdminShell from "@/app/_components/admin/AdminShell";

type AdminLayoutProps = {
  children: ReactNode;
};

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="min-h-screen ">
      <AdminShell>{children}</AdminShell>
    </div>
  );
}
