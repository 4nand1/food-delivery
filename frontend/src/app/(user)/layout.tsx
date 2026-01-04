import Header from "@/app/_components/header/Header";
import { CartProvider } from "@/app/_components/cart/CartProvider";

export default function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <Header />
      {children}
    </CartProvider>
  );
}
