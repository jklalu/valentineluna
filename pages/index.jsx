import React, { useEffect, useState } from 'react'
import SlidingBackground from '../components/SlidingBackground'

export default function Home() {
  const [images, setImages] = useState(null)
  const [objectUrls, setObjectUrls] = useState([])
  const [answered, setAnswered] = useState(false)

  useEffect(() => {
    return () => {
      objectUrls.forEach(u => URL.revokeObjectURL(u))
    }
  }, [objectUrls])

  function handleFiles(e) {
    const files = Array.from(e.target.files || [])
    if (files.length === 0) return
    // revoke previous
    objectUrls.forEach(u => URL.revokeObjectURL(u))
    const urls = files.map(f => URL.createObjectURL(f))
    setObjectUrls(urls)
    setImages(urls)
  }

  function clearImages() {
    objectUrls.forEach(u => URL.revokeObjectURL(u))
    setObjectUrls([])
    setImages(null)
  }

  return (
    <div style={{minHeight: '100vh', position: 'relative', fontFamily: 'Inter, system-ui, -apple-system, Arial'}}>
      <SlidingBackground rows={5} slidesPerRow={5} images={images || undefined} />

      <main style={{display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: 16}}>
        {!answered && (
          <div style={{position: 'relative', width: '100%', maxWidth: 520}}>
            {/* left heart */}
            <div style={{position: 'absolute', left: -20, top: '50%', transform: 'translateY(-50%)', fontSize: '2rem'}}>❤️</div>

            {/* main content div */}
            <div style={{textAlign: 'center', background: 'rgba(255,255,255,0.95)', borderRadius: 12, padding: 28}}>
              <h1 style={{fontSize: '1.75rem', margin: 0}}>Will you be my valentine, Luna?</h1>

              <div style={{marginTop: 18}}>
                <button
                  onClick={() => setAnswered(true)}
                  style={{background: '#e0245e', color: '#fff', border: 'none', padding: '12px 24px', borderRadius: 12, fontSize: '1rem', cursor: 'pointer', width: '100%'}}
                >
                  Yes
                </button>
              </div>
            </div>

            {/* right heart */}
            <div style={{position: 'absolute', right: -20, top: '50%', transform: 'translateY(-50%)', fontSize: '2rem'}}>❤️</div>
          </div>
        )}
      </main>

      {/* Overlay modal when answered */}
      {answered && (
        <div style={{position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 999, padding: 16}}>
          <div style={{background: 'rgba(255,255,255,0.95)', borderRadius: 12, padding: 32, textAlign: 'center', maxWidth: 420}}>
            <h2 style={{fontSize: '1.5rem', marginBottom: 25, color: '#e0245e'}}>Happy Valentine's Day, Luna! 💕</h2>
            <p style={{marginTop: 12, color: '#333', lineHeight: 1.6}}>
              Thank you agad for always including me in your day. Kahit hindi mo naman
              responsibility mag-update, you still choose to do it every day, and I really appreciate that.
              <br />   <br />
              I'm always rooting for your success and blessing sa life mo. But please,
              don't forget to prioritze your health and happiness too, okay? hehe. :*
              <br />
              Dito lang si Hae, always for u po hehe.
            </p>
            <p style={{marginTop: 12, color: '#555', fontStyle: 'italic'}}>
              Love, your Sun :)
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
