import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TicketCard from '../Components/TicketCard';

export default function TicketList() {
  const [tickets, setTickets] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const savedTickets = JSON.parse(localStorage.getItem('tickets')) || [];
    setTickets(savedTickets);
  }, []);

  const filteredTickets = tickets.filter(ticket => {
    if (filter === 'open') return !ticket.resolved;
    if (filter === 'closed') return ticket.resolved;
    return true;
  });

  const handleDelete = (id) => {
    const updatedTickets = tickets.filter(ticket => ticket.id !== id);
    setTickets(updatedTickets);
    localStorage.setItem('tickets', JSON.stringify(updatedTickets));
  };

  

  const toggleResolved = (id) => {
    const updatedTickets = tickets.map(ticket => 
      ticket.id === id ? { ...ticket, resolved: !ticket.resolved } : ticket
    );
    setTickets(updatedTickets);
    localStorage.setItem('tickets', JSON.stringify(updatedTickets));
  };

  return (
    <div className="ticket-list-container">
      <div className="list-controls">
        <div className="filter-tabs">
          <button 
            className={filter === 'all' ? 'active' : ''}
            onClick={() => setFilter('all')}
          >
            All Tickets
          </button>
          <button
            className={filter === 'open' ? 'active' : ''}
            onClick={() => setFilter('open')}
          >
            Open
          </button>
          <button
            className={filter === 'closed' ? 'active' : ''}
            onClick={() => setFilter('closed')}
          >
            Closed
          </button>
        </div>
        <Link to="/new" className="new-ticket-btn">
          + New Ticket
        </Link>
      </div>

      <div className="ticket-grid">
        {filteredTickets.map(ticket => (
          <div key={ticket.id} className="ticket-wrapper">
            <TicketCard 
              ticket={ticket} 
              onDelete={handleDelete}
              
            />
            <button 
              onClick={() => toggleResolved(ticket.id)}
              className={`resolve-btn ${ticket.resolved ? 'resolved' : ''}`}
            >
              {ticket.resolved ? 'Reopen' : 'Mark Resolved'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}