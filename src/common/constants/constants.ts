// Enum for view options
export enum CurrentViewOptions {
    MANAGER = 'MANAGER',
    PLAYER = 'PLAYER',
    TEAM = 'TEAM',
    SPORT = 'SPORT',
    REGISTRATION = 'REGISTRATION',
    LOGIN = 'LOGIN',
    LOGIN_SUCCESS = 'LOGIN_SUCCESS'
};

// Enum for text input 
export enum InputFieldTypes {
    TEXT = 'text',
    PASSWORD = 'password'
};

// Enum for component color
export enum ComponentColor {
    PRIMARY = 'primary',
    SECONDARY = 'secondary',
    SUCCESS = 'success',
    DANGER = 'danger',
    WARNING = 'warning',
    INFO = 'info',
    LIGHT = 'light',
    DARK = 'dark'
}

// To use with enum to display on the HeaderBar
const CurrentViewOptionStrings: { [key: string]: string} = {
    MANAGER: 'Current Manager',
    PLAYER: 'Active Team',
    TEAM: 'Selected Sport',
    SPORT: 'Teams by Sport',
    REGISTRATION: 'Create a Manager Account',
    LOGIN: 'Input Login Information',
    LOGIN_SUCCESS: 'Welcome back'
};

export {
    CurrentViewOptionStrings
}