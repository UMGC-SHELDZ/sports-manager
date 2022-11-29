import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function Navigation() {
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="#home">Sports Manager App</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <NavDropdown title="Menu" id="collasible-nav-dropdown">
                            <NavDropdown.Item href="#team1">Team 1</NavDropdown.Item>
                            <NavDropdown.Item href="#team2">Team 2</NavDropdown.Item>
                            <NavDropdown.Item href="#team3">Team 3</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#all-players">Show All Players</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Nav>
                        <Nav.Link href="#log-in">Log In</Nav.Link>
                        <Nav.Link href='#sign-up'> Sign Up</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
export default Navigation;