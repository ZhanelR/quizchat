import userActionTypes  from "./userActionTypes";

export const login = (authorizationData) => ({
    type: userActionTypes.LOG_IN,
    payload: authorizationData,
});

export const logout = () => ({
    type: userActionTypes.LOG_OUT,
});