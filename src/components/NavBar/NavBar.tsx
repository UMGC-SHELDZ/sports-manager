import React, { ReactElement } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import logo from '../../common/static/images/logo.svg'

function NavBar(): ReactElement {
    return (
        <Navbar
            color="dark"
            dark
        >
            <NavbarBrand href="/">
                <img
                    alt="logo"
                    src={logo}
                    style={{
                    height: 40,
                    width: 40
                    }}
                />
                Reactstrap
            </NavbarBrand>
        </Navbar>
    );
};

export default NavBar;