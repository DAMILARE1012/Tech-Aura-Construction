import { useEffect, useRef, useState } from 'react'
import { cn } from '@/utils/cn'
import { HERO_MEDIA } from '@/constants/site'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

/**
 * Full-bleed looping background video.
 *
 * The poster image is always painted underneath, so the hero looks finished
 * before the video buffers, if the file is missing, or when the visitor has
 * asked for reduced motion (in which case the video never loads at all).
 */
export function HeroVideo({ className }) {
  const videoRef = useRef(null)
  const prefersReducedMotion = usePrefersReducedMotion()
  const [ready, setReady] = useState(false)
  const [failed, setFailed] = useState(false)

  const showVideo = !prefersReducedMotion && !failed

  useEffect(() => {
    const video = videoRef.current
    if (!video || !showVideo) return

    // Some browsers reject autoplay even when muted; fall back to the poster.
    const attempt = video.play()
    if (attempt?.catch) attempt.catch(() => setFailed(true))
  }, [showVideo])

  return (
    <div className={cn('absolute inset-0 overflow-hidden bg-ink-950', className)} aria-hidden="true">
      <img
        src={HERO_MEDIA.poster}
        alt=""
        className="absolute inset-0 size-full object-cover"
        loading="eager"
        fetchPriority="high"
      />

      {showVideo && (
        <video
          ref={videoRef}
          className={cn(
            'absolute inset-0 size-full object-cover transition-opacity duration-1000',
            ready ? 'opacity-100' : 'opacity-0',
          )}
          poster={HERO_MEDIA.poster}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onCanPlay={() => setReady(true)}
          onError={() => setFailed(true)}
        >
          <source src={HERO_MEDIA.videoSrcWebm} type="video/webm" />
          <source src={HERO_MEDIA.videoSrc} type="video/mp4" />
        </video>
      )}

      {/* Scrim, kept as light as the type will allow. It is weighted to the
          left, where the headline sits, and fades out across the frame so the
          footage stays visible rather than sitting under a flat black wash. */}
      <div className="absolute inset-0 bg-gradient-to-r from-ink-950/75 via-ink-950/35 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink-950/55 via-transparent to-ink-950/25" />
    </div>
  )
}
