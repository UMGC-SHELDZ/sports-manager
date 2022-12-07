// Enum for view options
export enum CurrentViewOptions {
    MANAGER = 'MANAGER',
    TEAM = 'TEAM',
    SPORT = 'SPORT',
    REGISTRATION = 'REGISTRATION',
    REGISTRATION_SUCCESS = 'REGISTRATION_SUCCESS',
    LOGIN = 'LOGIN',
    LOGIN_SUCCESS = 'LOGIN_SUCCESS'
}

// To use with enum to display on the HeaderBar
const CurrentViewOptionStrings: { [key: string]: string} = {
    MANAGER: 'Current Manager',
    TEAM: 'Active Team',
    SPORT: 'Selected Sport',
    REGISTRATION: 'Create a Manager Account',
    REGISTRATION_SUCCESS: 'Thank You For Registering',
    LOGIN: 'Input Login Information',
    LOGIN_SUCCESS: 'Welcome back!'
};

export {
    CurrentViewOptionStrings
}