"use client";

import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

type AdminTopbarProps = {
  onOpenSidebar: () => void;
};

export default function AdminTopbar({ onOpenSidebar }: AdminTopbarProps) {
  return (
    <header className="flex items-center justify-between gap-3 rounded-2xl bg-neutral-900 px-4 py-3 text-white shadow-sm">
      <div className="flex items-center gap-3">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={onOpenSidebar}
          aria-label="Open sidebar"
        >
          <Menu className="h-5 w-5" />
        </Button>

        <div className="leading-tight">
          <p className="text-sm text-white/70">NomNom Admin</p>
          <h1 className="text-base font-semibold">Dashboard</h1>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="h-9 w-9 rounded-full bg-white/10" />
      </div>
    </header>
  );
}
