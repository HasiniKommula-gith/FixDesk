import { Link } from 'react-router-dom';

export default function TicketCard({ ticket, onDelete, onEdit }) {
  return (
    <div className={`ticket-card priority-${ticket.priority}`}>
      <div className="ticket-header">
        <h3>{ticket.title}</h3>
        <div className="ticket-actions">
        
          <button onClick={() => onDelete(ticket.id)} className="delete-btn">
            🗑️ Delete
          </button>
        </div>
      </div>
      <p className="ticket-description">{ticket.description}</p>
      <div className="ticket-footer">
        <span className={`priority-badge priority-${ticket.priority}`}>
          {ticket.priority.toUpperCase()}
        </span>
        <span className="ticket-date">
          {new Date(ticket.createdAt).toLocaleDateString()}
        </span>
        {ticket.resolved && <span className="resolved-badge">✅ Resolved</span>}
      </div>
    </div>
  );
}