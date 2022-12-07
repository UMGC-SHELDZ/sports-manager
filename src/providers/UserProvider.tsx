import React, { createContext, Dispatch, ReactNode, useReducer } from 'react';

// Interface for provider state.
interface IUserState {
    userId?: string;
    authToken?: any;
};

// Default state prior to authentication.
const DEFAULT_STATE: IUserState = {
    userId: undefined,
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
            console.log(state);
            return {
                userId: action.userId ? action.userId : undefined,
                authToken: action.userId ? action.userId : undefined,
            };
        default:
            return state;
    }
};

/**
 * Creates the context to hold the user information
 */
const UserContext = createContext<{
    userId: string | undefined;
    authToken: any;
    dispatch: Dispatch<any>;
}>({
    userId: DEFAULT_STATE.userId,
    authToken: DEFAULT_STATE.authToken,
    dispatch: () => DEFAULT_STATE
});

/**
 * Provider to wrap components that require context
 */
const UserProvider = (props: {
    userId?: string;
    authToken?: any;
    children: ReactNode;
}) => {
    // Initial state at the launch of the application
    const initialState = props
        ? {
            userId: props.userId,
            authToken: props.authToken
        }
        : DEFAULT_STATE

    // Hook in reducer
    const [state, dispatch] = useReducer(reducer, initialState);

    // Return the provider
    return (
        <UserContext.Provider
            value={{
                userId: state.userId,
                authToken: state.authToken,
                dispatch: dispatch
            }}
        >
            {props.children}
        </UserContext.Provider>
    );
};

export { UserProvider, UserContext };