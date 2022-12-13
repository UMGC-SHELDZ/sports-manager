import axios, { AxiosResponse } from 'axios';

// Interfaces
import ITeam from '../common/interfaces/ITeam';

// Utils
import baseApiUrl from '../common/utils/urlUtil';

class TeamService {
    /**
     * Adds a new team to the database.
     * @param {ITeam} team The team object to add.
     * @returns {ITeam} the team object.
     */
     public async add(team: ITeam, token: string): Promise<ITeam> {
        // Try/catch to ensure errors are handled
        try {
            const teamResp: AxiosResponse = await axios.post(
                `${baseApiUrl}/teams`,
                team,
                { 
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );
            return teamResp.data;
        } catch (e: any) {
            return e;
        };
    };

    /**
     * Updates a sport in the database.
     * @param {Iteam} team The team object to add.
     * @returns {Iteam} the sport object, with an id.
     */
     public async update(team: ITeam, token: string): Promise<ITeam> {
        // Try/catch to ensure errors are handled
        try {
            const teamResp: AxiosResponse = await axios.put(
                `${baseApiUrl}/teams`,
                team,
                { 
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );
            return teamResp.data;
        } catch (e: any) {
            return e;
        };
    };

    /**
     * Gets all teams data.
     * @returns All teams, or error.
     */
    public async getTeams(): Promise<Array<ITeam>> {
        try {
            const teamsResp: AxiosResponse = await axios.get(`${baseApiUrl}/teams`);
            return teamsResp.data;
        } catch (e: any) {
            return e;
        }
    }

    /**
     * Deletes a team by its id.
     * @param {string} id the team id to delete.
     * @param {string} token token for authorization.
     * @returns if the sport is deleted.
     */
     public async delete(id: string, token: string): Promise<any> {
        try {
            const deleteResp: AxiosResponse = await axios.delete(`${baseApiUrl}/teams/${id}`, 
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

export default new TeamService();