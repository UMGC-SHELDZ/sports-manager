import axios, { AxiosResponse } from 'axios';
import IManager from '../common/interfaces/IManager';
import { AuthenticatedUser } from '../common/types/LoginResponse';
import baseApiUrl from '../common/utils/urlUtil';

class ManagersService {
    public async loginManager(userName: string, password: string): Promise<AuthenticatedUser> {
        const payload: { userName: string, password: string } = { userName, password };

        // Try/catch to ensure errors are handled
        try {
            const authenticatedData: AxiosResponse = await axios.post(`${baseApiUrl}/managers/login`, payload);
            return authenticatedData.data;
        } catch(e: any) {
            return e;
        }
    }

    /**
     * Adds a new manager to the database.
     * @param {IManager} manager The manager object to add.
     * @returns {IManager} the manager object, with an id, but no password.
     */
    public async addManager(manager: IManager): Promise<IManager> {
        // Try/catch to ensure errors are handled
        try {
            const managerResp: AxiosResponse = await axios.post(`${baseApiUrl}/managers`, manager);
            return managerResp.data;
        } catch (e: any) {
            return e;
        };
    };

    /**
     * Gets all players data.
     * @returns All players, or error.
     */
    public async getManagers(): Promise<Array<IManager>> {
        try {
            const managersResp: AxiosResponse = await axios.get(`${baseApiUrl}/managers`);
            return managersResp.data;
        } catch (e: any) {
            return e;
        }
    }
};

export default new ManagersService();