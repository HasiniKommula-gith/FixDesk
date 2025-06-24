import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
  const [tickets, setTickets] = useState([]);
  const [filter, setFilter] = useState('all');
  const [engineers, setEngineers] = useState([
    { id: 1, name: "Hasini" },
    { id: 2, name: "joe" },
    { id: 3, name: "john" },
  
  ]);
  const [assignments, setAssignments] = useState({});

  
  useEffect(() => {
    const savedTickets = JSON.parse(localStorage.getItem('tickets')) || [];
    setTickets(savedTickets);
    
    
    const savedAssignments = JSON.parse(localStorage.getItem('assignments')) || {};
    setAssignments(savedAssignments);
  }, []);

  const filteredTickets = tickets.filter(ticket => {
    if (filter === 'open') return !ticket.resolved;
    if (filter === 'closed') return ticket.resolved;
    if (filter === 'high') return ticket.priority === 'high';
    return true;
  });

  const handleResolve = (id) => {
    const updatedTickets = tickets.map(ticket => 
      ticket.id === id ? { ...ticket, resolved: true } : ticket
    );
    setTickets(updatedTickets);
    localStorage.setItem('tickets', JSON.stringify(updatedTickets));
  };

  const handleReopen = (id) => {
    const updatedTickets = tickets.map(ticket => 
      ticket.id === id ? { ...ticket, resolved: false } : ticket
    );
    setTickets(updatedTickets);
    localStorage.setItem('tickets', JSON.stringify(updatedTickets));
  };

  const handleAssign = (ticketId, engineerId) => {
    const newAssignments = {
      ...assignments,
      [ticketId]: engineerId
    };
    setAssignments(newAssignments);
    localStorage.setItem('assignments', JSON.stringify(newAssignments));
  };

  const getAssignedEngineer = (ticketId) => {
    return engineers.find(e => e.id == assignments[ticketId]);
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h1>Ticket Management Dashboard</h1>
        <Link to="/" className="back-link">← Back to User View</Link>
      </div>

      <div className="controls">
        <div className="filters">
          <button 
            className={filter === 'all' ? 'active' : ''}
            onClick={() => setFilter('all')}
          >
            All Tickets ({tickets.length})
          </button>
          <button
            className={filter === 'open' ? 'active' : ''}
            onClick={() => setFilter('open')}
          >
            Open ({tickets.filter(t => !t.resolved).length})
          </button>
          <button
            className={filter === 'closed' ? 'active' : ''}
            onClick={() => setFilter('closed')}
          >
            Closed ({tickets.filter(t => t.resolved).length})
          </button>
          <button
            className={filter === 'high' ? 'active' : ''}
            onClick={() => setFilter('high')}
          >
            High Priority ({tickets.filter(t => t.priority === 'high').length})
          </button>
        </div>
      </div>

      <div className="tickets-grid">
        {filteredTickets.length > 0 ? (
          filteredTickets.map(ticket => (
            <div key={ticket.id} className={`ticket-card ${ticket.priority} ${ticket.resolved ? 'resolved' : ''}`}>
              <div className="ticket-header">
                <h3>{ticket.title}</h3>
                <div className="ticket-meta">
                  <span className={`priority ${ticket.priority}`}>
                    {ticket.priority.toUpperCase()}
                  </span>
                  <span className="date">
                    {new Date(ticket.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
              
              <p className="description">{ticket.description}</p>
              
              <div className="ticket-footer">
                <div className="assignment">
                  <select
                    value={assignments[ticket.id] || ''}
                    onChange={(e) => handleAssign(ticket.id, e.target.value)}
                    className="engineer-select"
                  >
                    <option value="">Assign to...</option>
                    {engineers.map(eng => (
                      <option key={eng.id} value={eng.id}>{eng.name}</option>
                    ))}
                  </select>
                  {assignments[ticket.id] && (
                    <span className="assigned-engineer">
                      {getAssignedEngineer(ticket.id)?.name}
                    </span>
                  )}
                </div>
                
                <div className="actions">
                  {ticket.resolved ? (
                    <button 
                      onClick={() => handleReopen(ticket.id)}
                      className="action-btn reopen"
                    >
                      Reopen
                    </button>
                  ) : (
                    <button
                      onClick={() => handleResolve(ticket.id)}
                      className="action-btn resolve"
                    >
                      Resolve
                    </button>
                  )}
                  
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="empty-state">
            <p>No tickets found matching your filters</p>
            <Link to="/new" className="new-ticket-btn">
              Create New Ticket
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}