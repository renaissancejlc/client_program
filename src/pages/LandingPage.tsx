import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const LandingPage: React.FC = () => {
  return (
    <Container className="mt-4">
      <Row className="mb-4">
        <Col>
          <h2>Welcome, Coach!</h2>
          <p>This is your dashboard. Manage clients, track billing, and view your calendar.</p>
        </Col>
      </Row>

      <Row>
        <Col md={6} className="mb-3">
          <Card>
            <Card.Body>
              <Card.Title>Clients</Card.Title>
              <Card.Text>View and manage your client list.</Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} className="mb-3">
          <Card>
            <Card.Body>
              <Card.Title>Billing</Card.Title>
              <Card.Text>Track invoices and payment history.</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Placeholder for future Google Calendar integration */}
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Calendar (Coming Soon)</Card.Title>
              <Card.Text>Sync your Google Calendar to view upcoming sessions.</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LandingPage;