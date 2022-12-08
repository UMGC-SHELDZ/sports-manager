import { faFloppyDisk, faEraser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

interface IAddFormOptionsProps {
    saveFn: () => void;
    clearFn: () => void;
}

// Common component for add form options
function AddFormOptions({ saveFn, clearFn }: IAddFormOptionsProps) {
    return (
        <td>
            <FontAwesomeIcon icon={faFloppyDisk} onClick={saveFn}/>
            <FontAwesomeIcon icon={faEraser} onClick={clearFn} />
        </td>
    );
};

export default AddFormOptions;