import { Link } from 'react-router-dom'

function TicketItemCustomers({ ticket }) {
  const { _id, createdAt, product, status } = ticket;

  return (
    <div className='ticket'>
      <div>{new Date(createdAt).toLocaleString('en-US')}</div>
      <div>{product}</div>
      <div className={`status status-${status}`}>{status}</div>
      <Link to={`/customers/ticket/${_id}`} className='btn btn-reverse btn-sm'>
        View
      </Link>
    </div>
  )
}

export default TicketItemCustomers
