// Enum for view options
export enum CurrentViewOptions {
    MANAGER = 'MANAGER',
    PLAYER = 'PLAYER',
    TEAM = 'TEAM',
    SPORT = 'SPORT',
    REGISTRATION = 'REGISTRATION',
    REGISTRATION_SUCCESS = 'REGISTRATION_SUCCESS',
    LOGIN = 'LOGIN',
    LOGIN_SUCCESS = 'LOGIN_SUCCESS'
};

// Enum for text input 
export enum InputFieldTypes {
    TEXT = 'text',
    PASSWORD = 'password'
};

// To use with enum to display on the HeaderBar
const CurrentViewOptionStrings: { [key: string]: string} = {
    MANAGER: 'Current Manager',
    PLAYER: 'Active Team',
    TEAM: 'Selected Sport',
    SPORT: 'Teams by Sport',
    REGISTRATION: 'Create a Manager Account',
    REGISTRATION_SUCCESS: 'Thank You For Registering',
    LOGIN: 'Input Login Information',
    LOGIN_SUCCESS: 'Welcome back!'
};

export {
    CurrentViewOptionStrings
}