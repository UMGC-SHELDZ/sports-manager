import React, { ReactElement } from 'react';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';

// constants
import { CurrentViewOptions, CurrentViewOptionStrings } from '../../common/constants/constants';

interface IBreadcrumbBarProps {
    curViewOption: CurrentViewOptions;
    sportName?: string;
    teamName?: string;
    managerName?: string;
}

function BreadcrumbBar({ curViewOption, sportName, teamName, managerName}: IBreadcrumbBarProps): ReactElement {
    /**
     * Constructs a breadcrumb item based on props
     * @returns {string} Constructed breadrumbitem string
     */
    const renderBreadcrumbItemData = (): string => {
        // Option for Sport
        if (curViewOption === CurrentViewOptions.SPORT) {
            return `${CurrentViewOptionStrings[CurrentViewOptions.SPORT]}: ${sportName}`;
        }

        // Option for team
        if (curViewOption === CurrentViewOptions.TEAM) {
            return `${CurrentViewOptionStrings[CurrentViewOptions.TEAM]}: ${teamName}, ${CurrentViewOptionStrings[CurrentViewOptions.MANAGER]}: ${managerName}`
        }

        // Implicitly return manager view
        return 'Manager View'
    }

    return (
        <>
            <Breadcrumb>
                <BreadcrumbItem active>
                    {renderBreadcrumbItemData()}
                </BreadcrumbItem>
            </Breadcrumb>
        </>
    )
}

export default BreadcrumbBar;