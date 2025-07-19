import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { createCustomerTicket } from '../../features/customers/tickets/ticketSlice'
import { getCustomerProductOwners } from '../../features/customers/products/productOwnerSlice'
import BackButton from '../../components/assets/BackButton'
import { productsData } from '../../data/products'

function NewTicketCustomers() {
  const { customer } = useSelector((state) => state.customersAuth)
  const { productOwners } = useSelector((state) => state.customersProductOwners)

  const [name] = useState(customer.name)
  const [email] = useState(customer.email)
  const [product, setProduct] = useState(productsData[0].name)
  const [description, setDescription] = useState('')
  const [productOwner, setProductOwner] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleProductChange = (e) => {
    const selectedProduct = e.target.value
    setProduct(selectedProduct)
    dispatch(getCustomerProductOwners(selectedProduct))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (productOwner === '') {
      toast.error('Please select a product owner')
      return
    }

    const ticketData = {
      product,
      description,
      ownerData: {},
    }

    for (let productOwnerEl of productOwners) {
      if (productOwnerEl.hashKey === productOwner) {
        ticketData.ownerData = productOwnerEl
        break
      }
    }

    // console.log(ticketData)

    dispatch(createCustomerTicket(ticketData))
      .unwrap()
      .then(() => {
        // We got a good response so navigate the user
        navigate('/customers/tickets')
        toast.success('New ticket created!')
      })
      .catch(toast.error)
  }

  useEffect(() => {
    // Fetch product owners or any other necessary data here
    if (productOwners && productOwners.length > 0) {
      setProductOwner(productOwners[0].hashKey)
    } else {
      dispatch(getCustomerProductOwners(product))
      setProductOwner(productOwners[0]?.hashKey || '')
    }
  }, [productOwners])

  return (
    <>
      <BackButton />
      <section className='heading'>
        <h1>Create New Ticket</h1>
        <p>Please fill out the form below</p>
      </section>

      <section className='form'>
        <div className='form-group'>
          <label htmlFor='name'>Customer Name</label>
          <input type='text' className='form-control' value={name} disabled />
        </div>
        <div className='form-group'>
          <label htmlFor='email'>Customer Email</label>
          <input type='text' className='form-control' value={email} disabled />
        </div>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <label htmlFor='product'>Product</label>
            <select
              name='product'
              id='product'
              value={product}
              onChange={handleProductChange}
            >
              {productsData.map((product) => (
                <option key={product.name} value={product.name}>
                  {product.name}
                </option>
              ))}
            </select>
          </div>
          <div className='form-group'>
            <label htmlFor='product'>Please select your product owner</label>
            <select
              name='productOwner'
              id='productOwner'
              value={productOwner}
              onChange={(e) => setProductOwner(e.target.value)}
            >
              {/* <option value='iPhone'>iPhone</option>
              <option value='iPad'>iPad</option> */}
              {productOwners.map((productOwner) => (
                <option key={productOwner.hashKey} value={productOwner.hashKey}>
                  {productOwner.hashKey}
                </option>
              ))}
            </select>
          </div>
          <div className='form-group'>
            <label htmlFor='description'>Description of the issue</label>
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
            <button className='btn btn-block'>Submit</button>
          </div>
        </form>
      </section>
    </>
  )
}

export default NewTicketCustomers
