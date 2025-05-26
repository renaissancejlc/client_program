import { Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { Auth } from 'aws-amplify';

const NavBar = () => {
  const [nickname, setNickname] = useState<string | null>(null);

  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then(user => setNickname(user.attributes.nickname || null))
      .catch(() => setNickname(null));
  }, []);

  return (
    <Navbar bg="dark" variant="dark">
      <Container className="d-flex justify-content-between align-items-center">
        <Nav className="d-flex">
          <Nav.Link as={Link} to="/">Dashboard</Nav.Link>
          <Nav.Link as={Link} to="/clients">Clients</Nav.Link>
          <Nav.Link as={Link} to="/billing">Billing</Nav.Link>
        </Nav>
        <Nav className="d-flex align-items-center">
          {nickname ? (
            <Nav.Link as={Link} to="/user" className="me-3 text-light">
  Hello, {nickname}
</Nav.Link>
          ) : (
            <Nav.Link as={Link} to="/login">Login</Nav.Link>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar;