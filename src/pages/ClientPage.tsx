import React, { useEffect, useState } from 'react';
import { Container, Table, Button, Form, Row, Col } from 'react-bootstrap';
import { Auth } from 'aws-amplify';

const ClientPage: React.FC = () => {
  const [clients, setClients] = useState<any[]>([]);
  const [newClient, setNewClient] = useState({
    fullName: '',
    preferredName: '',
    status: 'Lead',
    contact: {
      phone: '',
      email: '',
      preferredMethod: '',
      instagram: '',
      timezone: ''
    },
    service: {
      type: '',
      startDate: '',
      lastBilled: '',
      nextBilling: '',
      billingPlan: '',
      invoiceStatus: '',
      sessionsRemaining: '',
      lastSession: '',
      notes: '',
      mode: ''
    },
    engagement: {
      source: '',
      firstContact: '',
      followUpStatus: '',
      followUpNotes: ''
    },
    admin: {
      notes: '',
      signedAgreement: '',
      tags: ''
    },
    birthday: ''
  });

  useEffect(() => {
    fetchClients();
  }, []);

  const getToken = async () => {
    const session = await Auth.currentSession();
    return session.getIdToken().getJwtToken();
  };

  const fetchClients = async () => {
    const token = await getToken();
    const res = await fetch('https://evcqeravn3.execute-api.us-east-2.amazonaws.com/clients', {
      method: 'GET',
      headers: { Authorization: token }
    });

    const data = await res.json();
    console.log('Fetched client data:', data);

    const parsed = typeof data === 'string' ? JSON.parse(data) : data;
    if (Array.isArray(parsed)) {
      setClients(parsed);
    } else {
      console.error('Expected array but got:', parsed);
      setClients([]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, section?: string) => {
    const { name, value } = e.target;
    if (section) {
      setNewClient((prev) => ({
        ...prev,
        [section]: {
          ...(prev[section as keyof typeof prev] as any),
          [name]: value
        }
      }));
    } else {
      setNewClient((prev) => ({ ...prev, [name]: value }));
    }
  };

  const addClient = async () => {
    const token = await getToken();
    await fetch('https://evcqeravn3.execute-api.us-east-2.amazonaws.com/createClient', {
      method: 'POST',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newClient)
    });
    setNewClient({
      fullName: '',
      preferredName: '',
      status: 'Lead',
      contact: { phone: '', email: '', preferredMethod: '', instagram: '', timezone: '' },
      service: { type: '', startDate: '', lastBilled: '', nextBilling: '', billingPlan: '', invoiceStatus: '', sessionsRemaining: '', lastSession: '', notes: '', mode: '' },
      engagement: { source: '', firstContact: '', followUpStatus: '', followUpNotes: '' },
      admin: { notes: '', signedAgreement: '', tags: '' },
      birthday: ''
    });
    fetchClients();
  };

  const deleteClient = async (clientId: string) => {
    const token = await getToken();
    await fetch(`https://evcqeravn3.execute-api.us-east-2.amazonaws.com/createClient/${clientId}`, {
      method: 'DELETE',
      headers: { Authorization: token }
    });
    fetchClients();
  };

  return (
    <Container className="mt-4">
      <h2>Client Manager</h2>
      <Form className="mb-4">
        <h5>Core Info</h5>
        <Row>
          <Col><Form.Control placeholder="Full Name" name="fullName" value={newClient.fullName} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e)} /></Col>
          <Col><Form.Control placeholder="Preferred Name" name="preferredName" value={newClient.preferredName} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e)} /></Col>
          <Col>
            <Form.Select name="status" value={newClient.status} onChange={(e) => handleInputChange(e)}>
              <option value="Lead">Lead</option>
              <option value="Active">Active</option>
              <option value="Past">Past</option>
            </Form.Select>
          </Col>
        </Row>

        <h5 className="mt-3">Contact Info</h5>
        <Row>
          <Col><Form.Control placeholder="Phone" name="phone" value={newClient.contact.phone} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e, 'contact')} /></Col>
          <Col><Form.Control placeholder="Email" name="email" value={newClient.contact.email} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e, 'contact')} /></Col>
          <Col><Form.Control placeholder="Preferred Contact Method" name="preferredMethod" value={newClient.contact.preferredMethod} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e, 'contact')} /></Col>
          <Col><Form.Control placeholder="Instagram" name="instagram" value={newClient.contact.instagram} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e, 'contact')} /></Col>
          <Col><Form.Control placeholder="Time Zone" name="timezone" value={newClient.contact.timezone} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e, 'contact')} /></Col>
        </Row>

        <h5 className="mt-3">Service Info</h5>
        <Row>
          {Object.entries(newClient.service ?? {}).map(([key, value]) => (
            <Col key={key}>
              <Form.Control
                placeholder={key}
                name={key}
                value={typeof value === 'string' ? value : ''}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e, 'service')}
              />
            </Col>
          ))}
        </Row>

        <h5 className="mt-3">Engagement Info</h5>
        <Row>
          {Object.entries(newClient.engagement ?? {}).map(([key, value]) => (
            <Col key={key}>
              <Form.Control
                placeholder={key}
                name={key}
                value={typeof value === 'string' ? value : ''}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e, 'engagement')}
              />
            </Col>
          ))}
        </Row>

        <h5 className="mt-3">Admin Info</h5>
        <Row>
          {Object.entries(newClient.admin ?? {}).map(([key, value]) => (
            <Col key={key}>
              <Form.Control
                placeholder={key}
                name={key}
                value={typeof value === 'string' ? value : ''}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e, 'admin')}
              />
            </Col>
          ))}
        </Row>

        <h5 className="mt-3">Birthday</h5>
        <Row>
          <Col><Form.Control placeholder="YYYY-MM-DD" name="birthday" value={newClient.birthday} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e)} /></Col>
          <Col><Button onClick={addClient}>Add Client</Button></Col>
        </Row>
      </Form>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Preferred Name</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr key={client.clientId || client.fullName}>
              <td>{client.fullName}</td>
              <td>{client.preferredName}</td>
              <td>{client.status}</td>
              <td>
                <Button variant="warning" size="sm" className="me-2">Edit</Button>
                <Button variant="danger" size="sm" onClick={() => deleteClient(client.clientId)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default ClientPage;