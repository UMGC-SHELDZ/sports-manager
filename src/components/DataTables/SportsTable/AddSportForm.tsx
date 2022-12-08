
import React, { FormEvent, ReactElement, useState } from 'react';
import { Table } from 'reactstrap';

// Custom Components
import AddFormOptions from '../AddFormComponents/AddFormOptions';

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
    const handleClearSportForm = (): void => {
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
                <AddFormOptions saveFn={handleSaveSport} clearFn={handleClearSportForm} />
            </tr>
        </Table>
    );
};

export default AddSportForm;