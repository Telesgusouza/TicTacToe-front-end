import { useEffect, useRef, useState } from 'react';
import * as Styled from './style';

import imgPlay from '../../assets/play.svg';
import imgPause from '../../assets/pause.svg';

interface IProps {
  music: string;
}

export function Audio({ music }: IProps) {

  const [volume, setVolume] = useState(.40);

  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.4;
      setIsPlaying(true);
    }
  }, []);

  function togglePlay() {

    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.volume = 0.4;

        setTimeout(() => {
          audioRef.current?.play();

        }, 500);
      }
      setIsPlaying(!isPlaying);
    }

  };

  function handleVolumeChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);

    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  return (
    <Styled.Container popup={isPlaying ? "desligar" : "ligar"} >

      <Styled.ContainerContent>

        <audio
          ref={audioRef}

          src={music}
          loop
          controls
          autoPlay
          defaultValue={.01}
        />

        <button onClick={togglePlay}>
          <img src={isPlaying ? imgPause : imgPlay} alt="icon music" />
        </button>

        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
        />

      </Styled.ContainerContent>
    </Styled.Container>
  );
}
