import { useMemo, useState } from 'react'
import { Search, MailOpen, Reply, Trash2 } from 'lucide-react'
import { useAdmin } from '../AdminContext'
import AdminPageHeader from '../components/AdminPageHeader'
import StatusBadge from '../components/StatusBadge'

export default function MessagesAdmin() {
  const { messages, setMessages, showToast } = useAdmin()
  const [q, setQ] = useState('')
  const [selectedId, setSelectedId] = useState(messages[0]?.id || null)

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase()
    if (!term) return messages
    return messages.filter(
      (m) =>
        m.name.toLowerCase().includes(term) ||
        m.subject.toLowerCase().includes(term) ||
        m.email.toLowerCase().includes(term),
    )
  }, [messages, q])

  const selected = messages.find((m) => m.id === selectedId) || filtered[0]

  const mark = (id, status) => {
    setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, status } : m)))
    showToast(`Message marked ${status}`)
  }

  const remove = (id) => {
    setMessages((prev) => prev.filter((m) => m.id !== id))
    setSelectedId((cur) => (cur === id ? null : cur))
    showToast('Message deleted')
  }

  return (
    <div>
      <AdminPageHeader
        title="Messages"
        subtitle="Contact form inquiries from the website."
      />

      <div className="admin-search mb-5">
        <Search className="h-4 w-4 text-muted" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search messages…"
          className="w-full bg-transparent text-sm outline-none"
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-[340px_1fr]">
        <div className="admin-panel">
          <ul className="max-h-[70vh] divide-y divide-navy/[0.05] overflow-y-auto">
            {filtered.map((m) => (
              <li key={m.id}>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedId(m.id)
                    if (m.status === 'unread') mark(m.id, 'read')
                  }}
                  className={`w-full px-4 py-3.5 text-left transition duration-200 hover:bg-light/80 ${
                    selected?.id === m.id ? 'bg-light' : ''
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <p className="truncate text-sm font-semibold text-navy">{m.name}</p>
                    <StatusBadge status={m.status} />
                  </div>
                  <p className="mt-1 truncate text-xs font-medium text-navy/80">{m.subject}</p>
                  <p className="mt-1 text-[11px] text-muted">
                    {new Date(m.createdAt).toLocaleString()}
                  </p>
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="admin-card p-5 sm:p-6">
          {selected ? (
            <>
              <div className="flex flex-wrap items-start justify-between gap-3 border-b border-navy/[0.06] pb-4">
                <div>
                  <p className="text-[11px] font-bold tracking-[0.16em] text-red">INQUIRY</p>
                  <h2 className="mt-1 text-xl font-extrabold tracking-tight text-navy">{selected.subject}</h2>
                  <p className="mt-1.5 text-sm text-muted">
                    {selected.name} · {selected.email} · {selected.phone}
                  </p>
                </div>
                <StatusBadge status={selected.status} />
              </div>
              <p className="mt-5 text-sm leading-relaxed text-navy/90">{selected.message}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                <button type="button" onClick={() => mark(selected.id, 'replied')} className="admin-btn-primary">
                  <Reply className="h-4 w-4" />
                  Mark replied
                </button>
                <button type="button" onClick={() => mark(selected.id, 'read')} className="admin-btn-secondary">
                  <MailOpen className="h-4 w-4" />
                  Mark read
                </button>
                <button type="button" onClick={() => remove(selected.id)} className="admin-btn-danger">
                  <Trash2 className="h-4 w-4" />
                  Delete
                </button>
              </div>
            </>
          ) : (
            <p className="py-16 text-center text-sm text-muted">Select a message to read.</p>
          )}
        </div>
      </div>
    </div>
  )
}
