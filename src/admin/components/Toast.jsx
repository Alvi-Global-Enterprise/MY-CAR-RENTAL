import { CheckCircle2, X } from 'lucide-react'

export default function Toast({ message, onClose }) {
  if (!message) return null
  return (
    <div className="fixed bottom-5 left-4 right-4 z-[90] animate-[fadeIn_0.25s_ease] sm:left-auto sm:right-6 sm:w-auto">
      <div className="flex items-center gap-3 rounded-2xl border border-navy/10 bg-white px-4 py-3.5 shadow-lift">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-navy text-white">
          <CheckCircle2 className="h-4 w-4" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-navy">{message}</p>
          <p className="text-[11px] text-muted">Saved for this session</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="rounded-lg p-1.5 text-muted transition hover:bg-light hover:text-navy"
          aria-label="Dismiss"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
