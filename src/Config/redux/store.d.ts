declare const store: import("@reduxjs/toolkit").EnhancedStore<{
    UserReducer: import("../interfaces").IStateUser | {
        user: {
            user: import("../interfaces").IUser;
        };
    };
    WSReducer: any;
}, any, import("@reduxjs/toolkit").Tuple<[import("redux").StoreEnhancer<{
    dispatch: import("redux-thunk").ThunkDispatch<{
        UserReducer: import("../interfaces").IStateUser | {
            user: {
                user: import("../interfaces").IUser;
            };
        };
        WSReducer: any;
    }, undefined, import("redux").UnknownAction>;
}>, import("redux").StoreEnhancer]>>;
export default store;
