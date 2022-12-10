import { faCancel, faFloppyDisk, faPenToSquare, faX } from '@fortawesome/free-solid-svg-icons';
import { faFloppyDisk as faRegFloppyDisk } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { ReactElement } from 'react';
import * as _ from 'lodash';
import { Spinner } from 'reactstrap';

interface IAddFormOptionsProps {
    saveFn: () => void;
    deleteFn: () => void;
    toggleEdit: () => void;
    saveDisabled: boolean;
    isEditMode: boolean;
    isLoading: boolean;
}

// Common component for add form options
function AddFormOptions({ saveFn, deleteFn, toggleEdit, saveDisabled, isEditMode, isLoading }: IAddFormOptionsProps): ReactElement {
    return (
        <td>
            {isLoading && 
                <Spinner>
                    Processing request...
                </Spinner>
            }
            {!isEditMode &&
                <FontAwesomeIcon icon={faPenToSquare} onClick={toggleEdit} className='selectable-feature' />
            }
            {isEditMode && 
                <>
                    <FontAwesomeIcon icon={faCancel} onClick={toggleEdit} className='selectable-feature' />
                    &nbsp;
                    {(saveDisabled) &&
                        <FontAwesomeIcon icon={faRegFloppyDisk} onClick={_.noop} />
                    }
                    {(!saveDisabled) &&
                        <FontAwesomeIcon icon={faFloppyDisk} onClick={saveFn} className='selectable-feature' />
                    }
                </>
            }
            
            &nbsp;
            <FontAwesomeIcon icon={faX} onClick={deleteFn} className='selectable-feature' />
        </td>
    );
};

export default AddFormOptions;