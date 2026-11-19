import Link from "next/link";
import { createClient } from "@/app/actions/clients";
import { ClientForm } from "@/components/ClientForm";

export default function NewClientPage() {
  return (
    <div className="space-y-6">
      <div>
        <Link href="/" className="text-sm text-slate-400 hover:text-amber-200">
          ← Back to clients
        </Link>
        <h1 className="mt-2 text-2xl font-semibold text-white">
          Create New Client
        </h1>
        <p className="mt-1 text-sm text-slate-400">
          Add client info and default measurements in one go.
        </p>
      </div>

      <div className="rounded-xl border border-slate-700 bg-slate-950/50 p-6">
        <ClientForm action={createClient} submitLabel="Save Client" />
      </div>
    </div>
  );
}
