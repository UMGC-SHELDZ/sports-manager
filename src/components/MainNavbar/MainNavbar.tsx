import React, { ReactElement } from 'react';
import { Nav, Navbar, NavbarBrand, NavItem, NavLink } from 'reactstrap';

function MainNavbar(): ReactElement {

    return (
        <Navbar>
            <NavbarBrand href="/">Sports Manager</NavbarBrand>
            <Nav className="me-auto">
                <NavItem>
                    <NavLink href="view-sports-link">
                        View Sports
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="view-teams-link">
                        View Teams
                    </NavLink>
                </NavItem>
            </Nav>
            <Nav>
                <NavItem>
                    <NavLink href="login-link">
                        Manager Log In
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="sign-up-link">
                        Manager Sign Up
                    </NavLink>
                </NavItem>
            </Nav>
        </Navbar>
    );
};

export default MainNavbar;