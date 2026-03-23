import { AdminSidebar } from "./_components/AdminSidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      {children}
    </div>
  );
}
