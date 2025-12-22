import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function EmptyCart() {
  return (
    <div className="rounded-2xl bg-zinc-900/40 p-8 text-center ring-1 ring-white/10">
      <p className="text-base font-semibold text-white">Your cart is empty</p>
      <p className="mt-2 text-sm text-white/60">
        Add something tasty to start your order.
      </p>

      <Link href="/" className="inline-block">
        <Button className="mt-5 rounded-full bg-[#FF4D2E] text-white hover:bg-[#FF4D2E]/90">
          Browse food
        </Button>
      </Link>
    </div>
  );
}
