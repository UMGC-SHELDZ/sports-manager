import React, { ReactElement, useState } from 'react';
import * as _ from 'lodash';
import { Row, Table, Toast, ToastBody, ToastHeader } from 'reactstrap';

// Interfaces
import IToastData from '../../../common/interfaces/IToastData';

// Custom Components
import CollapsableForm from '../../Forms/CollapsableForm';
import PlayersTableRow from './PlayersTableRow';
import AddPlayerForm from './AddPlayerForm';

// Hooks
import { useAuthentication } from '../../../hooks/useAuthentication';

// Utils
import { ComponentColor } from '../../../common/constants/constants';
import IPlayer from '../../../common/interfaces/IPlayer';

interface IPlayersTable {
    players: Array<IPlayer>;
    currentViewHandler: Function;
}

function PlayersTable({ currentViewHandler, players }: IPlayersTable): ReactElement {
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
                {_.map(players, (player: IPlayer) => {
                    return (
                        <PlayersTableRow player={player} setIsToastOpen={setIsToastOpen} setToastData={setToastData} currentViewHandler={currentViewHandler}/>
                    )
                })}
            </tbody>
        );
    };

    // Renders the table if props are provided for sports, otherwise renders a disclaimer that no sports are present.
    return (
        <>
            {isAuthenticated &&
                <CollapsableForm isFormOpen={isAddFormOpen} label={'Add Player Form'} toggleFn={handleToggleAddFormState}>
                    <AddPlayerForm />
                </CollapsableForm>
            }
            {_.isEmpty(players) && (
                <Row className='mt-2'>
                    <h2>No Players found. Please sign in as a manager to add a player!</h2>
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
                                Team
                            </th>
                            <th>
                                Position
                            </th>
                            <th>
                                Player Number
                            </th>
                            <th>
                                Salary
                            </th>
                            {isAuthenticated && 
                                <th>
                                    Manage Player
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

export default PlayersTable;