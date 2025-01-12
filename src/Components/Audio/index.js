import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef, useState } from 'react';
import * as Styled from './style';
import imgPlay from '../../assets/play.svg';
import imgPause from '../../assets/pause.svg';
export function Audio(_a) {
    var music = _a.music;
    var _b = useState(.40), volume = _b[0], setVolume = _b[1];
    var _c = useState(false), isPlaying = _c[0], setIsPlaying = _c[1];
    var audioRef = useRef(null);
    useEffect(function () {
        if (audioRef.current) {
            audioRef.current.volume = 0.4;
            setIsPlaying(true);
        }
    }, []);
    function togglePlay() {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            }
            else {
                audioRef.current.volume = 0.4;
                setTimeout(function () {
                    var _a;
                    (_a = audioRef.current) === null || _a === void 0 ? void 0 : _a.play();
                }, 500);
            }
            setIsPlaying(!isPlaying);
        }
    }
    ;
    function handleVolumeChange(e) {
        var newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
        if (audioRef.current) {
            audioRef.current.volume = newVolume;
        }
    }
    ;
    return (_jsx(Styled.Container, { popup: isPlaying ? "desligar" : "ligar", children: _jsxs(Styled.ContainerContent, { children: [_jsx("audio", { ref: audioRef, src: music, loop: true, controls: true, autoPlay: true, defaultValue: .01 }), _jsx("button", { onClick: togglePlay, children: _jsx("img", { src: isPlaying ? imgPause : imgPlay, alt: "icon music" }) }), _jsx("input", { type: "range", min: "0", max: "1", step: "0.01", value: volume, onChange: handleVolumeChange })] }) }));
}
