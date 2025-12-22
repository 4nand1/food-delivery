import Header from "@/app/_components/header/Header";
import Footer from "@/app/_components/footer/Footer";

export default function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col ">
      <Header />
      <main className="mx-auto w-full max-w px-4 sm:px-6 lg:px-8 py-6 gap-5">
        {children}
      <Footer />
      </main>
    </div>
  );
}
