"use client";

import { useEffect, useState } from "react";

import { Maximize2, Minimize2, Play } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

const cn = (...classes: Array<string | false | undefined>) =>
  classes.filter(Boolean).join(" ");

const extractVideoId = (id: string) => {
  if (id.includes("youtube.com") || id.includes("youtu.be")) {
    try {
      const url = new URL(id);
      if (id.includes("youtube.com")) {
        return url.searchParams.get("v") || "";
      }
      return url.pathname.substring(1);
    } catch {
      return id;
    }
  }
  return id;
};

type YouTubePlayerProps = {
  videoId: string;
  title?: string;
  customThumbnail?: string;
  defaultExpanded?: boolean;
  className?: string;
};

type SurfaceProps = {
  videoId: string;
  actualVideoId: string;
  title?: string;
  thumbnailUrl?: string;
  playing: boolean;
  expanded: boolean;
  onPlay: () => void;
  onToggleExpand: () => void;
};

const PlayerSurface = ({
  videoId,
  actualVideoId,
  title,
  thumbnailUrl,
  playing,
  expanded,
  onPlay,
  onToggleExpand,
}: SurfaceProps) => {
  const [thumbSrc, setThumbSrc] = useState(thumbnailUrl);

  return (
    <motion.div
      layoutId={`youtube-player-content-${videoId}`}
      className="relative aspect-video bg-neutral-200"
    >
      {!playing && (
        <>
          <motion.div
            layoutId={`youtube-player-thumbnail-container-${videoId}`}
            className="absolute inset-0 bg-gradient-to-br from-neutral-200 to-neutral-300"
          >
            {thumbSrc && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={thumbSrc}
                alt={title || "Video thumbnail"}
                className="absolute inset-0 h-full w-full object-cover opacity-80"
                onError={() =>
                  setThumbSrc(
                    `https://i.ytimg.com/vi/${actualVideoId}/hqdefault.jpg`
                  )
                }
              />
            )}
          </motion.div>

          <motion.div
            layoutId={`youtube-player-content-overlay-${videoId}`}
            className="absolute inset-0 z-10 flex flex-col items-center justify-center"
          >
            <button
              type="button"
              onClick={onPlay}
              aria-label="Play video"
              className={cn(
                "relative h-16 w-16 cursor-pointer rounded-full border border-black/10 bg-white/80 p-0 backdrop-blur-sm transition-transform hover:scale-105 active:scale-95 md:h-20 md:w-20",
                "flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2"
              )}
            >
              <Play className="h-6 w-6 translate-x-[2px] fill-neutral-900 text-neutral-900 md:h-8 md:w-8" />
            </button>

            {title && (
              <motion.h3
                layoutId={`youtube-player-title-${videoId}`}
                className="mt-4 max-w-xs text-center text-sm font-medium text-white [text-shadow:0_1px_8px_rgba(0,0,0,0.6)] md:max-w-md md:text-base"
              >
                {title}
              </motion.h3>
            )}
          </motion.div>
        </>
      )}

      {playing && (
        <iframe
          src={`https://www.youtube.com/embed/${actualVideoId}?autoplay=1&playsinline=1&rel=0&modestbranding=1&iv_load_policy=3&showinfo=0&controls=1&enablejsapi=1&origin=${typeof window !== "undefined" ? window.location.origin : ""}`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          sandbox="allow-scripts allow-same-origin allow-presentation"
          allowFullScreen
          className="h-full w-full border-0"
        />
      )}

      <AnimatePresence>
        {(!playing || expanded) && (
          <motion.div
            layoutId={`youtube-player-controls-${videoId}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute top-2 right-2 z-20"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <button
                type="button"
                onClick={onToggleExpand}
                aria-label={expanded ? "Minimize video" : "Maximize video"}
                className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white/40 backdrop-blur-sm hover:bg-white/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 md:h-9 md:w-9"
              >
                <motion.div
                  animate={{ rotate: expanded ? 180 : 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  {expanded ? (
                    <Minimize2 className="h-4 w-4 md:h-5 md:w-5" />
                  ) : (
                    <Maximize2 className="h-4 w-4 md:h-5 md:w-5" />
                  )}
                </motion.div>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export const YouTubePlayer = ({
  videoId,
  title,
  customThumbnail,
  defaultExpanded = false,
  className,
}: YouTubePlayerProps) => {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const [playing, setPlaying] = useState(false);

  const actualVideoId = extractVideoId(videoId);
  const thumbnailUrl =
    customThumbnail ||
    (actualVideoId
      ? `https://i.ytimg.com/vi/${actualVideoId}/maxresdefault.jpg`
      : undefined);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && expanded) {
        setExpanded(false);
      }
    };
    if (expanded) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [expanded]);

  const surfaceProps = {
    videoId,
    actualVideoId,
    title,
    thumbnailUrl,
    playing,
    expanded,
    onPlay: () => setPlaying(true),
    onToggleExpand: () => setExpanded((prev) => !prev),
  };

  return (
    <>
      <div
        className={cn(
          "relative my-6",
          expanded ? "invisible" : "visible",
          className
        )}
      >
        <motion.div
          layoutId={`youtube-player-${videoId}`}
          className="overflow-hidden rounded-xl border border-[var(--color-border)] bg-white shadow-lg"
        >
          <PlayerSurface {...surfaceProps} />
        </motion.div>
      </div>

      <AnimatePresence>
        {expanded && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-white/80 backdrop-blur-sm"
              onClick={() => setExpanded(false)}
              aria-label="Close expanded video"
            />

            <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center">
              <motion.div
                layoutId={`youtube-player-${videoId}`}
                className="pointer-events-auto aspect-video max-h-[90vh] w-[90vw] max-w-[1200px] overflow-hidden rounded-lg border border-[var(--color-border)] bg-white shadow-xl"
              >
                <PlayerSurface {...surfaceProps} />
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
