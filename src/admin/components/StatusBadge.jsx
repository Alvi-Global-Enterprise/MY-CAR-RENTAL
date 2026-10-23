const styles = {
  pending: 'bg-navy/[0.06] text-navy ring-navy/10',
  confirmed: 'bg-red/10 text-red ring-red/15',
  active: 'bg-navy text-white ring-navy/20',
  completed: 'bg-light text-muted ring-navy/10',
  cancelled: 'bg-red/10 text-red ring-red/20',
  available: 'bg-navy text-white ring-navy/20',
  rented: 'bg-red/10 text-red ring-red/15',
  maintenance: 'bg-navy/[0.08] text-navy ring-navy/15',
  unread: 'bg-red/10 text-red ring-red/20',
  read: 'bg-light text-muted ring-navy/10',
  replied: 'bg-navy text-white ring-navy/20',
  inactive: 'bg-light text-muted ring-navy/10',
  published: 'bg-navy text-white ring-navy/20',
  draft: 'bg-light text-muted ring-navy/10',
}

export default function StatusBadge({ status }) {
  const key = String(status || '').toLowerCase()
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold capitalize ring-1 ring-inset transition ${
        styles[key] || 'bg-light text-muted ring-navy/10'
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          key === 'cancelled' || key === 'unread' || key === 'rented' || key === 'confirmed'
            ? 'bg-red'
            : key === 'completed' || key === 'read' || key === 'inactive' || key === 'draft'
              ? 'bg-muted'
              : 'bg-current opacity-70'
        }`}
      />
      {status}
    </span>
  )
}
