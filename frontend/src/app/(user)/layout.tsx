import { ReactNode } from "react";

import  { CartDrawer } from "@/app/_components/cart/Cart-drawer";
import { Header } from "@/app/_components/header/Header";
import { Footer } from "@/app/_components/footer/Footer";


export default function UserLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Header />
      {children}
      <Footer/>
      <CartDrawer />
    </div>
  );
}
