import { ReactNode } from "react";
import { CartProvider } from "@/app/_components/cart/CartProvider";
import  { CartDrawer } from "@/app/_components/cart/Cart-drawer";
import { Header } from "@/app/_components/header/Header";
import { Footer } from "@/app/_components/footer/Footer";


export default function UserLayout({ children }: { children: ReactNode }) {
  return (
    <CartProvider>
      <Header />
      {children}
      <Footer/>
      <CartDrawer />
    </CartProvider>
  );
}
