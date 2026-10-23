export default function AdminPageHeader({ title, subtitle, actions }) {
  return (
    <div className="mb-7 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
      <div className="min-w-0">
        <p className="mb-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-red">
          MY CAR RENTAL
        </p>
        <h1 className="text-2xl font-extrabold tracking-tight text-navy sm:text-[1.75rem]">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-muted">{subtitle}</p>
        )}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2.5">{actions}</div>}
    </div>
  )
}
