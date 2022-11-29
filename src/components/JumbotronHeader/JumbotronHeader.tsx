import React, { ReactElement } from 'react';
import sportsheader from '../../common/static/images/sportsheader.png';

function JumbotronHeader(): ReactElement {
    return (
        <img
            alt="Team SHELDZ Sports Manager Logo"
            src={sportsheader}
            style={{
                width: '100%',
                height: 250
            }}
        />
    )
};

export default JumbotronHeader;