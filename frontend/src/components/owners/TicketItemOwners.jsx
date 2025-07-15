import { Link } from 'react-router-dom'

function TicketItemOwners({ ticket }) {
  const { _id, createdAt, product, status } = ticket

  return (
    <div className='ticket owner'>
      <div>{new Date(createdAt).toLocaleString('en-US')}</div>
      <div>{product}</div>
      <div className={`status status-${status}`}>{status}</div>
      <Link
        to={`/owners/ticket/${_id}`}
        className='btn btn-reverse btn-sm owner'
      >
        View
      </Link>
    </div>
  )
}

export default TicketItemOwners
