import React, { FormEvent, ReactElement, useState } from 'react';
import { Table } from 'reactstrap';

// Custom Components
import AddFormOptions from '../AddFormComponents/AddFormOptions';

function AddPlayerForm(): ReactElement {
     // State for player variables
    const [lastName, setLastName] = useState<string>('');
    const [firstName, setFirstName] = useState<string>('');
    const [position, setPosition] = useState<string>('');
    const [playerNumber, setPlayerNumber] = useState<string>('');
    const [salary, setSalary] = useState<string>('');

    // This should be changed to the teamID
    const [team, setTeam] = useState('');

    // Handlers for UI actions
    /**
     * Handler for changing the last name of a player
     * @param {FormEvent<HTMLInputElement>} e Changes to the input field.
     */
    const handleLastNameChange = (e: FormEvent<HTMLInputElement>): void => {
        setLastName(e.currentTarget.value);
    };

    /**
     * Handler for changing the first name of a player
     * @param {FormEvent<HTMLInputElement>} e Changes to the input field.
     */
    const handleFirstNameChange = (e: FormEvent<HTMLInputElement>): void => {
        setFirstName(e.currentTarget.value);
    };

    /**
     * Handler for changing the position of a player
     * @param {FormEvent<HTMLInputElement>} e Changes to the input field.
     */
    const handlePositionChange = (e: FormEvent<HTMLInputElement>): void => {
        setPosition(e.currentTarget.value);
    };

    /**
     * Handler for changing the team of a player
     * @param {FormEvent<HTMLInputElement>} e Changes to the input field.
     */
     const handleTeamChange = (e: FormEvent<HTMLInputElement>): void => {
        setTeam(e.currentTarget.value);
    };

    /**
     * Handler for changing the number of a player
     * @param {FormEvent<HTMLInputElement>} e Changes to the input field.
     */
    const handlePlayerNumberChange = (e: FormEvent<HTMLInputElement>): void => {
        setPlayerNumber(e.currentTarget.value);
    };

    /**
     * Handler for changing the salary of a player
     * @param {FormEvent<HTMLInputElement>} e Changes to the input field.
     */
    const handleSalaryChange = (e: FormEvent<HTMLInputElement>): void => {
        setSalary(e.currentTarget.value);
    };


    /**
     * Handler to save a player
     */
    const handleSavePlayer = (): void => {
        alert(`${firstName} ${lastName} would be saved`);
    }

    /**
     * Handler to clear the player form
     */
    const handleClearPlayerForm = (): void => {
        setLastName('');
        setFirstName('');
        setPosition('');
        setTeam('');
        setPlayerNumber('');
        setSalary('');
    }

    return (
        <Table>
            <thead>
                <tr>
                    <th>
                        Team
                    </th>
                    <th>
                        New Player Last Name
                    </th>
                    <th>
                        New Player First Name
                    </th>
                    <th>
                        New Player Position
                    </th>
                    <th>
                        New Player Number
                    </th>
                    <th>
                        New Player Salary
                    </th>
                    <th>
                        Save Player/Clear Form
                    </th>
                </tr>
            </thead>
            <tr>
                <td>
                    <input value={team} onChange={handleTeamChange} />
                </td>
                <td>
                    <input value={lastName} onChange={handleLastNameChange} />
                </td>
                <td>
                    <input value={firstName} onChange={handleFirstNameChange} />
                </td>
                <td>
                    <input value={position} onChange={handlePositionChange} />
                </td>
                <td>
                    <input value={playerNumber} onChange={handlePlayerNumberChange} />
                </td>
                <td>
                    <input value={salary} onChange={handleSalaryChange} />
                </td>
                <AddFormOptions saveFn={handleSavePlayer} clearFn={handleClearPlayerForm} />
            </tr>
        </Table>
    );
};

export default AddPlayerForm;