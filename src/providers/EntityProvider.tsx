import _ from 'lodash';
import React, { createContext, Dispatch, ReactNode, useReducer } from 'react';
import IManager from '../common/interfaces/IManager';
import IPlayer from '../common/interfaces/IPlayer';
import ISport from '../common/interfaces/ISport';
import ITeam from '../common/interfaces/ITeam';

// Interface for provider state.
interface IEntityState {
    sports: Array<ISport>;
    teams: Array<ITeam>;
    players: Array<IPlayer>;
    managers: Array<IManager>;
    isAppLoading: boolean;
};

// Default state prior to data loading.
const DEFAULT_STATE: IEntityState = {
    sports: [],
    teams: [],
    players: [],
    managers: [],
    isAppLoading: true
};

/**
 * Sets global state for data
 * @param {IEntityState} state the current entity state.
 * @param {any} action a dispatch action to update state.
 */
const reducer = (state: IEntityState, action: any) => {
    let filteredSports: Array<ISport>;
    let filteredTeams: Array<ITeam>;
    let filteredPlayers: Array<IPlayer>;

    switch(action.type) {
        case 'SET_INITIAL_DATA':
            return {
                sports: action.sports,
                teams: action.teams,
                players: action.players,
                managers: action.managers,
                isAppLoading: false
            }
        case 'ADD_MANAGER':
            return {
                sports: state.sports,
                teams: state.teams,
                players: state.players,
                managers: _.concat(state.managers, action.manager),
                isAppLoading: false
            };
        case 'ADD_SPORT':
            return {
                sports: _.concat(state.sports, action.sport),
                teams: state.teams,
                players: state.players,
                isAppLoading: false
            };
        case 'UPDATE_SPORT':
            filteredSports = _.filter(state.sports, (sport) => sport._id !== action.sport._id);
            return {
                sports: _.concat(filteredSports, action.sport),
                teams: state.teams,
                players: state.players,
                isAppLoading: false
            };
        case 'DELETE_SPORT':
            filteredSports = _.filter(state.sports, (sport) => sport._id !== action.sport._id);
            return {
                sports: filteredSports,
                teams: state.teams,
                players: state.players,
                isAppLoading: false
            };
        default:
            return state;
    }
};

/**
 * Creates the context to hold the user information
 */
const EntityContext = createContext<{
    sports: Array<ISport>;
    teams: Array<ITeam>;
    players: Array<IPlayer>;
    managers: Array<IManager>;
    isAppLoading: boolean;
    dispatch: Dispatch<any>;
}>({
    sports: DEFAULT_STATE.sports,
    teams: DEFAULT_STATE.teams,
    players: DEFAULT_STATE.players,
    managers: DEFAULT_STATE.managers,
    isAppLoading: DEFAULT_STATE.isAppLoading,
    dispatch: () => DEFAULT_STATE
});

/**
 * Provider to wrap components that require context
 */
const EntityProvider = (props: {
    children: ReactNode;
}) => {

    // Hook in reducer
    // @ts-ignore
    const [state, dispatch] = useReducer(reducer, DEFAULT_STATE);

    // Return the provider
    return (
        <EntityContext.Provider
            value={{
                sports: state.sports,
                teams: state.teams,
                players: state.players,
                managers: state.managers,
                isAppLoading: state.isAppLoading,
                dispatch: dispatch
            }}
        >
            {props.children}
        </EntityContext.Provider>
    );
};

export { EntityProvider, EntityContext };