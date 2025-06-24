import { useParams } from 'react-router-dom'

export default function TicketDetails() {
  const { id } = useParams()
  const [ticket, setTicket] = useState(null)

  useEffect(() => {
    const tickets = JSON.parse(localStorage.getItem('tickets')) || []
    setTicket(tickets.find(t => t.id === Number(id)))
  }, [id])

  if (!ticket) return <div>Loading...</div>

  return (
    <div className="ticket-details">
      <h2>{ticket.title}</h2>
      <p className="priority">{ticket.priority}</p>
      <p>{ticket.description}</p>
      <p>Status: {ticket.resolved ? 'Closed' : 'Open'}</p>
    </div>
  )
}