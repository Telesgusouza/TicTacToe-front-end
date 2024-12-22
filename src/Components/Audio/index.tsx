
import { useRef, useState } from 'react';
import * as Styled from './style';

import imgPlay from '../../assets/play.svg';
import imgPause from '../../assets/pause.svg';
import { useDispatch, useSelector } from 'react-redux';
import { IRootReducer } from '../../Config/interfaces';
import ActionTypes from '../../Config/ActionTypes';

interface IProps {
  music: string;
}

export function Audio({ music }: IProps) {

  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // const { soundtrack } = useSelector((rootReducer: IRootReducer) => rootReducer.SoundtrackReducer);
  const dispatch = useDispatch();

  function togglePlay() {

    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }

  };

  function handleVolumeChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newVolume = parseFloat(e.target.value);

    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  return (
    <Styled.Container>

      <Styled.ContainerContent>

        <audio
          ref={audioRef}
          src={music}
          loop
          controls
          autoPlay
        />

        <button onClick={togglePlay}>
          <img src={isPlaying ? imgPause : imgPlay} alt="icon music" />
        </button>

        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={audioRef.current?.volume}
          onChange={handleVolumeChange}
        />

      </Styled.ContainerContent>
    </Styled.Container>
  );
}
