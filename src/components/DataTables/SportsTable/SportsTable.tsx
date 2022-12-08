import React, { ReactElement } from 'react';
import * as _ from 'lodash';
import { Row, Table } from 'reactstrap';

// Interfaces
import ISport from '../../../common/interfaces/ISport';

// Custom Components
import SportsTableRow from './SportsTableRow';

// Hooks
import { useAuthentication } from '../../../hooks/useAuthentication';
import AddSportForm from './AddSportForm';

interface ISportsTableProps {
    sports: Array<ISport>;
}

function SportsTable({ sports }: ISportsTableProps): ReactElement {
    // Check authentication
    const isAuthenticated: boolean = useAuthentication();

    /**
     * Renders a table body using props.
     * @returns {ReactElement} The rendered table body.
     */
    const RenderTableBody = (): ReactElement => {
        return (
            <tbody>
                {_.map(sports, (sport: ISport) => {
                    return (
                        <SportsTableRow sport={sport} />
                    )
                })}
            </tbody>
        );
    };

    // Renders the table if props are provided for sports, otherwise renders a disclaimer that no sports are present.
    return (
        <>
            {isAuthenticated &&
                <AddSportForm  />
            }
            {_.isEmpty(sports) && (
                <Row>
                    <h2>No Sports found. Please sign up as a manager to add a sport!</h2>
                </Row>
            )}
            {!_.isEmpty(sports) && (
                <Table striped hover>
                    <thead>
                        <tr>
                            <th>
                                Sport Name
                            </th>
                            <th>
                                Number of Teams in Sport
                            </th>
                            {isAuthenticated && 
                                <th>
                                    Manage Sport
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

export default SportsTable;