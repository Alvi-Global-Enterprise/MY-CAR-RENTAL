import { business } from '../data/business'

export default function AnnouncementBar() {
  const messages = business.announcementMessages
  // Duplicate for seamless infinite loop
  const track = [...messages, ...messages]

  return (
    <div
      className="relative z-[60] overflow-hidden bg-gradient-to-r from-navy via-navy-secondary to-navy text-white"
      role="region"
      aria-label="Announcements"
    >
      <div className="flex whitespace-nowrap py-2 text-[12px] font-medium tracking-wide sm:text-[13px]">
        <div className="announce-marquee flex min-w-full shrink-0 items-center">
          {track.map((text, i) => (
            <span key={`${text}-${i}`} className="inline-flex items-center">
              <span>{text}</span>
              <span
                className="mx-5 inline-block h-1 w-1 rounded-full bg-red sm:mx-8"
                aria-hidden="true"
              />
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
