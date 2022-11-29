// Enum for view options
export enum CurrentViewOptions {
    MANAGER = 'MANAGER',
    TEAM = 'TEAM',
    SPORT = 'SPORT'
}

// To use with enum to display on the HeaderBar
const CurrentViewOptionStrings: { [key: string]: string} = {
    MANAGER: 'Current Manager',
    TEAM: 'Active Team',
    SPORT: 'Selected Sport'
};

export {
    CurrentViewOptionStrings
}