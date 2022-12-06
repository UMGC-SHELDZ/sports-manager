import React, { ReactElement } from 'react';
import * as _ from 'lodash';
import { Row, Table } from 'reactstrap';

// Interfaces
import ITeam from '../../../common/interfaces/ITeam';

interface ISportsTableProps {
    teams: Array<ITeam>;
}

function SportsTable({ teams }: ISportsTableProps): ReactElement {
    /**
     * Renders a table body using props.
     * @returns {ReactElement} The rendered table body.
     */
    const RenderTableBody = (): ReactElement => {
        return (
            <tbody>
                {_.map(teams, (team) => {
                    return (
                        <tr key={team.id}>
                            <th scope='row'>
                                {team.teamName}
                            </th>
                            <td>
                                {team.managerName}
                            </td>
                            <td>
                                {team.numPlayers}
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        );
    };

    // Renders the table if props are provided for teams, otherwise renders a disclaimer that no teams are present.
    return (
        <>
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
                        </tr>
                    </thead>
                    <RenderTableBody />
                </Table>
            )}
        </>
    )
};

export default SportsTable;