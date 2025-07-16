import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { createOwnerTicket } from '../../features/owners/tickets/ticketSlice'
import { getOwnerProducts } from '../../features/owners/products/productSlice'
import BackButton from '../../components/assets/BackButton'

function NewTicketOwners() {
  const { owner } = useSelector((state) => state.ownersAuth)
  const { products } = useSelector((state) => state.ownersProducts)

  const [name] = useState(owner.name)
  const [email] = useState(owner.email)
  const [customerName, setCustomerName] = useState('')
  const [customerEmail, setCustomerEmail] = useState('')
  const [product, setProduct] = useState('iPhone')
  const [description, setDescription] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(
      createOwnerTicket({ customerName, customerEmail, product, description })
    )
      .unwrap()
      .then(() => {
        // We got a good response so navigate the user
        navigate('/owners/tickets')
        toast.success('New ticket created!')
      })
      .catch(toast.error)
  }

  // side effects;
  useEffect(() => {
    dispatch(getOwnerProducts())
  }, [])

  return (
    <>
      <BackButton isOwner={true} />
      <section className='heading owner'>
        <h1>Create New Ticket</h1>
        <p className='owner'>Please fill out the form below</p>
      </section>

      <section className='form owner'>
        <div className='form-group'>
          <label htmlFor='name'>Customer Name</label>
          <input type='text' className='form-control' value={name} disabled />
        </div>
        <div className='form-group'>
          <label htmlFor='email'>Customer Email</label>
          <input type='email' className='form-control' value={email} disabled />
        </div>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <label htmlFor='customerName'>
              Customer Name<span className='owner'>*</span>
            </label>
            <input
              type='text'
              name='customerName'
              className='form-control'
              value={customerName}
              placeholder='Please enter customer name'
              onChange={(e) => setCustomerName(e.target.value)}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='customerEmail'>
              Customer Email<span className='owner'>*</span>
            </label>
            <input
              name='customerEmail'
              type='email'
              className='form-control'
              value={customerEmail}
              placeholder='Please enter customer email'
              onChange={(e) => setCustomerEmail(e.target.value)}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='product'>
              Product<span className='owner'>*</span>
            </label>
            <select
              name='product'
              id='product'
              value={product}
              onChange={(e) => setProduct(e.target.value)}
            >
              {/* <option value='iPhone'>iPhone</option>
              <option value='iPad'>iPad</option> */}
              {products.map((product) => (
                <option value={product.name}>{product.name}</option>
              ))}
            </select>
          </div>
          <div className='form-group'>
            <label htmlFor='description'>
              Description of the issue<span className='owner'>*</span>
            </label>
            <textarea
              name='description'
              id='description'
              className='form-control'
              placeholder='Description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div className='form-group'>
            <button className='btn btn-block btn-owner'>Submit</button>
          </div>
        </form>
      </section>
    </>
  )
}

export default NewTicketOwners
