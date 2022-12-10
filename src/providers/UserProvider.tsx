import React, { createContext, Dispatch, ReactNode, useReducer } from 'react';
import IManager from '../common/interfaces/IManager';

// Interface for provider state.
interface IUserState {
    user?: IManager;
    authToken?: string;
};

// Default state prior to authentication.
const DEFAULT_STATE: IUserState = {
    user: undefined,
    authToken: undefined
};

/**
 * Sets global state for authentication
 * @param {IUserState} state the current user state.
 * @param {any} action a dispatch action to update state.
 */
const reducer = (state: IUserState, action: any) => {
    switch(action.type) {
        case 'STORE_AUTHENTICATION':
            return {
                user: action.user,
                authToken: action.authToken,
            };
        default:
            return state;
    }
};

/**
 * Creates the context to hold the user information
 */
const UserContext = createContext<{
    user: IManager | undefined;
    authToken: string | undefined;
    dispatch: Dispatch<any>;
}>({
    user: DEFAULT_STATE.user,
    authToken: DEFAULT_STATE.authToken,
    dispatch: () => DEFAULT_STATE
});

/**
 * Provider to wrap components that require context
 */
const UserProvider = (props: {
    user?: IManager;
    authToken?: string;
    children: ReactNode;
}) => {
    // Initial state at the launch of the application
    const initialState = props
        ? {
            user: props.user,
            authToken: props.authToken
        }
        : DEFAULT_STATE

    // Hook in reducer
    const [state, dispatch] = useReducer(reducer, initialState);

    // Return the provider
    return (
        <UserContext.Provider
            value={{
                user: state.user,
                authToken: state.authToken,
                dispatch: dispatch
            }}
        >
            {props.children}
        </UserContext.Provider>
    );
};

export { UserProvider, UserContext };