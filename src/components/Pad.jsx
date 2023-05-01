import { useEffect, useState } from "react";

export const Pad = ({ clip, volume, setRecording }) => {


    const [active, setActive] = useState(false);

  useEffect(() => {
    document.addEventListener("keydown", handleSound);

    return () => {
      document.removeEventListener("keydown", handleSound);
    };
  }, []);

  const handleSound = (e) => {
    if (e.keyCode == clip.keyCode) {
      playSound();
    }
  };

  const playSound = () => {
    const sound = document.getElementById(clip.keyTrigger);
    setActive(true);
    setTimeout(() => {
        setActive(false)
    }, 1000);
    sound.volume = volume;
    sound.currentTime = 0;
    sound.play();
    setRecording(prev => prev + clip.keyTrigger + " ");
  };

  return (
    <div className={`btn btn-primary btn-shadow p-4 m-3 ${active && "btn-warning"}`} onClick={playSound}>
      <audio className="clip" id={clip.keyTrigger} src={clip.url} />
      {clip.keyTrigger}
    </div>
  );
};
