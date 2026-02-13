import React from 'react'

import img1 from './20332d73-1c24-49ec-8724-82819f68c520.jpg'
import img2 from './37c73b3b-d5fb-4dff-b044-c20010ea1ee2.jpg'
import img3 from './42e69f73-5245-4cd9-9064-b3c017a5ba58.jpg'
import img4 from './b958f9cf-c819-4099-868f-2acd2b958a3b.jpg'
import img5 from './bc75f032-1eaa-46df-86bb-6a17acefa195.jpg'

export default function SlidingBackground({ rows = 5, slidesPerRow = 5, images }) {
  // use uploaded local images inside `components/` when available
  const defaultLocal = [img1, img2, img3, img4, img5]
  const defaultImages = images && images.length > 0 ? images : defaultLocal

  // normalize imported image modules to plain src strings
  const resolveSrc = (it) => {
    if (!it) return ''
    if (typeof it === 'string') return it
    if (typeof it === 'object') {
      // Next.js image imports may be objects like { src, height, width }
      return it.src || it.default || ''
    }
    return String(it)
  }

  const resolvedImages = defaultImages.map(resolveSrc)
  // Ensure we have exactly slidesPerRow unique slides per row (repeat if needed)
  const slides = Array.from({ length: slidesPerRow }).map((_, i) => resolvedImages[i % resolvedImages.length])
  // layout math for filling the full viewport height
  const gap = 10 // matches CSS gap between rows
  const rootPadding = 16 // top+bottom padding in root
  const totalGaps = (rows - 1) * gap + rootPadding

  return (
    <div className="sb-root" aria-hidden>
      {Array.from({ length: rows }).map((_, rowIndex) => {
        const reverse = rowIndex % 2 === 1
        const duration = 18 + rowIndex * 4 // vary speed per row
        const len = resolvedImages.length
        const start = rowIndex % len
        const rowSlides = Array.from({ length: slidesPerRow }).map((_, i) => resolvedImages[(start + i) % len])

        return (
          <div
            key={rowIndex}
            className={`sb-row ${reverse ? 'reverse' : ''}`}
            style={{ '--duration': `${duration}s`, '--row-height': `calc((100vh - ${totalGaps}px) / ${rows})` }}
          >
            <div className="sb-track">
              {rowSlides.concat(rowSlides).map((src, i) => (
                <div className="sb-slide" key={i}>
                  <img src={src} alt={`slide-${(i % slidesPerRow)}`} />
                </div>
              ))}
            </div>
          </div>
        )
      })}

      <div className="sb-overlay" />

      <style jsx>{`
        .sb-root {
          position: fixed;
          inset: 0;
          z-index: -1;
          display: flex;
          flex-direction: column;
          justify-content: stretch;
          gap: 10px;
          padding: 8px 0;
          pointer-events: none;
          background: #000;
        }

        /* semi-transparent black overlay above slides but behind page content */
        .sb-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.4);
          z-index: 2;
          pointer-events: none;
        }

        /* rows stretch to evenly fill the viewport height */
        .sb-row {
          width: 100%;
          overflow: hidden;
          flex: 1 1 0;
        }

        /* per-row height variable computed in JS: used to make square slides */
        .sb-row { --slide-size: var(--row-height); }

        .sb-track {
          display: flex;
          gap: 8px;
          width: max-content;
          align-items: center;
          animation: sb-scroll var(--duration) linear infinite;
        }

        .sb-row.reverse .sb-track { animation-direction: reverse; }

        .sb-slide {
          flex: 0 0 var(--slide-size);
          width: var(--slide-size);
          height: var(--slide-size);
          border-radius: 10px;
          overflow: hidden;
          background: #111;
        }

        .sb-slide img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        @keyframes sb-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  )
}
