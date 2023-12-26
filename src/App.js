import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Modal, Button, Form } from 'react-bootstrap';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import 'moment/locale/en-gb';
import Client from './components/Client'; // Import the Clients component
import SendAMessage from './components/SendAMessage';
import Billing from './components/Billing'

const localizer = momentLocalizer(moment);

const HomeTab = ({ events, handleShow, handleClose, handleInputChange, handleDateChange, handleAddEvent }) => (
  <div className="container mt-4">
    <h1>Calendar</h1>
    <Button variant="primary" onClick={handleShow}>
      Add Event
    </Button>
    <Calendar
      localizer={localizer}
      events={events}
      views={['month', 'week', 'day']}
      defaultView="week"
      startAccessor="start"
      endAccessor="end"
      style={{ height: 500 }}
    />
    {/* Add your components and content here */}
  </div>
);

const ClientsTab = () => (
  <div className="container mt-4">
    {/* Render components for the Clients tab */}
    <h1>Clients</h1>
  </div>
);

const MessageTab = () => (
  <div className="container mt-4">
    {/* Render components for the Send a Message tab */}
    <h1>Send a Message</h1>
  </div>
);

const BillingTab = () => (
  <div className="container mt-4">
    {/* Render components for the Billing tab */}
    <h1>Billing</h1>
  </div>
);

const App = () => {
  const [currentTab, setCurrentTab] = useState('home'); // Default tab is 'home'

  const handleTabChange = (tab) => setCurrentTab(tab);

  const [events, setEvents] = useState([
    {
      title: 'Event 1',
      start: new Date(2023, 11, 25, 10, 0),
      end: new Date(2023, 11, 25, 12, 0),
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    start: new Date(),
    end: new Date(),
  });

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({
      ...newEvent,
      [name]: value,
    });
  };

  const handleDateChange = (name, date) => {
    setNewEvent({
      ...newEvent,
      [name]: date,
    });
  };

  const handleAddEvent = () => {
    setEvents([...events, newEvent]);
    handleClose();
  };

  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home" onClick={() => handleTabChange('home')}>
          Simply Fitt
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#clients" onClick={() => handleTabChange('clients')}>
              Clients
            </Nav.Link>
            <Nav.Link href="#SendAMessage" onClick={() => handleTabChange('message')}>
              Send a Message
            </Nav.Link>
            <Nav.Link href="#Billing" onClick={() => handleTabChange('billing')}>
              Billing
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      {currentTab === 'home' && (
        <HomeTab
          events={events}
          handleShow={handleShow}
          handleClose={handleClose}
          handleInputChange={handleInputChange}
          handleDateChange={handleDateChange}
          handleAddEvent={handleAddEvent}
        />
      )}

      {currentTab === 'clients' && <Client />}
      {currentTab === 'message' && <SendAMessage />}
      {currentTab === 'billing' && <Billing />}

      {/* Add Event Modal */}
      <Modal show={showModal} onHide={handleClose}>
        {/* ... (rest of the modal code) */}
      </Modal>
    </div>
  );
};

export default App;