import { useCallback, useEffect, useRef, useState } from "react";
import { Pause, Play, SkipForward } from "lucide-react";

const INTRO_DURATION_SECONDS = 11;

const journeyStages = [
  { at: 0, label: "Vendor intake" },
  { at: 1.7, label: "Contract review" },
  { at: 3.4, label: "Financial risk" },
  { at: 5.1, label: "Security & controls" },
  { at: 6.8, label: "Compliance" },
  { at: 8.5, label: "Renewal" },
];

function getActiveStage(currentTime: number) {
  for (let index = journeyStages.length - 1; index >= 0; index -= 1) {
    if (currentTime >= journeyStages[index].at) return journeyStages[index];
  }
  return journeyStages[0];
}

export function CinematicIntro({ onDismissed }: { onDismissed: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const exitTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [visible, setVisible] = useState(true);
  const [exiting, setExiting] = useState(false);
  const [paused, setPaused] = useState(false);
  const [motionAllowed, setMotionAllowed] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [mediaFailed, setMediaFailed] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  const activeStage = getActiveStage(currentTime);

  const dismiss = useCallback(() => {
    if (exiting) return;
    setExiting(true);
    videoRef.current?.pause();
    exitTimerRef.current = setTimeout(() => {
      setVisible(false);
      onDismissed();
      requestAnimationFrame(() => {
        document.getElementById("vendorxa-site")?.focus({ preventScroll: true });
      });
    }, 850);
  }, [exiting, onDismissed]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const shouldReduce = mediaQuery.matches;
    setReducedMotion(shouldReduce);
    setMotionAllowed(!shouldReduce);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
      if (exitTimerRef.current) clearTimeout(exitTimerRef.current);
    };
  }, []);

  useEffect(() => {
    if (!motionAllowed || !videoRef.current) return;
    videoRef.current.play().catch(() => setMediaFailed(true));
  }, [motionAllowed]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") dismiss();
      if (event.key === " " && !event.metaKey && !event.ctrlKey && !event.altKey) {
        event.preventDefault();
        const video = videoRef.current;
        if (!video || reducedMotion || mediaFailed) return;
        if (video.paused) {
          void video.play().then(() => setPaused(false));
        } else {
          video.pause();
          setPaused(true);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [dismiss, mediaFailed, reducedMotion]);

  async function togglePlayback() {
    if (!videoRef.current || reducedMotion || mediaFailed) return;
    if (videoRef.current.paused) {
      await videoRef.current.play();
      setPaused(false);
    } else {
      videoRef.current.pause();
      setPaused(true);
    }
  }

  if (!visible) return null;

  const handoffStarted = currentTime >= 9.15;
  const progress = Math.min(currentTime / INTRO_DURATION_SECONDS, 1);

  return (
    <section
      className={`cinematic-intro ${exiting ? "cinematic-intro--exiting" : ""}`}
      aria-label="VendorXa cinematic introduction"
      aria-modal="true"
      role="dialog"
    >
      <video
        ref={videoRef}
        className="cinematic-intro__video"
        src="/motion/vendorxa-cinematic-intro.mp4"
        poster="/motion/vendorxa-cinematic-poster.jpg"
        muted
        playsInline
        preload="auto"
        onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
        onEnded={dismiss}
        onError={() => setMediaFailed(true)}
      />
      <div className="cinematic-intro__shade" aria-hidden />

      <header className="cinematic-intro__topbar">
        <div className="cinematic-intro__brand" aria-label="VendorXa">
          <img src="/favicon.svg" alt="" />
          <span>VendorXa</span>
        </div>
        <div className="cinematic-intro__controls">
          {!reducedMotion && !mediaFailed && (
            <button type="button" onClick={() => void togglePlayback()}>
              {paused ? <Play aria-hidden /> : <Pause aria-hidden />}
              {paused ? "Resume motion" : "Pause motion"}
            </button>
          )}
          <button type="button" onClick={dismiss}>
            <SkipForward aria-hidden />
            {reducedMotion || mediaFailed ? "Enter VendorXa" : "Skip intro"}
          </button>
        </div>
      </header>

      <div
        className={`cinematic-intro__copy ${handoffStarted ? "cinematic-intro__copy--handoff" : ""}`}
      >
        <p>Vendor lifecycle governance</p>
        <h1>
          See the whole
          <br />
          <span>vendor journey.</span>
        </h1>
        <div>Every decision stays connected.</div>
      </div>

      <footer
        className={`cinematic-intro__footer ${handoffStarted ? "cinematic-intro__footer--handoff" : ""}`}
      >
        <div className="cinematic-intro__stage">
          <span>Journey</span>
          <strong aria-live="polite">{activeStage.label}</strong>
        </div>
        <div
          className="cinematic-intro__progress"
          role="progressbar"
          aria-label="Cinematic intro progress"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(progress * 100)}
        >
          <span style={{ width: `${progress * 100}%` }} />
        </div>
      </footer>
    </section>
  );
}
