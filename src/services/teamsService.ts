import axios, { AxiosResponse } from 'axios';

// Interfaces
import ITeam from '../common/interfaces/ITeam';

// Utils
import baseApiUrl from '../common/utils/urlUtil';

class TeamService {
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
};

export default new TeamService();