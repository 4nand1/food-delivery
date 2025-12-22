import Header from "@/app/_components/header/Header";

export default function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen w-full bg-[#1f1f1f]">
      <Header />
      <main className="mx-auto w-full max-w px-4 sm:px-6 lg:px-8 py-6">
        {children}
      </main>
    </div>
  );
}
