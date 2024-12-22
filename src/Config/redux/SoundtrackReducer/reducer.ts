import ActionTypes from "../../ActionTypes";
import { IStateSondtrack } from "../../interfaces";
import { IActionSoundtrack } from "../../interfaces";

const initialState: IStateSondtrack = {
  soundtrack: {
    isPlaying: false,
    audio: null,
    volume: 0.5,
  },
};

const SoundtrackReducer = (
  state: IStateSondtrack = initialState,
  action: IActionSoundtrack
): IStateSondtrack => {
  switch (action.type) {
    case ActionTypes.TOGGLE_AUDIO_PLAYBACK:
      return {
        ...state,
        soundtrack: {
          ...state.soundtrack,
          isPlaying: action.payloadIsPlaying,
        },
      };
    case ActionTypes.SET_VOLUME:
      return {
        ...state,
        soundtrack: {
          ...state.soundtrack,
          volume: action.payload,
        },
      };
    default:
      return state;
  }
};

export default SoundtrackReducer;
