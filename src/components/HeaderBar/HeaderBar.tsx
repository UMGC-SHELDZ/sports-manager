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
        // Option for Sport
        if (curViewOption === CurrentViewOptions.SPORT) {
            return <h3><strong>{CurrentViewOptionStrings[CurrentViewOptions.SPORT]}:</strong> {sportName}</h3>;
        }

        // Option for team
        if (curViewOption === CurrentViewOptions.TEAM) {
            return <h3><strong>{CurrentViewOptionStrings[CurrentViewOptions.TEAM]}:</strong> {teamName}, <strong>{CurrentViewOptionStrings[CurrentViewOptions.MANAGER]}:</strong> {managerName}</h3>
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