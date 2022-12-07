import React, { FormEvent, ReactElement, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBan, faFloppyDisk, faPenToSquare, faX } from '@fortawesome/free-solid-svg-icons'

// Hooks
import { useAuthentication } from '../../../hooks/useAuthentication';

// Interfaces
import ISport from '../../../common/interfaces/ISport';

interface ISportsTableRow {
    sport: ISport;
}

function SportsTableRow({ sport }: ISportsTableRow): ReactElement {
    // Check authentication
    const isAuthenticated: boolean = useAuthentication();

    // State for Team variables
    const [sportName, setSportName] = useState<string>(sport.sportName);

    // Sets edit state
    const [isReadOnly, setIsReadOnly] = useState<boolean>(true);

    // Handlers for UI actions
    /**
     * Handler for changing the name of the sport
     * @param {FormEvent<HTMLInputElement>} e Changes to the input field.
     */
    const handleSportNameChange = (e: FormEvent<HTMLInputElement>): void => {
        setSportName(e.currentTarget.value);
    }

    // PLACEHOLDER FUNCTIONS
    /**
     * Handler to delete a team
     */
    const handleDeleteSport = (): void => {
        setIsReadOnly(true);
        alert(`${sportName} would be deleted`);
    }

    /**
     * Handler to save a team
     */
    const handleSaveSport = (): void => {
        setIsReadOnly(true);
        alert(`${sportName} would be saved`);
    }

    return (
        <tr key={sport.id}>
            <th scope='row'>
                <input value={sportName} readOnly={isReadOnly} onChange={handleSportNameChange} />
            </th>
            <td>
                {/* Should be count of associated players from the DB */}
                {sport.numTeams}
            </td>
            {isAuthenticated &&
                <td>
                    {!isReadOnly && 
                        <FontAwesomeIcon icon={faBan} onClick={() => setIsReadOnly(true)}/>
                    }
                    {!isReadOnly && 
                        <FontAwesomeIcon icon={faFloppyDisk} onClick={handleSaveSport}/>
                    }
                    {isReadOnly && 
                        <FontAwesomeIcon icon={faPenToSquare} onClick={() => setIsReadOnly(false)}/>
                    }
                    <FontAwesomeIcon icon={faX} onClick={handleDeleteSport} />
                </td>
            }
        </tr>
    )
};

export default SportsTableRow;