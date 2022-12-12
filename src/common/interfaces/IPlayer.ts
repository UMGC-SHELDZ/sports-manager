// interface for the Player 
export default interface IPlayer {
    team: string | undefined;
    firstName: string;
    lastName: string;
    position?: string;
    playerNumber?: number;
    salary?: number;
    _id: string;
}
