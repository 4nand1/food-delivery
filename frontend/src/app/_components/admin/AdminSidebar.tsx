"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ClipboardList, UtensilsCrossed } from "lucide-react";

type AdminSidebarProps = {
  onNavigate?: () => void;
};

type NavItem = {
  label: string;
  href: string;
  icon: React.ReactNode;
};

const navItems: NavItem[] = [
  {
    label: "Food menu",
    href: "/admin/dishes",
    icon: <UtensilsCrossed className="h-4 w-4" />,
  },
  {
    label: "Orders",
    href: "/admin/orders",
    icon: <ClipboardList className="h-4 w-4" />,
  },
];

export default function AdminSidebar({ onNavigate }: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <div className="rounded-2xl bg-neutral-900 p-4 text-white shadow-sm">
      <div className="mb-4">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-red-500" />
          <div className="leading-tight">
            <p className="text-sm font-semibold">NomNom</p>
            <p className="text-xs text-white/60">Admin panel</p>
          </div>
        </div>
      </div>

      <nav className="space-y-1">
        {navItems.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={cn(
                "flex items-center gap-2 rounded-xl px-3 py-2 text-sm transition",
                active ? "bg-white text-neutral-900" : "text-white/80 hover:bg-white/10 hover:text-white"
              )}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
