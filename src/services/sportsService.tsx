import axios, { AxiosResponse } from 'axios';
import { useContext } from 'react';

// Interfaces
import ISport from '../common/interfaces/ISport';

// Utils
import baseApiUrl from '../common/utils/urlUtil';

class SportsService {
    /**
     * Adds a new sport to the database.
     * @param {ISport} sport The sport object to add.
     * @returns {ISport} the sport object.
     */
    public async add(sport: ISport, token: string): Promise<ISport> {
        // Try/catch to ensure errors are handled
        try {
            const sportResp: AxiosResponse = await axios.post(
                `${baseApiUrl}/sports`,
                sport,
                { 
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );
            return sportResp.data;
        } catch (e: any) {
            return e;
        };
    };

    /**
     * Updates a sport in the database.
     * @param {ISport} sport The sport object to add.
     * @returns {ISport} the sport object, with an id.
     */
    public async update(sport: ISport, token: string): Promise<ISport> {
        // Try/catch to ensure errors are handled
        try {
            const sportResp: AxiosResponse = await axios.put(
                `${baseApiUrl}/sports`,
                sport,
                { 
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );
            return sportResp.data;
        } catch (e: any) {
            return e;
        };
    };


    /**
     * Gets all sports data.
     * @returns All sports, or error.
     */
    public async getSports(): Promise<Array<ISport>> {
        try {
            const sportsResp: AxiosResponse = await axios.get(`${baseApiUrl}/sports`);
            return sportsResp.data;
        } catch (e: any) {
            return e;
        }
    }

    /**
     * Deletes a sport by its id.
     * @param {string} id the sport id to delete.
     * @param {string} token token for authorization.
     * @returns if the sport is deleted.
     */
    public async delete(id: string, token: string): Promise<any> {
        try {
            const deleteResp: AxiosResponse = await axios.delete(`${baseApiUrl}/sports/${id}`, 
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

export default new SportsService();