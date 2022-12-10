import React, { ReactElement, useContext } from 'react';
import * as _ from 'lodash';

// constants
import { CurrentViewOptions, CurrentViewOptionStrings } from '../../common/constants/constants';

// Context
import { UserContext } from '../../providers/UserProvider';

interface IHeaderBarProps {
    curViewOption: CurrentViewOptions;
    sportName?: string;
    teamName?: string;
    managerName?: string;
}

function HeaderBar({ curViewOption, sportName, teamName, managerName}: IHeaderBarProps): ReactElement {
    const { user } = useContext(UserContext);
    /**
     * Constructs a breadcrumb item based on props
     * @returns {string} Constructed breadrumbitem string
     */
    const renderHeader = (): ReactElement => {
        // Option for Teams
        if (curViewOption === CurrentViewOptions.SPORT) {
            return <h5><strong>{CurrentViewOptionStrings[CurrentViewOptions.SPORT]}</strong></h5>;
        }

        // Option for Teams
        if (curViewOption === CurrentViewOptions.TEAM) {
            return <h5><strong>{CurrentViewOptionStrings[CurrentViewOptions.TEAM]}:</strong> {sportName}</h5>;
        }

        // Option for Players
        if (curViewOption === CurrentViewOptions.PLAYER) {
            return <h5><strong>{CurrentViewOptionStrings[CurrentViewOptions.PLAYER]}:</strong> {teamName}, <strong>{CurrentViewOptionStrings[CurrentViewOptions.MANAGER]}:</strong> {managerName}</h5>
        }

        // Option for Registration
        if (curViewOption === CurrentViewOptions.REGISTRATION) {
            return <h5><strong>{CurrentViewOptionStrings[CurrentViewOptions.REGISTRATION]}</strong></h5>;
        }

        // Option for Login
        if (curViewOption === CurrentViewOptions.LOGIN) {
            return <h5><strong>{CurrentViewOptionStrings[CurrentViewOptions.LOGIN]}</strong></h5>;
        }

        // Option for Login Success
        if (curViewOption === CurrentViewOptions.LOGIN_SUCCESS) {
            return <h5><strong>{CurrentViewOptionStrings[CurrentViewOptions.LOGIN_SUCCESS]} {!_.isNil(user) ? user.userName : 'User'}!</strong></h5>;
        }

        // Implicitly return manager view
        return <h5>Manager View</h5>;
    }

    return (
        <div className='header-bar'>
            {renderHeader()}
        </div>
    )
}

export default HeaderBar;