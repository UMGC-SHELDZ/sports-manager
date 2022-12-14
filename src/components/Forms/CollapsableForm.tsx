import { faCircleMinus, faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { ReactElement, ReactNode } from 'react';
import { Row, Col, Collapse } from 'reactstrap';
import AddSportForm from '../DataTables/SportsTable/AddSportForm';

interface ICollapsableFormProps {
    children: ReactNode;
    isFormOpen: boolean;
    label: string
    toggleFn: () => void;
}

function CollapsableForm({ children, label, isFormOpen, toggleFn }: ICollapsableFormProps): ReactElement {
    return (
        <>
            <Row className='mt-3'>
                <Col sm={{offset: 9, size: 3}}>
                    {isFormOpen &&
                            <p className='text-align-end'>
                                <FontAwesomeIcon icon={faCircleMinus} onClick={toggleFn} className='selectable-feature' />
                                {' '}
                                Hide {label}
                            </p>
                    }
                    {!isFormOpen &&
                        <p className='text-align-end'>
                            <FontAwesomeIcon icon={faCirclePlus} onClick={toggleFn} className='selectable-feature' />
                            {' '}
                            Show {label}
                        </p>
                    }
                </Col>
            </Row>
            

            <Collapse isOpen={isFormOpen}>
                {children}
            </Collapse>
        </>
    );
};

export default CollapsableForm;