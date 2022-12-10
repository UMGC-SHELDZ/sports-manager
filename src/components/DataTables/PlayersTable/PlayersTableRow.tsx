import React, { FormEvent, ReactElement, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBan, faFloppyDisk, faPenToSquare, faX } from '@fortawesome/free-solid-svg-icons'
import * as _ from 'lodash';

// Hooks
import { useAuthentication } from '../../../hooks/useAuthentication';

// Interfaces
import IPlayer from '../../../common/interfaces/IPlayer';

interface IPlayersTableRowProps {
    player: IPlayer;
}

function PlayersTableRow({ player }: IPlayersTableRowProps): ReactElement {
    // Check authentication
    const isAuthenticated: boolean = useAuthentication();

    // State for player variables
    const [lastName, setLastName] = useState<string>(player.lastName);
    const [firstName, setFirstName] = useState<string>(player.firstName);
    const [position, setPosition] = useState<string | undefined>(player.position);
    const [playerNumber, setPlayerNumber] = useState<number | undefined>(player.playerNumber);
    const [salary, setSalary] = useState<number | undefined>(player.salary);

    // Sets edit state
    const [isReadOnly, setIsReadOnly] = useState<boolean>(true);

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
     * Handler for changing the number of a player
     * @param {FormEvent<HTMLInputElement>} e Changes to the input field.
     */
    const handlePlayerNumberChange = (e: FormEvent<HTMLInputElement>): void => {
        setPlayerNumber(parseInt(e.currentTarget.value));
    };

    /**
     * Handler for changing the salary of a player
     * @param {FormEvent<HTMLInputElement>} e Changes to the input field.
     */
     const handleSalaryChange = (e: FormEvent<HTMLInputElement>): void => {
        setSalary(parseInt(e.currentTarget.value));
    };

    // PLACEHOLDER FUNCTIONS
    /**
     * Handler to delete a player
     */
    const handleDeletePlayer = (): void => {
        setIsReadOnly(true);
        alert(`${firstName} ${lastName} would be deleted`);
    }

    /**
     * Handler to save a player
     */
    const handleSavePlayer = (): void => {
        setIsReadOnly(true);
        alert(`${firstName} ${lastName} would be saved`);
    }

    return (
        <tr key={player._id}>
            <th scope='row'>
                <input value={lastName} readOnly={isReadOnly} onChange={handleLastNameChange} />
            </th>
            <td>
                <input value={firstName} readOnly={isReadOnly} onChange={handleFirstNameChange} />
            </td>
            <td>
                <input value={!_.isNil(position) ? position : 'No Position'} readOnly={isReadOnly} onChange={handlePositionChange} />
            </td>
            <td>
                <input value={!_.isNil(playerNumber) ? playerNumber : 'No Number'} readOnly={isReadOnly} onChange={handlePlayerNumberChange} />
            </td>
            <td>
                <input value={!_.isNil(salary) ? salary : 'No Salary'} readOnly={isReadOnly} onChange={handleSalaryChange} />
            </td>
            {isAuthenticated &&
                <td>
                    {!isReadOnly && 
                        <FontAwesomeIcon icon={faBan} onClick={() => setIsReadOnly(true)}/>
                    }
                    {!isReadOnly && 
                        <FontAwesomeIcon icon={faFloppyDisk} onClick={handleSavePlayer}/>
                    }
                    {isReadOnly && 
                        <FontAwesomeIcon icon={faPenToSquare} onClick={() => setIsReadOnly(false)}/>
                    }
                    <FontAwesomeIcon icon={faX} onClick={handleDeletePlayer} />
                </td>
            }
        </tr>
    )
};

export default PlayersTableRow;