import React, { useContext } from 'react';
import * as _ from 'lodash';

// Global State
import { UserContext } from '../providers/UserProvider';

export const useAuthentication = () => {
    // Grab auth token from state.
    const { authToken } = useContext(UserContext);

    console.log(authToken)

    // Return if auth token is present
    return !_.isNil(authToken);
}