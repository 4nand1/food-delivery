"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import AdminSidebar from "./AdminSidebar";
import AdminTopbar from "./AdminTopbar";
import { Sheet, SheetContent } from "@/components/ui/sheet";

type AdminShellProps = {
  children: ReactNode;
};

export default function AdminShell({ children }: AdminShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <div className="mx-auto flex w-full max-w-[1200px] gap-6 px-4 py-6 md:px-6">
        {/* Desktop Sidebar */}
        <aside className="hidden w-[240px] shrink-0 md:block">
          <AdminSidebar />
        </aside>

        {/* Mobile Sidebar Sheet */}
        <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
          <SheetContent side="left" className="w-[280px] bg-neutral-950 p-0 text-white">
            <div className="p-4">
              <AdminSidebar onNavigate={() => setSidebarOpen(false)} />
            </div>
          </SheetContent>
        </Sheet>

        {/* Main */}
        <div className="min-w-0 flex-1">
          <AdminTopbar onOpenSidebar={() => setSidebarOpen(true)} />

          <main className="mt-6 rounded-2xl bg-white text-neutral-900 shadow-sm">
            <div className="p-4 sm:p-6">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
}
