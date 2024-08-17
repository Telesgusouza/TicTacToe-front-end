// redux
export interface IRootReducer {
    UserReducer: IStateUser
}

export interface IStateUser {
    user: IUser
}

export interface IActionUser {
    type: string,
    payload: { user: IUser}
}

// outros
export interface IUser {
    name: String;
    login: String;
    role: String;

    numberOfWins: number;
    numberOfDefeats: number;
    numberOfDraws: number;
}

export interface IOptionMatch {
    match: "vs_player" | "single_player" | "online",

}

export interface IVictory {
    player: "PLAYER_ONE" | "PLAYER_TWO" | "DRAW";
    open: boolean;
}
