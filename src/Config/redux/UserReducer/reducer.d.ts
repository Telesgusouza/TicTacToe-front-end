import { IActionUser, IStateUser } from "../../interfaces";
declare const UserReducer: (state: IStateUser | undefined, action: IActionUser) => IStateUser | {
    user: {
        user: import("../../interfaces").IUser;
    };
};
export default UserReducer;
