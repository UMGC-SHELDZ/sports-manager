import React, { ReactElement } from 'react';
import logo from '../../common/static/images/logo.svg';

// Interface for HelloWorld Component
interface IHelloWorld {
    greetingText: string;
};

// Renders the HelloWorld Component
function HelloWorld({ greetingText }: IHelloWorld): ReactElement {
    return (
        <>
            <img src={logo} className="App-logo" alt="logo" />
            <p>
                <code>{ greetingText }</code>
            </p>
        </>
    );
};

export default HelloWorld;