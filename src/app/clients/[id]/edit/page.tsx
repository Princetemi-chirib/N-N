import Link from "next/link";
import { notFound } from "next/navigation";
import { updateClientInfo } from "@/app/actions/clients";
import { ClientForm } from "@/components/ClientForm";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditClientPage({ params }: PageProps) {
  const { id } = await params;
  const clientId = Number(id);
  if (Number.isNaN(clientId)) notFound();

  const client = await prisma.client.findUnique({ where: { id: clientId } });
  if (!client) notFound();

  const action = updateClientInfo.bind(null, client.id);

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
          Edit Client Info
        </h1>
      </div>

      <div className="rounded-xl border border-slate-700 bg-slate-950/50 p-6">
        <ClientForm
          action={action}
          submitLabel="Save Client Info"
          showMeasurements={false}
          defaultValues={client}
        />
      </div>
    </div>
  );
}
