import ActionTypes from "../../ActionTypes";

const initialState: {ws: WebSocket | null} = {
    ws: null
}

const WSReducer = (state: any = initialState, action: any) => {

    if (action.type === ActionTypes.WS_MATCH) {
        return { ...state, user: action.payload};
    }

    return state;

}

export default WSReducer;