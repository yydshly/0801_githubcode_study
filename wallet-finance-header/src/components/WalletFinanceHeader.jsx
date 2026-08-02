import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Check, ChevronDown, Menu, Send, X } from 'lucide-react';
import { clamp, getScrollProgress } from '../utils/scrollProgress.js';

const VIDEO_URL = 'https://cdn.jiro.build/Wallet/Astro.mp4';
const LOGO_URL = 'https://cdn.jiro.build/Wallet/Ardor.png';
const SCRUB_SECONDS = 4;
const TAIL_PROGRESS = 0.95;
const CUE_HIDE_PROGRESS = 0.92;
const EMPTY_FORM = { name: '', email: '', message: '' };

const drawerItems = [
  { label: 'Connect Keystore', description: 'Secure wallet handshake', connect: true },
  { label: 'Ecosystem', description: 'Cosmic scale chains' },
  { label: 'Security Protocols', description: 'Military-grade cryptographic shield' },
  { label: 'Interstellar Hub', description: 'Multi-signature smart network' },
];

const transition = { duration: 0.65, ease: [0.16, 1, 0.3, 1] };

function FocusTrap({ panelRef, onEscape, children }) {
  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onEscape();
        return;
      }

      if (event.key !== 'Tab') return;
      const focusable = [...panel.querySelectorAll(
        'button:not([disabled]), a[href], input:not([disabled]), textarea:not([disabled])',
      )];
      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    panel.addEventListener('keydown', handleKeyDown);
    return () => panel.removeEventListener('keydown', handleKeyDown);
  }, [onEscape, panelRef]);

  return children;
}

