import Link from "next/link";
import { notFound } from "next/navigation";
import { updateMeasurements } from "@/app/actions/clients";
import { ClientForm } from "@/components/ClientForm";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditMeasurementsPage({ params }: PageProps) {
  const { id } = await params;
  const clientId = Number(id);
  if (Number.isNaN(clientId)) notFound();

  const client = await prisma.client.findUnique({
    where: { id: clientId },
    include: { measurement: true },
  });
  if (!client) notFound();

  const action = updateMeasurements.bind(null, client.id);

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
          Edit Measurements
        </h1>
        <p className="mt-1 text-sm text-slate-400">{client.fullName}</p>
      </div>

      <div className="rounded-xl border border-slate-700 bg-slate-950/50 p-6">
        <ClientForm
          action={action}
          submitLabel="Save Measurements"
          showClientInfo={false}
          defaultValues={{
            measurement: client.measurement,
          }}
        />
      </div>
    </div>
  );
}
