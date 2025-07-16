import { Link } from 'react-router-dom'

function ProductItemOwners({ product }) {
  const { _id, createdAt, name } = product

  return (
    <div className='ticket owner'>
      <div>{new Date(createdAt).toLocaleString('en-US')}</div>
      <div>{name}</div>
      {/* <div className={`status status-${status}`}>{status}</div> */}
      <Link
        to={`/owners/ticket/${_id}`}
        className='btn btn-reverse btn-sm owner'
      >
        View
      </Link>
    </div>
  )
}

export default ProductItemOwners
