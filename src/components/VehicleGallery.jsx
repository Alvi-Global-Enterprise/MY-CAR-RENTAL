import { useEffect, useState } from 'react'
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react'

export default function VehicleGallery({ name, image, images = [] }) {
  const gallery = images.length > 0 ? images : [image]
  const [active, setActive] = useState(0)
  const [previewOpen, setPreviewOpen] = useState(false)
  const current = gallery[active] || image

  const openPreview = (index = active) => {
    setActive(index)
    setPreviewOpen(true)
  }

  const closePreview = () => setPreviewOpen(false)

  const goPrev = () => {
    setActive((i) => (i - 1 + gallery.length) % gallery.length)
  }

  const goNext = () => {
    setActive((i) => (i + 1) % gallery.length)
  }

  useEffect(() => {
    if (!previewOpen) return undefined

    const onKey = (e) => {
      if (e.key === 'Escape') closePreview()
      if (e.key === 'ArrowLeft') goPrev()
      if (e.key === 'ArrowRight') goNext()
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [previewOpen, gallery.length])

  return (
    <>
      <div className="overflow-hidden rounded-2xl bg-white shadow-soft">
        <button
          type="button"
          onClick={() => openPreview(active)}
          className="group relative block aspect-[16/10] w-full overflow-hidden bg-light text-left"
          aria-label={`Preview ${name} photo ${active + 1}`}
        >
          <img
            key={current}
            src={current}
            alt={`${name} — photo ${active + 1}`}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
          />
          <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-navy/80 px-3 py-1.5 text-xs font-medium text-white opacity-0 backdrop-blur-sm transition group-hover:opacity-100">
            <ZoomIn className="h-3.5 w-3.5" />
            Preview
          </span>
        </button>

        {gallery.length > 1 && (
          <div className="grid grid-cols-3 gap-2 p-3 sm:grid-cols-4">
            {gallery.map((src, i) => (
              <button
                key={src}
                type="button"
                onClick={() => openPreview(i)}
                aria-label={`Preview photo ${i + 1}`}
                aria-pressed={active === i}
                className={`overflow-hidden rounded-xl border-2 transition ${
                  active === i
                    ? 'border-red shadow-sm'
                    : 'border-transparent opacity-80 hover:opacity-100'
                }`}
              >
                <img
                  src={src}
                  alt=""
                  className="aspect-[16/10] h-full w-full object-cover"
                  loading="lazy"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {previewOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-navy/90 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={`${name} image preview`}
          onClick={closePreview}
        >
          <button
            type="button"
            onClick={closePreview}
            className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
            aria-label="Close preview"
          >
            <X className="h-5 w-5" />
          </button>

          {gallery.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  goPrev()
                }}
                className="absolute left-3 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 sm:left-6"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  goNext()
                }}
                className="absolute right-3 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 sm:right-6"
                aria-label="Next image"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </>
          )}

          <div
            className="relative flex max-h-[85vh] max-w-5xl flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={current}
              alt={`${name} — preview ${active + 1}`}
              className="max-h-[75vh] w-auto max-w-full rounded-xl object-contain shadow-2xl"
            />
            <p className="mt-3 text-sm text-white/80">
              {name} — {active + 1} / {gallery.length}
            </p>
          </div>
        </div>
      )}
    </>
  )
}
