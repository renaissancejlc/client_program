import React from 'react';
import { Auth } from 'aws-amplify';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const LogoutButton: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await Auth.signOut();
      navigate('/login');
    } catch (err) {
      console.error('Error signing out:', err);
    }
  };

  return (
    <Button variant="outline-light" onClick={handleLogout}>
      Log Out
    </Button>
  );
};

export default LogoutButton;