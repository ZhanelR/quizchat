import * as types from "./userActionTypes";

export const login =(authorizationData) => ({
    type: types.LOG_IN,
    payload: authorizationData,
});

export const logout = ()=> ({
    type: types.LOG_OUT,
});