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
    player: string;

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

export interface IMatch {
    id: string,

    matchCreationDate: string,
    
    idPlayerOne: string,
    idPlayerTwo: string,
    
    numberOfWinsPlayerOne: number,
    numberOfWinsPlayerTwo: number,
    numberOfMatches: number
}

export interface IBoard {
    row_1: ("PLAYER_ONE" | "PLAYER_TWO" | "NO_PLAYER")[];
    row_2: ("PLAYER_ONE" | "PLAYER_TWO" | "NO_PLAYER")[];
    row_3: ("PLAYER_ONE" | "PLAYER_TWO" | "NO_PLAYER")[];
}

export interface IBoardWS {
    rows_1: ("PLAYER_ONE" | "PLAYER_TWO" | "NO_PLAYER")[];
    rows_2: ("PLAYER_ONE" | "PLAYER_TWO" | "NO_PLAYER")[];
    rows_3: ("PLAYER_ONE" | "PLAYER_TWO" | "NO_PLAYER")[];
}

export interface ICountMatches {
    playerOne: number;
    playerTwo: number;
    draws: number;
}

export interface IFriends {
    id: string;

    name: string;
    img: string;
    idPlayer: string;
}

