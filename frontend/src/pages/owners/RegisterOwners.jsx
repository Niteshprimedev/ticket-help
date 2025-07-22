import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaUser } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { registerOwner } from '../../features/owners/auth/authSlice'
import Spinner from '../../components/assets/Spinner'
import ProductsChecklist from './ProductsCheckList'

function RegisterOwners() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [selectedProducts, setSelectedProducts] = useState([])

  const { name, email, password, confirmPassword } = formData

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { isLoading } = useSelector((state) => state.ownersAuth)

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  // NOTE: no need for useEffect here as we can catch the
  // AsyncThunkAction rejection in our onSubmit or redirect them on the
  // resolution
  // Side effects shoulld go in event handlers where possible
  // source: - https://beta.reactjs.org/learn/keeping-components-pure#where-you-can-cause-side-effects

  const onSubmit = (e) => {
    e.preventDefault()

    if (selectedProducts.length === 0) {
      toast.error('Please select at least one product')
    } else if (password !== confirmPassword) {
      toast.error('Passwords do not match')
    } else {
      const ownerData = {
        name,
        email,
        password,
        products: selectedProducts,
      }

      dispatch(registerOwner(ownerData))
        .unwrap()
        .then((owner) => {
          // NOTE: by unwrapping the AsyncThunkAction we can navigate the user after
          // getting a good response from our API or catch the AsyncThunkAction
          // rejection to show an error message
          setFormData((prevState) => ({
            ...prevState,
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
          }))
          toast.success(`Registered new user - ${owner.name}`)
          navigate('/owners')
        })
        .catch(toast.error)
    }
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className='heading owner'>
        <h1>
          <FaUser /> Register
        </h1>
        <p className='owner'>Please create an account</p>
      </section>

      <section className='form'>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <input
              type='text'
              className='form-control'
              id='name'
              name='name'
              value={name}
              onChange={onChange}
              placeholder='Enter your name'
              required
            />
          </div>
          <div className='form-group'>
            <input
              type='email'
              className='form-control'
              id='email'
              name='email'
              value={email}
              onChange={onChange}
              placeholder='Enter your email'
              required
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              className='form-control'
              id='password'
              name='password'
              value={password}
              onChange={onChange}
              placeholder='Enter password'
              required
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              className='form-control'
              id='confirmPassword'
              name='confirmPassword'
              value={confirmPassword}
              onChange={onChange}
              placeholder='Confirm password'
              required
            />
          </div>
          <div className='form-group'>
            <ProductsChecklist
              selectedProducts={selectedProducts}
              setSelectedProducts={setSelectedProducts}
            ></ProductsChecklist>
          </div>
          <div className='form-group'>
            <button className='btn btn-block btn-owner'>Submit</button>
          </div>
        </form>
      </section>
      <section>
        <div className='my-1 owner'>
          <span className='my owner'>Already have an account?</span>{' '}
          <Link to='/owners/login' className='link owner'>
            Login
          </Link>
        </div>
      </section>
    </>
  )
}

export default RegisterOwners
