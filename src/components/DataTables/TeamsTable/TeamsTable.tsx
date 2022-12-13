import React, { ReactElement, useEffect, useState } from 'react';
import * as _ from 'lodash';
import { Row, Table, Toast, ToastBody, ToastHeader } from 'reactstrap';

// Interfaces
import ITeam from '../../../common/interfaces/ITeam';
import IToastData from '../../../common/interfaces/IToastData';

// Custom Components
import TeamsTableRow from './TeamsTableRow';
import AddTeamForm from './AddTeamForm';
import CollapsableForm from '../../Forms/CollapsableForm';

// Hooks
import { useAuthentication } from '../../../hooks/useAuthentication';

// Utils
import { ComponentColor } from '../../../common/constants/constants';


interface ITeamsTableProps {
    teams: Array<ITeam>;
}

function TeamsTable({ teams }: ITeamsTableProps): ReactElement {
    // Check authentication
    const isAuthenticated: boolean = useAuthentication();

    // AddForm state
    const [isAddFormOpen, setIsAddFormOpen] = useState<boolean>(false);

    // Toast State
    const [isToastOpen, setIsToastOpen] = useState<boolean>(false);
    const [toastData, setToastData] = useState<IToastData>({ toastIcon: ComponentColor.DANGER, toastHeader: 'Error', toastBody: 'Something went wrong' });

    const handleToggleAddFormState = (): void => {
        setIsAddFormOpen(!isAddFormOpen);
    }

    /**
     * Renders a table body using props.
     * @returns {ReactElement} The rendered table body.
     */
    const RenderTableBody = (): ReactElement => {
        return (
            <tbody>
                {_.map(teams, (team: ITeam) => {
                    return (
                        <TeamsTableRow team={team} setIsToastOpen={setIsToastOpen} setToastData={setToastData} />
                    )
                })}
            </tbody>
        );
    };

    // Renders the table if props are provided for sports, otherwise renders a disclaimer that no sports are present.
    return (
        <>
            {isAuthenticated &&
                <CollapsableForm isFormOpen={isAddFormOpen} label={'Add Team Form'} toggleFn={handleToggleAddFormState}>
                    <AddTeamForm />
                </CollapsableForm>
            }
            {_.isEmpty(teams) && (
                <Row className='mt-2'>
                    <h2>No Teams found. Please sign in as a manager to add a team!</h2>
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
                                Sport
                            </th>
                            <th>
                                Manager
                            </th>
                            <th>
                                Number of Players on Team
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
            <Toast isOpen={isToastOpen}>
                <ToastHeader icon={toastData.toastIcon} toggle={() => setIsToastOpen(false)}>
                    {toastData.toastHeader}
                </ToastHeader>
                <ToastBody>
                    {toastData.toastBody}
                </ToastBody>
            </Toast>
        </>
    )
};

export default TeamsTable;