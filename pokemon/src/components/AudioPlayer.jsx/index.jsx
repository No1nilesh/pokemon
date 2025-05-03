import { useRef, useState, useEffect } from "react";
import { PlayIcon, PauseIcon } from "lucide-react";

export default function AudioPlayer({ sound }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      audio.play();
      setIsPlaying(true);
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  // Auto play once when mounted
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Try to play on mount
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => setIsPlaying(true))
        .catch((err) => {
          // Autoplay might be blocked by browser
          console.warn("Autoplay failed:", err);
        });
    }

    // Stop playing flag when audio ends
    const handleEnded = () => {
      setIsPlaying(false);
    };

    audio.addEventListener("ended", handleEnded);
    return () => {
      audio.removeEventListener("ended", handleEnded);
    };
  }, [sound]);

  return (
    <div className="flex items-center justify-center size-12 rounded-full bg-primary-card shadow">
      <audio ref={audioRef} src={sound} />
      <button
        onClick={togglePlay}
        className="text-sm font-medium text-gray-700"
      >
        {isPlaying ? <PauseIcon /> : <PlayIcon />}
      </button>
    </div>
  );
}
