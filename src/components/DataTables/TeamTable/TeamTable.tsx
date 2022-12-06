import React, { ReactElement } from 'react';
import * as _ from 'lodash';
import IPlayer from '../../../common/interfaces/IPlayer';
import { Row, Table } from 'reactstrap';

interface ITeamTableProps {
    players: Array<IPlayer>;
}

function TeamTable({ players }: ITeamTableProps): ReactElement {
    /**
     * Renders a table body using props.
     * @returns {ReactElement} The rendered table body.
     */
    const RenderTableBody = (): ReactElement => {
        return (
            <tbody>
                {_.map(players, (player) => {
                    return (
                        <tr key={player.id}>
                            <th scope='row'>
                                {player.lastName}
                            </th>
                            <td>
                                {player.firstName}
                            </td>
                            <td>
                                {!_.isNil(player.position) ? player.position : 'No Position'}
                            </td>
                            <td>
                                {!_.isNil(player.playerNumber) ? player.playerNumber : 'No Number'}
                            </td>
                            <td>
                                {!_.isNil(player.salary) ? player.salary : 'No Salary'}
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        );
    };

    return (
        <>
            {_.isEmpty(players) && (
                <Row>
                    <h2>No players found for this team. Please sign up as a manager to create a player!</h2>
                </Row>
            )}
            {!_.isEmpty(players) && (
                <Table striped hover>
                    <thead>
                        <tr>
                            <th>
                                Last Name
                            </th>
                            <th>
                                First Name
                            </th>
                            <th>
                                Position
                            </th>
                            <th>
                                Player Number
                            </th>
                            <th>
                                Player Salary
                            </th>
                        </tr>
                    </thead>
                    <RenderTableBody />
                </Table>
            )}
        </>
    );
};

export default TeamTable;