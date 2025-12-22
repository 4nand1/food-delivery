import Link from "next/link";

export default function AdminHomePage() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Admin</h2>
      <p className="text-sm text-neutral-600">
        Choose a section to manage. (UI only)
      </p>

      <div className="grid gap-3 sm:grid-cols-2">
        <Link
          href="/admin/orders"
          className="rounded-2xl border border-neutral-200 bg-white p-4 hover:bg-neutral-50"
        >
          <p className="font-medium">Orders</p>
          <p className="text-sm text-neutral-600">View and update delivery state</p>
        </Link>

        <Link
          href="/admin/dishes"
          className="rounded-2xl border border-neutral-200 bg-white p-4 hover:bg-neutral-50"
        >
          <p className="font-medium">Food menu</p>
          <p className="text-sm text-neutral-600">Add/edit dishes & categories</p>
        </Link>
      </div>
    </div>
  );
}
