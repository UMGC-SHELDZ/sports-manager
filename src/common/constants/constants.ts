// Enum for view options
export enum CurrentViewOptions {
    MANAGER = 'MANAGER',
    TEAM = 'TEAM',
    SPORT = 'SPORT',
    SIGN_UP = 'SIGN UP'
}

// To use with enum to display on the HeaderBar
const CurrentViewOptionStrings: { [key: string]: string} = {
    MANAGER: 'Current Manager',
    TEAM: 'Active Team',
    SPORT: 'Selected Sport',
    SIGN_UP: 'Create a Manager Account'
};

export {
    CurrentViewOptionStrings
}