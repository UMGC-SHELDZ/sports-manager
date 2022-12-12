import React, { ReactElement, useState } from 'react';
import * as _ from 'lodash';
import { Row, Table, Toast, ToastBody, ToastHeader } from 'reactstrap';

// Interfaces
import ISport from '../../../common/interfaces/ISport';
import IToastData from '../../../common/interfaces/IToastData';

// Custom Components
import SportsTableRow from './SportsTableRow';
import AddSportForm from './AddSportForm';
import CollapsableForm from '../../Forms/CollapsableForm';

// Hooks
import { useAuthentication } from '../../../hooks/useAuthentication';

// Utils
import { ComponentColor } from '../../../common/constants/constants';


interface ISportsTableProps {
    sports: Array<ISport>;
}

function SportsTable({ sports }: ISportsTableProps): ReactElement {
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
                {_.map(sports, (sport: ISport) => {
                    return (
                        <SportsTableRow sport={sport} setIsToastOpen={setIsToastOpen} setToastData={setToastData} />
                    )
                })}
            </tbody>
        );
    };

    // Renders the table if props are provided for sports, otherwise renders a disclaimer that no sports are present.
    return (
        <>
            {isAuthenticated &&
                <CollapsableForm isFormOpen={isAddFormOpen} label={'Add Sport Form'} toggleFn={handleToggleAddFormState}>
                    <AddSportForm />
                </CollapsableForm>
            }
            {_.isEmpty(sports) && (
                <Row className='mt-2'>
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

export default SportsTable;