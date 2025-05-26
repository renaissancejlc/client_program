import React from 'react';
import { Container, Form, Button, Table } from 'react-bootstrap';

const BillingPage: React.FC = () => {
  return (
    <Container className="mt-4">
      <h2 className="mb-4">Billing</h2>

      {/* Billing Form */}
      <Form className="mb-4">
        <Form.Group className="mb-3" controlId="formClient">
          <Form.Label>Client</Form.Label>
          <Form.Select>
            <option>Select a client</option>
            {/* Dynamically populate this later */}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formAmount">
          <Form.Label>Amount</Form.Label>
          <Form.Control type="number" placeholder="$100" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formService">
          <Form.Label>Service Description</Form.Label>
          <Form.Control type="text" placeholder="e.g., 1-on-1 Training" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formDate">
          <Form.Label>Date</Form.Label>
          <Form.Control type="date" />
        </Form.Group>

        <Button type="submit" variant="success">Submit Invoice</Button>
      </Form>

      {/* Invoices Table */}
      <h4>Invoice History</h4>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Client</th>
            <th>Amount</th>
            <th>Service</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {/* Dynamically render invoices here */}
          <tr>
            <td>Jane Doe</td>
            <td>$100</td>
            <td>Session Package</td>
            <td>2025-05-01</td>
            <td>Paid</td>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
};

export default BillingPage;