import { useState } from "react";
import { audioClips } from "../helpers/audioClips";
import { Pad } from "./Pad";

export const DrumMachine = () => {
  const [volume, setVolume] = useState(0.5);
  const [recording, setRecording] = useState("");
  const [speed, setSpeed] = useState(0.5);

  const audios = audioClips;

  const playRecording = () => {
    let index = 0;
    const clipsArray = recording.split(" ");

    const interval = setInterval(() => {
      const audioTag = document.getElementById(clipsArray[index]);
      audioTag.volume = volume;
      audioTag.currentTime = 0;
      audioTag.play();

      index++;
    }, 300 * speed);
    setTimeout(() => clearInterval(interval), 300 * speed * clipsArray.length - 1);
  };

  return (
    <div className="bg-info min-vh-100 text-white">
      <div className="text-center">
        <h2>Drum Machine</h2>
        {audios.map((clip) => (
          <Pad
            clip={clip}
            key={clip.id}
            volume={volume}
            setRecording={setRecording}
          />
        ))}
      </div>
      <br />
      <div className="text-center">
        <h4>Volumen</h4>
        <input
          type="range"
          step="0.01"
          value={volume}
          min="0"
          max="1"
          className="w-50"
          onChange={(e) => setVolume(e.target.value)}
        />
        <h3>{recording}</h3>
        {recording && (
          <div className="m-3">
            <button className="btn btn-success m-1" onClick={playRecording}>
              play
            </button>
            <button
              className="btn btn-danger m-1"
              onClick={() => setRecording("")}
            >
              clear
            </button>
          <br />
          <br />
          <h4>Speed</h4>
          <br />
            <input
              type="range"
              step="0.01"
              value={speed}
              min="0.1"
              max="1.2"
              className="w-50"
              onChange={(e) => setSpeed(e.target.value)}
            />
          </div>
        )}
      </div>
    </div>
  );
};
