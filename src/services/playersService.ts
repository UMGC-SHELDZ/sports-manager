import axios, { AxiosResponse } from 'axios';

// Interfaces
import IPlayer from '../common/interfaces/IPlayer';

// Utils
import baseApiUrl from '../common/utils/urlUtil';

class PlayerService {
    /**
     * Adds a new player to the database.
     * @param {IPlayer} player The player object to add.
     * @returns {IPlayer} the player object.
     */
     public async add(player: IPlayer, token: string): Promise<IPlayer> {
        // Try/catch to ensure errors are handled
        try {
            const playerResp: AxiosResponse = await axios.post(
                `${baseApiUrl}/players`,
                player,
                { 
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );
            return playerResp.data;
        } catch (e: any) {
            return e;
        };
    };

    /**
     * Updates a player to the database.
     * @param {IPlayer} player The player object to add.
     * @returns {IPlayer} the player object.
     */
         public async update(player: IPlayer, token: string): Promise<IPlayer> {
            // Try/catch to ensure errors are handled
            try {
                const playerResp: AxiosResponse = await axios.put(
                    `${baseApiUrl}/players`,
                    player,
                    { 
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    }
                );
                return playerResp.data;
            } catch (e: any) {
                return e;
            };
        };

    /**
     * Gets all players data.
     * @returns All players, or error.
     */
    public async getPlayers(): Promise<Array<IPlayer>> {
        try {
            const playersResp: AxiosResponse = await axios.get(`${baseApiUrl}/players`);
            return playersResp.data;
        } catch (e: any) {
            return e;
        }
    }

    /**
     * Deletes a player by its id.
     * @param {string} id the player id to delete.
     * @param {string} token token for authorization.
     * @returns if the sport is deleted.
     */
         public async delete(id: string, token: string): Promise<any> {
            try {
                const deleteResp: AxiosResponse = await axios.delete(`${baseApiUrl}/players/${id}`, 
                    { 
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    }
                );
                return deleteResp.data;
            } catch (e: any) {
                return e;
            }
        }
};

export default new PlayerService();