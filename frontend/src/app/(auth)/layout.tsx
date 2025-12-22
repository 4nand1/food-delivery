export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex w-full justify-center items-center gap-10 px-6 bg-zinc-100">
      {children}
    </div>
  );
}
