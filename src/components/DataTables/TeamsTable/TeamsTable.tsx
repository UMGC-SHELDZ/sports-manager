import React, { ReactElement } from 'react';
import * as _ from 'lodash';
import { Row, Table } from 'reactstrap';

// Interfaces
import ITeam from '../../../common/interfaces/ITeam';

// Custom Components
import TeamsTableRow from './TeamsTableRow';
import AddTeamForm from './AddTeamForm';

// Hooks
import { useAuthentication } from '../../../hooks/useAuthentication';

interface ITeamsTableProps {
    teams: Array<ITeam>;
}

function TeamsTable({ teams }: ITeamsTableProps): ReactElement {
    // Check authentication
    const isAuthenticated: boolean = useAuthentication();

    /**
     * Renders a table body using props.
     * @returns {ReactElement} The rendered table body.
     */
    const RenderTableBody = (): ReactElement => {
        return (
            <tbody>
                {_.map(teams, (team: ITeam) => {
                    return (
                        <TeamsTableRow team={team} />
                    )
                })}
            </tbody>
        );
    };

    // Renders the table if props are provided for teams, otherwise renders a disclaimer that no teams are present.
    return (
        <>
            {isAuthenticated &&
                <AddTeamForm  />
            }
            {_.isEmpty(teams) && (
                <Row>
                    <h2>No teams found for this sport. Please sign up as a manager to create a team!</h2>
                </Row>
            )}
            {!_.isEmpty(teams) && (
                <Table striped hover>
                    <thead>
                        <tr>
                            <th>
                                Team Name
                            </th>
                            <th>
                                Manager Name
                            </th>
                            <th>
                                Number of Players on Roster
                            </th>
                            {isAuthenticated && 
                                <th>
                                    Manage Team
                                </th>
                            }
                        </tr>
                    </thead>
                    <RenderTableBody />
                </Table>
            )}
        </>
    )
};

export default TeamsTable;