import _ from 'lodash';
import React, { ChangeEvent, ReactElement } from'react';
import { Row, Col, Input } from 'reactstrap';

// Utils
import { EntityTypes, InputFieldTypes } from '../../common/constants/constants';

// Interfaces
import IManager from '../../common/interfaces/IManager';
import ISport from '../../common/interfaces/ISport';
import ITeam from '../../common/interfaces/ITeam';

interface ITableDropdownInputProps {
    cellText: string;
    entity: EntityTypes;
    id: string;
    isEditMode: boolean;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    options: Array<ITeam | ISport | IManager>;
    value: string;
}

function TableDropdownInput({ cellText, entity, id, isEditMode, onChange, options, value}: ITableDropdownInputProps): ReactElement {
    return (
        <Row className='justify-content-center'>
            <Col sm={12}>
                {isEditMode &&
                    <>
                        <Input
                            id={id}
                            type={InputFieldTypes.SELECT}
                            onChange={onChange}
                            value={value}
                        >
                            <option id='' value=''>
                                No {entity}
                            </option>
                            {_.map(options, (option) => {
                                return (
                                    <option id={option._id} value={option._id}>
                                        {entity === EntityTypes.SPORT && (option as ISport).sportName}
                                        {entity === EntityTypes.TEAM && (option as ITeam).teamName}
                                        {entity === EntityTypes.MANAGER && `${(option as IManager).firstName} ${(option as IManager).lastName}`}
                                    </option>
                                )
                            })}
                        </Input>
                    </>
                }
                {!isEditMode &&
                    <>
                        {!_.isEmpty(cellText) ? cellText : `No ${entity}`}
                    </>
                }
            </Col>
        </Row>
    );
};

export default TableDropdownInput;