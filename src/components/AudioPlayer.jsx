import { useRef, useState, useEffect } from "react";
import { PlayIcon, PauseIcon } from "lucide-react";
import PropTypes from "prop-types";

export default function AudioPlayer({ sound, autoPlay = false }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = (e) => {
    e.stopPropagation();
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

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (autoPlay) {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch((err) => {
            console.warn("Autoplay failed:", err);
          });
      }
    }

    const handleEnded = () => {
      setIsPlaying(false); // switch back to PlayIcon
    };

    audio.addEventListener("ended", handleEnded);
    return () => {
      audio.removeEventListener("ended", handleEnded);
    };
  }, [sound, autoPlay]);

  return (
    <button onClick={togglePlay} className="text-sm font-medium text-gray-700  size-12 rounded-full bg-primary shadow grid place-content-center">
      <audio ref={audioRef} src={sound} className="hidden"/>
      {isPlaying ? <PauseIcon /> : <PlayIcon />}
    </button>);
}

AudioPlayer.propTypes = {
  sound: PropTypes.string,
  autoPlay: PropTypes.bool,
};
