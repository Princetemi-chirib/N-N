import Link from "next/link";
import { notFound } from "next/navigation";
import { deleteClient } from "@/app/actions/clients";
import { MEASUREMENT_FIELDS } from "@/lib/measurements";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function ClientDetailsPage({ params }: PageProps) {
  const { id } = await params;
  const clientId = Number(id);
  if (Number.isNaN(clientId)) notFound();

  const client = await prisma.client.findUnique({
    where: { id: clientId },
    include: {
      measurement: true,
      _count: { select: { transactions: true } },
    },
  });

  if (!client) notFound();

  const measurement = client.measurement;
  const deleteAction = deleteClient.bind(null, client.id);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <Link href="/" className="text-sm text-slate-400 hover:text-amber-200">
            ← Back to clients
          </Link>
          <h1 className="mt-2 text-2xl font-semibold text-white">
            Client Details Summary
          </h1>
          <p className="mt-1 text-sm text-slate-400">Client #{client.id}</p>
        </div>
        <form action={deleteAction}>
          <button
            type="submit"
            className="rounded-md border border-red-500/50 px-3 py-1.5 text-sm text-red-300 transition hover:bg-red-500/10"
          >
            Delete Client
          </button>
        </form>
      </div>

      {/* Client Info */}
      <section className="rounded-xl border border-slate-700 bg-slate-950/50 p-6">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-lg font-semibold text-amber-200">Client Info</h2>
          <Link
            href={`/clients/${client.id}/edit`}
            className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-500"
          >
            Edit Client Info
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <InfoField label="Client Fullname" value={client.fullName} />
          <InfoField label="Email Address" value={client.email} />
          <InfoField label="Phone Number" value={client.phoneNumber} />
          <InfoField label="Gender" value={client.gender} />
          <InfoField
            label="Date of Birth"
            value={
              client.dateOfBirth
                ? client.dateOfBirth.toLocaleDateString()
                : null
            }
          />
        </div>
      </section>

      {/* Measurements */}
      <section className="rounded-xl border border-slate-700 bg-slate-950/50 p-6">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-lg font-semibold text-amber-200">
            Default Measurement Details
          </h2>
          <Link
            href={`/clients/${client.id}/measurements`}
            className="rounded-md bg-amber-500 px-4 py-2 text-sm font-medium text-slate-950 transition hover:bg-amber-400"
          >
            Edit Measurements
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {MEASUREMENT_FIELDS.map((field) => (
              <InfoField
                key={field.key}
                label={field.label}
                value={measurement?.[field.key] ?? null}
              />
            ))}
          </div>
          <div>
            <p className="mb-1.5 text-sm text-slate-400">
              Customer&apos;s Note &amp; Special Features
            </p>
            <div className="min-h-40 whitespace-pre-wrap rounded-md border border-slate-600 bg-slate-900/80 px-3 py-2 text-sm text-white">
              {measurement?.customerNote || "—"}
            </div>
          </div>
        </div>
      </section>

      {/* Transactions */}
      <section className="rounded-xl border border-slate-700 bg-slate-950/50 p-6">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-lg font-semibold text-amber-200">
            Transactions History Summary
          </h2>
          <Link
            href={`/clients/${client.id}/transactions`}
            className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-500"
          >
            Add Transaction
          </Link>
        </div>
        <InfoField
          label="Total Transactions"
          value={String(client._count.transactions)}
        />
      </section>
    </div>
  );
}

function InfoField({
  label,
  value,
}: {
  label: string;
  value: string | null | undefined;
}) {
  return (
    <div>
      <p className="mb-1.5 text-sm text-slate-400">{label}</p>
      <div className="rounded-md border border-slate-600 bg-slate-900/80 px-3 py-2 text-sm text-white">
        {value || "—"}
      </div>
    </div>
  );
}
