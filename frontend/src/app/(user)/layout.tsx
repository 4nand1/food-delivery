import { ReactNode } from "react";
import { CartProvider } from "@/app/_components/cart/CartProvider";
import  { CartDrawer } from "@/app/_components/cart/CartDrawer";
import Header from "@/app/_components/header/Header";

export default function UserLayout({ children }: { children: ReactNode }) {
  return (
    <CartProvider>
      <Header />
      {children}
      <CartDrawer />
    </CartProvider>
  );
}
