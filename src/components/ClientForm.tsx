import { MEASUREMENT_FIELDS } from "@/lib/measurements";

type MeasurementValues = Partial<
  Record<(typeof MEASUREMENT_FIELDS)[number]["key"], string | null>
> & {
  customerNote?: string | null;
};

type ClientFormProps = {
  action: (formData: FormData) => Promise<void>;
  submitLabel: string;
  defaultValues?: {
    fullName?: string;
    email?: string | null;
    phoneNumber?: string | null;
    gender?: string | null;
    dateOfBirth?: Date | string | null;
    measurement?: MeasurementValues | null;
  };
  showClientInfo?: boolean;
  showMeasurements?: boolean;
};

export function ClientForm({
  action,
  submitLabel,
  defaultValues,
  showClientInfo = true,
  showMeasurements = true,
}: ClientFormProps) {
  const m = defaultValues?.measurement;

  return (
    <form action={action} className="space-y-8">
      {showClientInfo && (
        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-amber-200">Client Info</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Client Fullname" name="fullName" required defaultValue={defaultValues?.fullName} />
            <Field label="Email Address" name="email" type="email" defaultValue={defaultValues?.email ?? undefined} />
            <Field label="Phone Number" name="phoneNumber" defaultValue={defaultValues?.phoneNumber ?? undefined} />
            <Field
              label="Date of Birth"
              name="dateOfBirth"
              type="date"
              defaultValue={toDateInputValue(defaultValues?.dateOfBirth)}
            />
            <label className="block space-y-1.5">
              <span className="text-sm text-slate-300">Gender</span>
              <select
                name="gender"
                defaultValue={defaultValues?.gender ?? ""}
                className="w-full rounded-md border border-slate-600 bg-slate-900/80 px-3 py-2 text-white outline-none focus:border-amber-400"
              >
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </label>
          </div>
        </section>
      )}

      {showMeasurements && (
        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-amber-200">
            Default Measurement Details
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {MEASUREMENT_FIELDS.map((field) => (
              <Field
                key={field.key}
                label={field.label}
                name={field.key}
                defaultValue={m?.[field.key] ?? undefined}
              />
            ))}
          </div>
          <label className="block space-y-1.5">
            <span className="text-sm text-slate-300">
              Customer&apos;s Note &amp; Special Features
            </span>
            <textarea
              name="customerNote"
              rows={5}
              defaultValue={m?.customerNote ?? undefined}
              className="w-full rounded-md border border-slate-600 bg-slate-900/80 px-3 py-2 text-white outline-none focus:border-amber-400"
              placeholder="e.g. English pant. Inner pen pocket..."
            />
          </label>
        </section>
      )}

      <button
        type="submit"
        className="rounded-md bg-emerald-600 px-5 py-2.5 font-medium text-white transition hover:bg-emerald-500"
      >
        {submitLabel}
      </button>
    </form>
  );
}

function toDateInputValue(value?: Date | string | null) {
  if (!value) return undefined;
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return undefined;
  return date.toISOString().slice(0, 10);
}

function Field({
  label,
  name,
  type = "text",
  required,
  defaultValue,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  defaultValue?: string;
}) {
  return (
    <label className="block space-y-1.5">
      <span className="text-sm text-slate-300">{label}</span>
      <input
        type={type}
        name={name}
        required={required}
        defaultValue={defaultValue}
        className="w-full rounded-md border border-slate-600 bg-slate-900/80 px-3 py-2 text-white outline-none focus:border-amber-400"
      />
    </label>
  );
}
