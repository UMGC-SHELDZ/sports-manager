import React, { ReactElement } from 'react';

// constants
import { CurrentViewOptions, CurrentViewOptionStrings } from '../../common/constants/constants';

interface IHeaderBarProps {
    curViewOption: CurrentViewOptions;
    sportName?: string;
    teamName?: string;
    managerName?: string;
}

function HeaderBar({ curViewOption, sportName, teamName, managerName}: IHeaderBarProps): ReactElement {
    /**
     * Constructs a breadcrumb item based on props
     * @returns {string} Constructed breadrumbitem string
     */
    const renderHeader = (): ReactElement => {
        // Option for Teams
        if (curViewOption === CurrentViewOptions.SPORT) {
            return <h3><strong>{CurrentViewOptionStrings[CurrentViewOptions.SPORT]}</strong></h3>;
        }

        // Option for Teams
        if (curViewOption === CurrentViewOptions.TEAM) {
            return <h3><strong>{CurrentViewOptionStrings[CurrentViewOptions.TEAM]}:</strong> {sportName}</h3>;
        }

        // Option for Players
        if (curViewOption === CurrentViewOptions.PLAYER) {
            return <h3><strong>{CurrentViewOptionStrings[CurrentViewOptions.PLAYER]}:</strong> {teamName}, <strong>{CurrentViewOptionStrings[CurrentViewOptions.MANAGER]}:</strong> {managerName}</h3>
        }

        // Option for Registration
        if (curViewOption === CurrentViewOptions.REGISTRATION) {
            return <h3><strong>{CurrentViewOptionStrings[CurrentViewOptions.REGISTRATION]}</strong></h3>;
        }

        // Option for Registration Success
        if (curViewOption === CurrentViewOptions.REGISTRATION_SUCCESS) {
            return <h3><strong>{CurrentViewOptionStrings[CurrentViewOptions.REGISTRATION_SUCCESS]}</strong></h3>;
        }

        // Option for Login
        if (curViewOption === CurrentViewOptions.LOGIN) {
            return <h3><strong>{CurrentViewOptionStrings[CurrentViewOptions.LOGIN]}</strong></h3>;
        }

        // Option for Login Success
        if (curViewOption === CurrentViewOptions.LOGIN_SUCCESS) {
            return <h3><strong>{CurrentViewOptionStrings[CurrentViewOptions.LOGIN_SUCCESS]}</strong></h3>;
        }

        // Implicitly return manager view
        return <h3>Manager View</h3>;
    }

    return (
        <div className='header-bar'>
            {renderHeader()}
        </div>
    )
}

export default HeaderBar;