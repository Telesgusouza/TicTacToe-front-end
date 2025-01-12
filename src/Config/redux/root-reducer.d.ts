declare const rootReducer: import("redux").Reducer<{
    UserReducer: import("../interfaces").IStateUser | {
        user: {
            user: import("../interfaces").IUser;
        };
    };
    WSReducer: any;
}, any, Partial<{
    UserReducer: never;
    WSReducer: any;
}>>;
export default rootReducer;
