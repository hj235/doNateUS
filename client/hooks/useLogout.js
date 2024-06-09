import { useUserContext } from "./useUserContext";

export const useLogout = () => {
    const { dispatch } = useUserContext();

    const logout = () => {
        // save user data to local storage
        localStorage.removeItem('user');

        // update the user context
        dispatch({type: 'LOGOUT'});
    };

    return { logout };
};