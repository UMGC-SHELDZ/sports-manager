import React, { FormEvent, ReactElement, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBan, faFloppyDisk, faPenToSquare, faX } from '@fortawesome/free-solid-svg-icons'

// Hooks
import { useAuthentication } from '../../../hooks/useAuthentication';

// Interfaces
import ITeam from '../../../common/interfaces/ITeam';

interface ITeamsTableRowProps {
    team: ITeam;
}

function TeamsTableRow({ team }: ITeamsTableRowProps): ReactElement {
    // Check authentication
    const isAuthenticated: boolean = useAuthentication();

    // State for Team variables
    const [teamName, setTeamName] = useState<string>(team.teamName);

    // Note that we should probably hold the manager ID in the team object, and query for the manager name using the ID
    // It may be wise to have a manager object queried and set here, so we use the ID to send back on updates.
    const [managerName, setManagerName] = useState<string>(team.manager);

    // Sets edit state
    const [isReadOnly, setIsReadOnly] = useState<boolean>(true);

    // Handlers for UI actions
    /**
     * Handler for changing the name of the team
     * @param {FormEvent<HTMLInputElement>} e Changes to the input field.
     */
    const handleTeamNameChange = (e: FormEvent<HTMLInputElement>): void => {
        setTeamName(e.currentTarget.value);
    }

    /**
     * Handler for changing the name of the manager.
     * @param {FormEvent<HTMLInputElement>} e Changes to the input field.
     */
    const handleManagerNameChange = (e: FormEvent<HTMLInputElement>): void => {
        setManagerName(e.currentTarget.value);
    }

    // PLACEHOLDER FUNCTIONS
    /**
     * Handler to delete a team
     */
    const handleDeleteTeam = (): void => {
        setIsReadOnly(true);
        alert(`${teamName} would be deleted`);
    }

    /**
     * Handler to save a team
     */
    const handleSaveTeam = (): void => {
        setIsReadOnly(true);
        alert(`${teamName} would be saved`);
    }

    return (
        <tr key={team._id}>
            <th scope='row'>
                <input value={teamName} readOnly={isReadOnly} onChange={handleTeamNameChange} />
            </th>
            <td>
            <input value={managerName} readOnly={isReadOnly} onChange={handleManagerNameChange} />
            </td>
            <td>
                {/* Should be count of associated players from the DB */}
                {team.numPlayers}
            </td>
            {isAuthenticated &&
                <td>
                    {!isReadOnly && 
                        <FontAwesomeIcon icon={faBan} onClick={() => setIsReadOnly(true)}/>
                    }
                    {!isReadOnly && 
                        <FontAwesomeIcon icon={faFloppyDisk} onClick={handleSaveTeam}/>
                    }
                    {isReadOnly && 
                        <FontAwesomeIcon icon={faPenToSquare} onClick={() => setIsReadOnly(false)}/>
                    }
                    <FontAwesomeIcon icon={faX} onClick={handleDeleteTeam} />
                </td>
            }
        </tr>
    )
};

export default TeamsTableRow;