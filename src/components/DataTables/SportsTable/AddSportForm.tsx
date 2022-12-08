import { faFloppyDisk, faEraser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { FormEvent, ReactElement, useState } from 'react';
import { Table } from 'reactstrap';

function AddSportForm(): ReactElement {
     // State for sport variables
     const [sportsName, setSportsName] = useState<string>('');

     // Handlers for UI actions
    /**
     * Handler for changing the name of a sport
     * @param {FormEvent<HTMLInputElement>} e Changes to the input field.
     */
    const handleSportsNameChange = (e: FormEvent<HTMLInputElement>): void => {
        setSportsName(e.currentTarget.value);
    };

    /**
     * Handler to save a sport
     */
    const handleSaveSport = (): void => {
        alert(`${sportsName} would be saved`);
    }

    /**
     * Handler to clear the sports form
     */
    const handleClearSportsForm = (): void => {
        setSportsName('');
    }

    return (
        <Table>
            <thead>
                <tr>
                    <th>
                        New Sport Name
                    </th>
                    <th>
                        Save Sport/Clear Form
                    </th>
                </tr>
            </thead>
            <tr>
                <td>
                    <input value={sportsName} onChange={handleSportsNameChange} />
                </td>
                <td>
                    <FontAwesomeIcon icon={faFloppyDisk} onClick={handleSaveSport}/>
                    <FontAwesomeIcon icon={faEraser} onClick={handleClearSportsForm} />
                </td>
            </tr>
        </Table>
    );
};

export default AddSportForm;