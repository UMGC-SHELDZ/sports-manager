import React, { ReactElement } from 'react';
import { Button, Nav, Navbar, NavbarBrand, NavItem } from 'reactstrap';

// Constants
import { ComponentColor, CurrentViewOptions } from '../../common/constants/constants';

// Props for main nav bar
interface IMainNavBarProps {
    setCurrentView: Function;
}

function MainNavbar({ setCurrentView }: IMainNavBarProps): ReactElement {

    return (
        <Navbar color={ComponentColor.SUCCESS} dark className='custom-nav'>
            <NavbarBrand>SHELDZ Sports Manager</NavbarBrand>
            <Nav className='me-auto'>
                <NavItem>
                    <Button color={ComponentColor.SUCCESS} onClick={() => setCurrentView(CurrentViewOptions.SPORT)}>
                        View Sports
                    </Button>
                </NavItem>
                <NavItem>
                    <Button color={ComponentColor.SUCCESS} onClick={() => setCurrentView(CurrentViewOptions.TEAM)}>
                        View Teams
                    </Button>
                </NavItem>
                <NavItem>
                    <Button color={ComponentColor.SUCCESS} onClick={() => setCurrentView(CurrentViewOptions.PLAYER)}>
                        View Players
                    </Button>
                </NavItem>
            </Nav>
            <Nav>
                <NavItem>
                   <Button color={ComponentColor.SUCCESS} onClick={() => setCurrentView(CurrentViewOptions.LOGIN)}>
                        Manager Log In
                    </Button>
                </NavItem>
                <NavItem>
                    <Button color={ComponentColor.SUCCESS} onClick={() => setCurrentView(CurrentViewOptions.REGISTRATION)}>
                        Manager Sign Up
                    </Button>
                </NavItem>
            </Nav>
        </Navbar>
    );
};

export default MainNavbar;