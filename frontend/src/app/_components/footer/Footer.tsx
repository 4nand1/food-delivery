"use client";

import Link from "next/link";
import { Facebook, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-zinc-900">
      {/* Top red stripe */}
      <div className="w-full bg-[#ff4b2b]">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex h-12 items-center overflow-hidden">
            <div className="whitespace-nowrap text-sm font-semibold text-white">
              <span className="mr-10">Fresh fast delivered</span>
              <span className="mr-10">Fresh fast delivered</span>
              <span className="mr-10">Fresh fast delivered</span>
              <span className="mr-10">Fresh fast delivered</span>
              <span className="mr-10">Fresh fast delivered</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer content */}
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-10 md:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3">
            <img src="Logo Container (1).png" alt="NomNom Logo" className="h-[88px] w-[93.7px]"/>
              
            </div>
          </div>

          {/* NomNom links */}
          <div>
            <p className="text-xs font-semibold text-zinc-400">NOMNOM</p>
            <div className="mt-4 space-y-3 text-sm text-zinc-200">
              <Link className="block hover:text-white" href="/">
                Home
              </Link>
              <Link className="block hover:text-white" href="#">
                Contact us
              </Link>
              <Link className="block hover:text-white" href="#">
                Delivery zone
              </Link>
            </div>
          </div>

          {/* Menu links */}
          <div>
            <p className="text-xs font-semibold text-zinc-400">MENU</p>

            <div className="mt-4 grid grid-cols-2 gap-x-10 gap-y-3 text-sm text-zinc-200">
              <Link className="hover:text-white" href="/category">
                Appetizers
              </Link>
              <Link className="hover:text-white" href="/category">
                Side dish
              </Link>

              <Link className="hover:text-white" href="/category">
                Salads
              </Link>
              <Link className="hover:text-white" href="/category">
                Brunch
              </Link>

              <Link className="hover:text-white" href="/category">
                Pizzas
              </Link>
              <Link className="hover:text-white" href="/category">
                Desserts
              </Link>

              <Link className="hover:text-white" href="/category">
                Lunch favorites
              </Link>
              <Link className="hover:text-white" href="/category">
                Beverages
              </Link>

              <Link className="hover:text-white" href="/category">
                Main dishes
              </Link>
              <Link className="hover:text-white" href="/category">
                Fish & Sea foods
              </Link>
            </div>
          </div>

          {/* Social */}
          <div>
            <p className="text-xs font-semibold text-zinc-400">FOLLOW US</p>
            <div className="mt-4 flex items-center gap-3">
              <Link
                href="#"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-zinc-800 text-zinc-200 hover:bg-zinc-700 hover:text-white"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4" />
              </Link>

              <Link
                href="#"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-zinc-800 text-zinc-200 hover:bg-zinc-700 hover:text-white"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-10 h-px w-full bg-zinc-800" />

        {/* Bottom */}
        <div className="mt-6 flex flex-col gap-3 text-xs text-zinc-500 md:flex-row md:items-center md:justify-between">
          <p>Copy right 2024 © Nomnom LLC</p>

          <div className="flex flex-wrap gap-x-8 gap-y-2">
            <Link className="hover:text-zinc-300" href="#">
              Privacy policy
            </Link>
            <Link className="hover:text-zinc-300" href="#">
              Terms and condition
            </Link>
            <Link className="hover:text-zinc-300" href="#">
              Cookie policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
