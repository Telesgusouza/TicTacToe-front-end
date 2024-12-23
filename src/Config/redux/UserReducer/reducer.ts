import ActionTypes from "../../ActionTypes";
import { IActionUser, IStateUser } from "../../interfaces";

const initialState: IStateUser = {
    user: {
        name: "",
        login: "",
        role: "",

        player: "",

        numberOfWins: 0,
        numberOfDefeats: 0,
        numberOfDraws: 0,
    }

}

const UserReducer = (state: IStateUser = initialState, action: IActionUser) => {

    if (action.type === ActionTypes.SAVE_USER) {
        return { ...state, user: action.payload};
    }

    return state;

}

export default UserReducer;