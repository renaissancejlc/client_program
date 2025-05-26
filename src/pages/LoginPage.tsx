import React, { useState } from 'react';
import { Auth } from 'aws-amplify';
import { Container, Form, Button, Alert } from 'react-bootstrap';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [step, setStep] = useState<'login' | 'newPassword'>('login');
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      // Nickname is collected but not used in the signIn call, can be used as needed
      console.log('Nickname:', nickname);
      const loggedInUser = await Auth.signIn(email, password);
      if (loggedInUser.challengeName === 'NEW_PASSWORD_REQUIRED') {
        setUser(loggedInUser);
        setStep('newPassword');
      } else {
        window.location.href = '/';
      }
    } catch (err: any) {
      setError(err.message || 'Login failed.');
    }
  };

  const handleNewPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      await Auth.completeNewPassword(user, newPassword, { nickname });
      window.location.href = '/';
    } catch (err: any) {
      setError(err.message || 'Failed to set new password.');
    }
  };

  return (
    <Container className="d-flex align-items-center justify-content-center min-vh-100">
      <div style={{ maxWidth: 400, width: '100%' }}>
        <h2 className="text-center mb-4">Login</h2>
        {error && <Alert variant="danger">{error}</Alert>}

        {step === 'login' ? (
          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Button type="submit" variant="primary" className="w-100">
              Log In
            </Button>
          </Form>
        ) : (
          <Form onSubmit={handleNewPassword}>
            <Form.Group className="mb-3">
              <Form.Label>Nickname</Form.Label>
              <Form.Control
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Button type="submit" variant="success" className="w-100">
              Set New Password
            </Button>
          </Form>
        )}
      </div>
    </Container>
  );
};

export default LoginPage;