import React, { useEffect, useRef, useState } from 'react';
import * as Styled from './style';

import musicEffectBtn from "../../assets/songs/song_effect_btn.wav";

interface IProps {
    children: React.ReactNode;
    btn: "BUTTON_YALLOW" | "BUTTON_BLUE" | "BUTTON_SILVER";
    option: "small" | "large"; // false === small

    borderbottom?: "" | "no_board"; // false === 
    disabled?: "" | "disabled_button";
    onClick?: () => void;

    hoverstyle?: "" | "no_hover_style";
}

function Button({
    children,
    btn,
    option,

    borderbottom = "",
    disabled = "",
    onClick,

    hoverstyle = ""
}
    : IProps
) {
    const audioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        if(audioRef.current) {
            audioRef.current.volume = 0.6;
        }
    }, [])

    function handleOnClick() {


        if (onClick) {
            setTimeout(() => {
                onClick();
            }, 600);

        }
    }


    return (
        <Styled.Button
            btn={btn}
            option={option}

            borderbottom={borderbottom}
            disabled={disabled === "disabled_button"}
            onClick={handleOnClick}

            hoverstyle={hoverstyle}
        >
            {children}
            <audio
                ref={audioRef}
                src={musicEffectBtn}
                muted={false}
                controls
                onPlay={handleOnClick}

            />
        </Styled.Button>
    )
}

export default Button;