function PortalDrawer({
  isOpen,
  panelRef,
  closeButtonRef,
  onClose,
  onConnect,
  reducedMotion,
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={reducedMotion ? { duration: 0 } : { duration: 0.25 }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) onClose();
          }}
          aria-label="Portal directory overlay"
        >
          <motion.aside
            ref={panelRef}
            className="flex h-full w-full max-w-md flex-col justify-between border-l border-white/10 bg-neutral-950 p-6 text-white shadow-2xl sm:p-8"
            role="dialog"
            aria-modal="true"
            aria-labelledby="portal-directory-title"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={reducedMotion ? { duration: 0 } : { type: 'spring', damping: 25, stiffness: 200 }}
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div>
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <svg aria-hidden="true" width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M7 1 13 12H1L7 1Z" fill="white" fillOpacity=".8" />
                  </svg>
                  <p id="portal-directory-title" className="wallet-mono text-[11px] uppercase tracking-[0.28em] text-neutral-400">
                    Portal Directory
                  </p>
                </div>
                <button
                  ref={closeButtonRef}
                  type="button"
                  className="rounded-full border border-white/10 bg-white/5 p-2 text-neutral-300 transition hover:bg-white/10 hover:text-white"
                  onClick={onClose}
                  aria-label="Close portal directory"
                >
                  <X size={18} strokeWidth={1.6} />
                </button>
              </div>

              <nav className="mt-12 space-y-3" aria-label="Portal directory links">
                {drawerItems.map((item, index) => (
                  <motion.button
                    key={item.label}
                    type="button"
                    className="group flex w-full items-center justify-between rounded-xl border border-transparent p-4 text-left transition hover:border-white/10 hover:bg-white/5"
                    initial={reducedMotion ? false : { opacity: 0, x: 16 }}
                    animate={reducedMotion ? undefined : { opacity: 1, x: 0 }}
                    transition={reducedMotion ? { duration: 0 } : { ...transition, delay: index * 0.06 }}
                    onClick={() => {
                      if (item.connect) onConnect();
                    }}
                  >
                    <span>
                      <span className="block text-[15px] font-medium text-white transition group-hover:text-amber-400">
                        {item.label}
                      </span>
                      <span className="mt-1 block text-xs text-neutral-500">{item.description}</span>
                    </span>
                    <ArrowUpRight size={18} className="text-neutral-500 transition group-hover:text-amber-300" strokeWidth={1.5} />
                  </motion.button>
                ))}
              </nav>
            </div>

            <div className="wallet-mono border-t border-white/5 pt-6 text-[10px] uppercase tracking-[0.18em] text-neutral-500">
              <div className="flex items-center justify-between gap-4">
                <span>Network status:</span>
                <span className="flex items-center gap-2 text-emerald-400">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                  Active mainnet
                </span>
              </div>
              <div className="mt-3 flex items-center justify-between gap-4">
                <span>Latency:</span>
                <span className="text-neutral-400">14ms (decentralized)</span>
              </div>
            </div>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ContactModal({
  isOpen,
  panelRef,
  closeButtonRef,
  form,
  isSubmitted,
  onChange,
  onSubmit,
  onClose,
  reducedMotion,
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={reducedMotion ? { duration: 0 } : { duration: 0.25 }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) onClose();
          }}
          aria-label="Contact Wallet Agent overlay"
        >
          <motion.div
            ref={panelRef}
            className="w-full max-w-lg overflow-hidden rounded-2xl border border-white/10 bg-neutral-900 p-6 text-white shadow-2xl sm:p-8"
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-modal-title"
            initial={reducedMotion ? false : { opacity: 0, scale: 0.95, y: 15 }}
            animate={reducedMotion ? undefined : { opacity: 1, scale: 1, y: 0 }}
            exit={reducedMotion ? undefined : { opacity: 0, scale: 0.95, y: 15 }}
            transition={reducedMotion ? { duration: 0 } : transition}
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-5">
              <div>
                <p className="wallet-mono text-[10px] uppercase tracking-[0.25em] text-neutral-500">Secure transmission</p>
                <h2 id="contact-modal-title" className="mt-2 text-xl font-semibold tracking-tight text-white">
                  Contact Wallet Agent
                </h2>
              </div>
              <button
                ref={closeButtonRef}
                type="button"
                className="rounded-full border border-white/10 bg-white/5 p-2 text-neutral-300 transition hover:bg-white/10 hover:text-white"
                onClick={onClose}
                aria-label="Close contact form"
              >
                <X size={18} strokeWidth={1.6} />
              </button>
            </div>

            <AnimatePresence mode="wait" initial={false}>
              {isSubmitted ? (
                <motion.div
                  key="success"
                  className="flex min-h-[280px] flex-col items-center justify-center text-center"
                  initial={reducedMotion ? false : { opacity: 0, y: 10 }}
                  animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                  exit={reducedMotion ? undefined : { opacity: 0, y: -10 }}
                  transition={reducedMotion ? { duration: 0 } : transition}
                  role="status"
                  aria-live="polite"
                >
                  <span className="flex h-14 w-14 items-center justify-center rounded-full border border-emerald-400/30 bg-emerald-400/10 text-emerald-400">
                    <Check size={27} strokeWidth={1.8} />
                  </span>
                  <h3 className="mt-6 text-lg font-semibold">Transmission Confirmed</h3>
                  <p className="mt-3 max-w-sm text-sm leading-6 text-neutral-400">
                    Your message has been secure-routed into our interstellar support relays. Expect response shortly.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  className="mt-8 space-y-5"
                  onSubmit={onSubmit}
                  initial={reducedMotion ? false : { opacity: 0 }}
                  animate={reducedMotion ? undefined : { opacity: 1 }}
                  exit={reducedMotion ? undefined : { opacity: 0 }}
                  transition={reducedMotion ? { duration: 0 } : { duration: 0.2 }}
                >
                  <label className="block">
                    <span className="wallet-contact-label text-neutral-400">Your Name</span>
                    <input
                      className="mt-2 w-full rounded-lg border border-white/10 bg-neutral-950 px-4 py-3 text-sm text-white placeholder:text-neutral-700 transition focus:border-white/30 focus:outline-none"
                      name="name"
                      value={form.name}
                      onChange={onChange}
                      placeholder="John Doe"
                      autoComplete="name"
                      required
                    />
                  </label>

                  <label className="block">
                    <span className="wallet-contact-label text-neutral-400">Secure Email Address</span>
                    <input
                      className="mt-2 w-full rounded-lg border border-white/10 bg-neutral-950 px-4 py-3 text-sm text-white placeholder:text-neutral-700 transition focus:border-white/30 focus:outline-none"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={onChange}
                      placeholder="john@securesite.org"
                      autoComplete="email"
                      required
                    />
                  </label>

                  <label className="block">
                    <span className="wallet-contact-label text-neutral-400">Transmission Message</span>
                    <textarea
                      className="mt-2 min-h-[116px] w-full resize-y rounded-lg border border-white/10 bg-neutral-950 px-4 py-3 text-sm leading-6 text-white placeholder:text-neutral-700 transition focus:border-white/30 focus:outline-none"
                      name="message"
                      value={form.message}
                      onChange={onChange}
                      placeholder="Type your secure message here..."
                      rows={4}
                      required
                    />
                  </label>

                  <button
                    type="submit"
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-white px-4 py-3 text-sm font-semibold text-black transition hover:bg-neutral-200 active:scale-[0.99]"
                  >
                    <Send size={16} strokeWidth={1.8} />
                    Transmit Secure Message
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function WalletFinanceHeader() {
  const reducedMotion = Boolean(useReducedMotion());
  const videoRef = useRef(null);
  const walletButtonRef = useRef(null);
  const menuButtonRef = useRef(null);
  const contactButtonRef = useRef(null);
  const drawerPanelRef = useRef(null);
  const drawerCloseRef = useRef(null);
  const modalPanelRef = useRef(null);
  const modalCloseRef = useRef(null);
  const submitTimerRef = useRef(null);
  const progressRef = useRef(0);
  const [progress, setProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [contactForm, setContactForm] = useState(EMPTY_FORM);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [videoBlocked, setVideoBlocked] = useState(false);

  useEffect(() => {
    progressRef.current = progress;
  }, [progress]);

  useEffect(() => {
    let frame = null;
    const update = () => {
      frame = null;
      const nextProgress = getScrollProgress(document, window);
      setProgress((previous) => (Math.abs(previous - nextProgress) < 0.001 ? previous : nextProgress));
    };
    const scheduleUpdate = () => {
      if (frame === null) frame = window.requestAnimationFrame(update);
    };
    const updateViewport = () => setIsMobile(window.innerWidth < 768);

    update();
    updateViewport();
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', updateViewport);

    return () => {
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', updateViewport);
      if (frame !== null) window.cancelAnimationFrame(frame);
    };
  }, []);

  const syncVideo = useCallback(() => {
    const video = videoRef.current;
    if (!video || !videoReady || videoError || videoBlocked || reducedMotion) return;

    if (progressRef.current < TAIL_PROGRESS) {
      if (!video.paused) video.pause();
      const duration = Number.isFinite(video.duration) && video.duration > 0 ? video.duration : SCRUB_SECONDS;
      const target = clamp(progressRef.current * SCRUB_SECONDS, 0, Math.max(duration - 0.1, 0));
      try {
        if (video.readyState >= 1 && Math.abs(video.currentTime - target) > 0.08) video.currentTime = target;
      } catch {
        setVideoBlocked(true);
      }
      return;
    }

    video.loop = false;
    if (Number.isFinite(video.duration) && video.duration > SCRUB_SECONDS && video.currentTime < SCRUB_SECONDS) {
      video.currentTime = SCRUB_SECONDS;
    }
    if (video.paused) {
      const playPromise = video.play();
      if (playPromise?.catch) playPromise.catch(() => setVideoBlocked(true));
    }
  }, [reducedMotion, videoBlocked, videoError, videoReady]);

  useEffect(() => {
    syncVideo();
  }, [progress, syncVideo]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;

    const handleTimeUpdate = () => {
      if (
        !reducedMotion
        && progressRef.current >= TAIL_PROGRESS
        && Number.isFinite(video.duration)
        && video.duration > SCRUB_SECONDS
        && video.currentTime >= video.duration - 0.2
      ) {
        video.currentTime = SCRUB_SECONDS;
      }
    };
    const handleEnded = () => {
      if (reducedMotion || progressRef.current < TAIL_PROGRESS || !Number.isFinite(video.duration)) return;
      video.currentTime = Math.min(SCRUB_SECONDS, Math.max(video.duration - 0.1, 0));
      video.play().catch(() => setVideoBlocked(true));
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('ended', handleEnded);
    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('ended', handleEnded);
    };
  }, [reducedMotion]);

  useEffect(() => () => {
    if (submitTimerRef.current) window.clearTimeout(submitTimerRef.current);
    videoRef.current?.pause();
  }, []);

  useEffect(() => {
    const overlayOpen = isDrawerOpen || isContactOpen;
    if (!overlayOpen) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isContactOpen, isDrawerOpen]);

  useEffect(() => {
    if (!isDrawerOpen && !isContactOpen) return undefined;
    const focusTarget = isDrawerOpen ? drawerCloseRef : modalCloseRef;
    const frame = window.requestAnimationFrame(() => focusTarget.current?.focus());
    return () => window.cancelAnimationFrame(frame);
  }, [isContactOpen, isDrawerOpen]);

  const closeDrawer = useCallback(() => {
    setIsDrawerOpen(false);
    window.requestAnimationFrame(() => menuButtonRef.current?.focus());
  }, []);

  const closeContact = useCallback(() => {
    if (submitTimerRef.current) window.clearTimeout(submitTimerRef.current);
    submitTimerRef.current = null;
    setIsContactOpen(false);
    setIsSubmitted(false);
    setContactForm(EMPTY_FORM);
    window.requestAnimationFrame(() => contactButtonRef.current?.focus());
  }, []);

  const rightOpacity = clamp((progress - 0.1) / 0.8);
  const rightOffset = (1 - rightOpacity) * (isMobile ? 30 : 120);
  const progressPercent = Math.round(progress * 100);

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setContactForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitted(true);
    submitTimerRef.current = window.setTimeout(closeContact, 2500);
  };

  return (
    <section className="wallet-section relative h-[250vh] w-full select-none bg-black text-white">
      <style>{`
        @media (min-width: 1024px) { .wallet-section .anybody-heading { font-size: 70px !important; line-height: 1.1 !important; } }
        @media (min-width: 768px) and (max-width: 1023px) { .wallet-section .anybody-heading { font-size: 52px !important; line-height: 1.1 !important; } }
        @media (max-width: 767px) { .wallet-section .anybody-heading { font-size: 34px !important; line-height: 1.2 !important; } }
      `}</style>

      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <video
          ref={videoRef}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${videoError ? 'opacity-0' : 'opacity-90'}`}
          src={VIDEO_URL}
          muted
          playsInline
          preload="metadata"
          loop={false}
          onLoadedMetadata={() => {
            setVideoReady(true);
            setVideoError(false);
          }}
          onError={() => {
            setVideoError(true);
            setVideoReady(false);
          }}
          aria-hidden="true"
        />

        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-black/35" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60" />

        <header className="absolute inset-x-0 top-0 z-30 flex items-start justify-between gap-4 px-4 py-6 md:px-20 md:py-12">
          <button
            ref={walletButtonRef}
            type="button"
            className="group flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5 backdrop-blur-md transition hover:bg-white/10 active:scale-95 md:gap-2.5 md:px-4 md:py-2.5"
            onClick={() => setIsConnected((connected) => !connected)}
            aria-pressed={isConnected}
            aria-label={isConnected ? 'Disconnect Wallet' : 'Connect Wallet'}
          >
            <img className="h-4 w-4 object-contain md:h-5 md:w-5" src={LOGO_URL} alt="Wallet Logo" referrerPolicy="no-referrer" />
            <span className="font-['Anybody'] text-sm font-medium leading-4 text-white md:text-lg">Wallet</span>
            {isConnected && <span className="wallet-mono ml-1 hidden text-[9px] uppercase tracking-[0.15em] text-emerald-300 sm:inline">Online</span>}
          </button>

          <div className="flex items-center gap-2 md:gap-3">
            <button
              type="button"
              ref={menuButtonRef}
              className="rounded-lg border border-white/10 bg-white/5 p-2.5 text-white backdrop-blur-md transition hover:bg-white/10 active:scale-95 md:p-3.5"
              onClick={() => setIsDrawerOpen(true)}
              aria-label="Open portal directory"
              aria-expanded={isDrawerOpen}
            >
              <Menu size={16} strokeWidth={1.7} className="md:h-[18px] md:w-[18px]" />
            </button>
            <button
              ref={contactButtonRef}
              type="button"
              className="flex items-center gap-1.5 rounded-lg border border-neutral-700 bg-white px-3.5 py-2.5 font-['Arial_Black'] text-sm font-bold leading-4 text-[#0B3A17] shadow-[0_4px_20px_rgba(255,255,255,0.15)] transition duration-300 hover:scale-105 hover:shadow-[0_8px_30px_rgba(255,255,255,0.25)] active:scale-95 md:px-5 md:py-3.5 md:text-lg"
              onClick={() => setIsContactOpen(true)}
              aria-expanded={isContactOpen}
            >
              Contact Us
              <ArrowUpRight size={15} strokeWidth={2.2} className="md:h-[18px] md:w-[18px]" />
            </button>
          </div>
        </header>

        <div className="relative z-20 h-full w-full">
          <motion.div
            className="absolute left-6 top-[140px] text-left md:left-20 md:top-[239px]"
            initial={reducedMotion ? false : { opacity: 0, x: -40 }}
            animate={reducedMotion ? undefined : { opacity: 1, x: 0 }}
            transition={reducedMotion ? { duration: 0 } : { ...transition, duration: 1 }}
          >
            <h1 className="anybody-heading font-normal text-white">
              Connect your
              <br />
              wallet
            </h1>
            <p className="wallet-mono mt-5 max-w-[180px] text-[10px] uppercase tracking-[0.22em] text-white/45 md:mt-7 md:max-w-[240px] md:text-xs">
              A private gateway to the decentralized universe
            </p>
          </motion.div>

          <div
            className="absolute bottom-12 right-6 text-right transition-[transform,opacity] duration-150 ease-out md:bottom-[90px] md:right-20"
            style={{ opacity: rightOpacity, transform: `translateX(${rightOffset}px)` }}
          >
            <h2 className="anybody-heading font-normal text-white">
              Hold the Future
              <br />
              in Your Hands.
            </h2>
          </div>

          <div className="absolute bottom-12 left-1/2 z-10 -translate-x-1/2 text-center md:bottom-14">
            <AnimatePresence>
              {progress < CUE_HIDE_PROGRESS && (
                <motion.div
                  initial={reducedMotion ? false : { opacity: 0, y: 10 }}
                  animate={reducedMotion ? undefined : { opacity: 0.7, y: 0 }}
                  exit={reducedMotion ? undefined : { opacity: 0, y: -15 }}
                  transition={reducedMotion ? { duration: 0 } : transition}
                  className="flex flex-col items-center gap-2"
                >
                  <span className="wallet-mono text-[10px] tracking-[0.2em] text-white/40">Scroll to play universe</span>
                  <motion.span
                    animate={reducedMotion ? undefined : { y: [0, 6, 0] }}
                    transition={reducedMotion ? { duration: 0 } : { duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <ChevronDown size={14} className="text-white/55" strokeWidth={1.4} />
                  </motion.span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="wallet-mono absolute bottom-5 left-6 text-[9px] uppercase tracking-[0.18em] text-white/25 md:bottom-8 md:left-20">
            Timeline / {String(progressPercent).padStart(2, '0')}%
          </div>

          {(videoError || videoBlocked) && (
            <div className="wallet-mono absolute bottom-5 right-6 text-[9px] uppercase tracking-[0.18em] text-white/30 md:bottom-8 md:right-20">
              Universe feed: visual fallback
            </div>
          )}
        </div>
      </div>

      <FocusTrap panelRef={drawerPanelRef} onEscape={closeDrawer}>
        <PortalDrawer
          isOpen={isDrawerOpen}
          panelRef={drawerPanelRef}
          closeButtonRef={drawerCloseRef}
          onClose={closeDrawer}
          onConnect={() => {
            setIsConnected(true);
            closeDrawer();
          }}
          reducedMotion={reducedMotion}
        />
      </FocusTrap>

      <FocusTrap panelRef={modalPanelRef} onEscape={closeContact}>
        <ContactModal
          isOpen={isContactOpen}
          panelRef={modalPanelRef}
          closeButtonRef={modalCloseRef}
          form={contactForm}
          isSubmitted={isSubmitted}
          onChange={handleFormChange}
          onSubmit={handleSubmit}
          onClose={closeContact}
          reducedMotion={reducedMotion}
        />
      </FocusTrap>
    </section>
  );
}
