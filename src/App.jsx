
import Header from './Components/Header'
import { Routes, Route } from 'react-router-dom'
import TicketList from './Pages/TicketList'
import NewTicket from './Pages/NewTicket'
import TicketDetails from './Pages/TicketDetails'

import './App.css'; 

import { useState } from 'react';

import AdminDashboard from './Pages/AdminDashboard';

export default function App() {
  const [tickets, setTickets] = useState(() => {
    return JSON.parse(localStorage.getItem('tickets')) || [];
  });

  const updateTicket = (id, updates) => {
    const updatedTickets = tickets.map(ticket => 
      ticket.id === id ? { ...ticket, ...updates } : ticket
    );
    setTickets(updatedTickets);
    localStorage.setItem('tickets', JSON.stringify(updatedTickets));
  };

  return (
    <>
    <Header />
    <Routes>
      <Route path="/" element={<TicketList />} />
      <Route path="/new" element={<NewTicket />} />
      <Route path="/tickets/:id" element={<TicketDetails />} />
      
      <Route 
        path="/admin" 
        element={
          <AdminDashboard 
            tickets={tickets} 
            onUpdateTicket={updateTicket} 
          />
        } 
      />
     
    </Routes>
    </>
  );
}