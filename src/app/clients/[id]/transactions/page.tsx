import Link from "next/link";
import { notFound } from "next/navigation";
import { createTransaction } from "@/app/actions/transactions";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function TransactionsPage({ params }: PageProps) {
  const { id } = await params;
  const clientId = Number(id);
  if (Number.isNaN(clientId)) notFound();

  const client = await prisma.client.findUnique({
    where: { id: clientId },
    include: {
      transactions: { orderBy: { createdAt: "desc" } },
    },
  });
  if (!client) notFound();

  const action = createTransaction.bind(null, client.id);

  return (
    <div className="space-y-6">
      <div>
        <Link
          href={`/clients/${client.id}`}
          className="text-sm text-slate-400 hover:text-amber-200"
        >
          ← Back to client
        </Link>
        <h1 className="mt-2 text-2xl font-semibold text-white">
          Transaction History
        </h1>
        <p className="mt-1 text-sm text-slate-400">{client.fullName}</p>
      </div>

      <section className="rounded-xl border border-slate-700 bg-slate-950/50 p-6">
        <h2 className="mb-4 text-lg font-semibold text-amber-200">
          Add Transaction
        </h2>
        <form action={action} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <label className="block space-y-1.5 sm:col-span-2">
            <span className="text-sm text-slate-300">Description</span>
            <input
              name="description"
              className="w-full rounded-md border border-slate-600 bg-slate-900/80 px-3 py-2 text-white outline-none focus:border-amber-400"
              placeholder="e.g. Agbada + trouser"
            />
          </label>
          <label className="block space-y-1.5">
            <span className="text-sm text-slate-300">Amount</span>
            <input
              name="amount"
              type="number"
              step="0.01"
              required
              className="w-full rounded-md border border-slate-600 bg-slate-900/80 px-3 py-2 text-white outline-none focus:border-amber-400"
            />
          </label>
          <label className="block space-y-1.5">
            <span className="text-sm text-slate-300">Status</span>
            <select
              name="status"
              defaultValue="pending"
              className="w-full rounded-md border border-slate-600 bg-slate-900/80 px-3 py-2 text-white outline-none focus:border-amber-400"
            >
              <option value="pending">Pending</option>
              <option value="paid">Paid</option>
              <option value="partial">Partial</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </label>
          <div className="sm:col-span-2 lg:col-span-4">
            <button
              type="submit"
              className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-500"
            >
              Save Transaction
            </button>
          </div>
        </form>
      </section>

      <section className="overflow-hidden rounded-xl border border-slate-700">
        {client.transactions.length === 0 ? (
          <div className="px-6 py-12 text-center text-slate-400">
            No transactions yet.
          </div>
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-900/80 text-slate-400">
              <tr>
                <th className="px-4 py-3 font-medium">Date</th>
                <th className="px-4 py-3 font-medium">Description</th>
                <th className="px-4 py-3 font-medium">Amount</th>
                <th className="px-4 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 bg-slate-950/40">
              {client.transactions.map((tx) => (
                <tr key={tx.id}>
                  <td className="px-4 py-3 text-slate-400">
                    {tx.createdAt.toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 text-white">
                    {tx.description || "—"}
                  </td>
                  <td className="px-4 py-3 text-white">
                    ₦{Number(tx.amount).toLocaleString()}
                  </td>
                  <td className="px-4 py-3 capitalize text-slate-300">
                    {tx.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
}
