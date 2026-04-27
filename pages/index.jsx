import React, { useEffect, useState } from 'react'
import SlidingBackground from '../components/SlidingBackground'

export default function Home() {
  const [images, setImages] = useState(null)
  const [objectUrls, setObjectUrls] = useState([])
  const [answered, setAnswered] = useState(false)
  const [isPlaying, setIsPlaying] = useState(true)
  const audioRef = React.useRef(null)

  useEffect(() => {
    return () => {
      objectUrls.forEach(u => URL.revokeObjectURL(u))
    }
  }, [objectUrls])

  useEffect(() => {
    // Try to play audio on mount
    if (audioRef.current && isPlaying) {
      audioRef.current.play().catch(err => {
        console.log('Autoplay blocked, user needs to interact first')
        setIsPlaying(false)
      })
    }
  }, [])

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
      <style>{`
        @media (max-width: 640px) {
          .selfie-img {
            height: 200px !important;
          }
        }
      `}</style>
      <SlidingBackground rows={5} slidesPerRow={5} images={images || undefined} />
      
      {/* Background Music */}
      <audio ref={audioRef} loop style={{display: 'none'}}>
        <source src="/bruno-mars-risk-it-all.mp3" type="audio/mpeg" />
      </audio>

      <main style={{display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', overflowY: 'auto', padding: 16, position: 'relative'}}>
        {/* Music Control Button */}
        <button 
          onClick={() => {
            if (audioRef.current) {
              if (isPlaying) {
                audioRef.current.pause()
              } else {
                audioRef.current.play()
              }
              setIsPlaying(!isPlaying)
            }
          }}
          style={{
            position: 'fixed',
            top: 20,
            right: 20,
            width: 50,
            height: 50,
            borderRadius: '50%',
            border: 'none',
            background: 'rgba(255,255,255,0.9)',
            fontSize: '1.5rem',
            cursor: 'pointer',
            zIndex: 100,
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}
        >
          {isPlaying ? '🎵' : '🔇'}
        </button>
        {!answered && (
          <div style={{position: 'relative', width: '100%', maxWidth: 520}}>
            {/* left heart */}
            <div style={{position: 'absolute', left: -20, top: '50%', transform: 'translateY(-50%)', fontSize: '2rem'}}>❤️</div>

            {/* main content div */}
            <div style={{textAlign: 'center', background: 'rgba(255,255,255,0.95)', borderRadius: 12, padding: 28}}>
              <h1 style={{fontSize: '0.75rem', letterSpacing: '0.03rem', fontWeight: 500, margin: 0}}>
                Hi Luna, Kamusta ka? Sana you're doing well. It's been a month since we last talked, and I just wanted to say that I miss you.

                Thank you for being a part of my life,  you're truly special to me. You've brought so much joy and happiness into my life in the short time we've known each other, and I'm grateful for every moment we've shared.

                I don't know when mo babalikan tong valentine message ko haha, but I just want you to know that you are loved and appreciated.

                Sorry, Chaiu, I gave up on us, but I hope you find happiness and love in your life.

                Ito yung biggest regret ko sa buhay, na pinabayaan kita, and I hope someday you can forgive me for that.

                I hope we talk again someday, but if not, I just want you to know that you will always have a special place in my heart. Take care always, and I wish you all the best in everything you do.

                Sorry if I can't directly say this to you; still, I'm afraid to do so, but I just want to say it here,

                I love you, Chaiu. ❤️
                </h1>

                <h2 style={{fontSize: '0.75rem', letterSpacing: '0.03rem', fontWeight: 500, marginTop: 16}}>
                  Anyway, this is my #1 favorite selfie of you. It was the first time you sent me a selfie, and it made me blush.
                    </h2>
                    <img className="selfie-img" src="/20332d73-1c24-49ec-8724-82819f68c520.jpg" alt="Luna's selfie" style={{width: '100%', height: '300px', marginTop: 12, borderRadius: 8, objectFit: 'cover'}}/>
            </div>

            {/* right heart */}
            <div style={{position: 'absolute', right: -20, top: '50%', transform: 'translateY(-50%)', fontSize: '2rem'}}>❤️</div>
          </div>
        )}
      </main>

      {/* Overlay modal when answered */}
    </div>
  )
}
