import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  let clients: Awaited<ReturnType<typeof getClients>> = [];
  let dbError: string | null = null;

  try {
    clients = await getClients();
  } catch {
    dbError =
      "Could not connect to the database. Set DATABASE_URL in .env and run: npx prisma migrate dev";
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-white">Clients</h1>
          <p className="mt-1 text-sm text-slate-400">
            Manage customers, measurements, and order history.
          </p>
        </div>
        <Link
          href="/clients/new"
          className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-500"
        >
          + Create Client
        </Link>
      </div>

      {dbError ? (
        <div className="rounded-lg border border-amber-500/40 bg-amber-500/10 px-4 py-3 text-sm text-amber-100">
          {dbError}
        </div>
      ) : clients.length === 0 ? (
        <div className="rounded-lg border border-dashed border-slate-600 px-6 py-16 text-center">
          <p className="text-slate-300">No clients yet.</p>
          <Link
            href="/clients/new"
            className="mt-4 inline-block text-emerald-400 hover:underline"
          >
            Add your first client
          </Link>
        </div>
      ) : (
        <div className="overflow-hidden rounded-lg border border-slate-700">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-900/80 text-slate-400">
              <tr>
                <th className="px-4 py-3 font-medium">ID</th>
                <th className="px-4 py-3 font-medium">Full Name</th>
                <th className="px-4 py-3 font-medium">Phone</th>
                <th className="px-4 py-3 font-medium">Gender</th>
                <th className="px-4 py-3 font-medium">Transactions</th>
                <th className="px-4 py-3 font-medium" />
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 bg-slate-950/40">
              {clients.map((client) => (
                <tr key={client.id} className="hover:bg-slate-800/40">
                  <td className="px-4 py-3 text-slate-400">{client.id}</td>
                  <td className="px-4 py-3 font-medium text-white">
                    {client.fullName}
                  </td>
                  <td className="px-4 py-3 text-slate-300">
                    {client.phoneNumber || "—"}
                  </td>
                  <td className="px-4 py-3 text-slate-300">
                    {client.gender || "—"}
                  </td>
                  <td className="px-4 py-3 text-slate-300">
                    {client._count.transactions}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link
                      href={`/clients/${client.id}`}
                      className="text-emerald-400 hover:underline"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

async function getClients() {
  return prisma.client.findMany({
    orderBy: { id: "desc" },
    include: {
      _count: { select: { transactions: true } },
    },
  });
}
