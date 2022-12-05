import React, { ReactElement } from 'react';
import { Nav, Navbar, NavbarBrand, NavItem, NavLink } from 'reactstrap';

// Constants
import { CurrentViewOptions } from '../../common/constants/constants';

// Props for main nav bar
interface IMainNavBarProps {
    setCurrentView: Function;
}

function MainNavbar({ setCurrentView }: IMainNavBarProps): ReactElement {

    return (
        <Navbar>
            <NavbarBrand href='/'>Sports Manager</NavbarBrand>
            <Nav className='me-auto'>
                <NavItem>
                    <NavLink className='view-choice' onClick={() => setCurrentView(CurrentViewOptions.SPORT)}>
                        View Sports
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink className='view-choice' onClick={() => setCurrentView(CurrentViewOptions.TEAM)}>
                        View Teams
                    </NavLink>
                </NavItem>
            </Nav>
            <Nav>
                <NavItem>
                    <NavLink className='view-choice' onClick={() => setCurrentView(CurrentViewOptions.MANAGER)}>
                        Manager Log In
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink className='view-choice' onClick={() => setCurrentView(CurrentViewOptions.SIGN_UP)}>
                        Manager Sign Up
                    </NavLink>
                </NavItem>
            </Nav>
        </Navbar>
    );
};

export default MainNavbar;