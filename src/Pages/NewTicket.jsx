import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function NewTicket() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium'
  });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
   
    if (!formData.title.trim() || !formData.description.trim()) {
      alert('Please fill all fields');
      return;
    }

   
    const newTicket = {
      ...formData,
      id: Date.now(),
      resolved: false,
      createdAt: new Date().toISOString()
    };

   
    const existingTickets = JSON.parse(localStorage.getItem('tickets')) || [];
    const updatedTickets = [...existingTickets, newTicket];
    localStorage.setItem('tickets', JSON.stringify(updatedTickets));

   
    navigate('/');
  };

  return (
    <div className="ticket-form">
      <h2 style={{ marginBottom: '1.5rem' }}>Create New Ticket</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            className="form-control"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            required
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            className="form-control"
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            rows="5"
            required
          />
        </div>

        <div className="form-group">
          <label>Priority</label>
          <select
            className="form-control"
            value={formData.priority}
            onChange={(e) => setFormData({...formData, priority: e.target.value})}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <button type="submit" className="submit-btn">
          Create Ticket
        </button>
      </form>
    </div>
  );
}