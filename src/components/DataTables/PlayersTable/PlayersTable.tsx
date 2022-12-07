import React, { ReactElement } from 'react';
import * as _ from 'lodash';
import { Row, Table } from 'reactstrap';

// Interfaces
import IPlayer from '../../../common/interfaces/IPlayer';

// Hooks
import { useAuthentication } from '../../../hooks/useAuthentication';
import PlayersTableRow from './PlayersTableRow';

interface IPlayersTableProps {
    players: Array<IPlayer>;
}

function PlayersTable({ players }: IPlayersTableProps): ReactElement {
    // Check authentication
    const isAuthenticated: boolean = useAuthentication();
    
    /**
     * Renders a table body using props.
     * @returns {ReactElement} The rendered table body.
     */
    const RenderTableBody = (): ReactElement => {
        return (
            <tbody>
                {_.map(players, (player) => {
                    return (
                        <PlayersTableRow player={player} />
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
    );
};

export default PlayersTable;