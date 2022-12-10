import React, { FormEvent, ReactElement, useState } from 'react';
import { Table } from 'reactstrap';
import * as _ from 'lodash';

// Custom Components
import AddFormOptions from '../AddFormComponents/AddFormOptions';

function AddTeamForm(): ReactElement {
    // State for team variables
    const [teamName, setTeamName] = useState<string>('');

    // Theses should really store an IDs
    const [sport, setSport] = useState<string>('');
    const [manager, setManager] = useState<string>('');

    // Handlers for UI actions
    /**
     * Handler for changing the name of a team
     * @param {FormEvent<HTMLInputElement>} e Changes to the input field.
     */
    const handleTeamNameChange = (e: FormEvent<HTMLInputElement>): void => {
        setTeamName(e.currentTarget.value);
    };

    /**
     * Handler for changing the sport of a team
     * @param {FormEvent<HTMLInputElement>} e Changes to the input field.
     */
     const handleSportChange = (e: FormEvent<HTMLInputElement>): void => {
        setSport(e.currentTarget.value);
    };

    /**
     * Handler for changing the manager of a team
     * @param {FormEvent<HTMLInputElement>} e Changes to the input field.
     */
     const handleManagerChange = (e: FormEvent<HTMLInputElement>): void => {
        setManager(e.currentTarget.value);
    };

    /**
     * Handler to save a team
     */
    const handleSaveTeam = (): void => {
        alert(`${teamName} would be saved`);
    }

    /**
     * Handler to clear the team form
     */
    const handleClearTeamForm = (): void => {
        setTeamName('');
        setSport('');
        setManager('');
    }

    // Selecting a sport and a manager should be drop downs of all options.
    return (
        <Table>
            <thead>
                <tr>
                    <th>
                        New Team Name
                    </th>
                    <th>
                        Select Team Manager
                    </th>
                    <th>
                        Select Team Sport
                    </th>
                    <th>
                        Save Team/Clear Form
                    </th>
                </tr>
            </thead>
            <tr>
                <AddFormOptions
                    saveFn={handleSaveTeam}
                    deleteFn={_.noop}
                    toggleEdit={_.noop}
                    saveDisabled={false}
                    isLoading={false}
                    isEditMode={false}
                />
            </tr>
        </Table>
    );
};

export default AddTeamForm;