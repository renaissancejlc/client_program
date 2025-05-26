import React, { useEffect, useState } from 'react';
import { Container, Card, ListGroup, Button } from 'react-bootstrap';
import { Auth } from 'aws-amplify';
import { useNavigate } from 'react-router-dom';

const UserPage: React.FC = () => {
  const [userInfo, setUserInfo] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then(user => setUserInfo(user))
      .catch(() => navigate('/login'));
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await Auth.signOut();
      navigate('/login');
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  if (!userInfo) {
    return <Container className="mt-4">Loading user info...</Container>;
  }

  const { email, phone_number, nickname, sub } = userInfo.attributes;

  return (
    <Container className="mt-4">
      <Card>
        <Card.Header as="h4">User Profile</Card.Header>
        <ListGroup variant="flush">
          <ListGroup.Item><strong>Nickname:</strong> {nickname || '—'}</ListGroup.Item>
          <ListGroup.Item><strong>Email:</strong> {email || '—'}</ListGroup.Item>
          <ListGroup.Item><strong>Phone:</strong> {phone_number || '—'}</ListGroup.Item>
          <ListGroup.Item><strong>Clients Managed:</strong> 0</ListGroup.Item>
        </ListGroup>
        <Card.Footer className="text-end">
          <Button variant="outline-danger" onClick={handleLogout}>
            Log Out
          </Button>
        </Card.Footer>
      </Card>
    </Container>
  );
};

export default UserPage;