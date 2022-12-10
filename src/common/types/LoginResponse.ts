import IManager from "../interfaces/IManager";

// For login responses
export type AuthenticatedUser = {
    user: IManager;
    token: string 
};