import { useState } from 'react'
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import { FaSignInAlt } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { loginCustomer } from '../../features/customers/auth/authSlice'
import Spinner from '../../components/assets/Spinner'

function LoginCustomers() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const { email, password } = formData

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { isLoading } = useSelector((state) => state.customersAuth)

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

    const customerData = {
      email,
      password,
    }

    dispatch(loginCustomer(customerData))
      .unwrap()
      .then((customer) => {
        // NOTE: by unwrapping the AsyncThunkAction we can navigate the user after
        // getting a good response from our API or catch the AsyncThunkAction
        // rejection to show an error message
        setFormData((prevState) => ({
          ...prevState,
          email: '',
          password: '',
        }))
        toast.success(`Logged in as ${customer.name}`)
        navigate('/customers')
      })
      .catch(toast.error)
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className='heading'>
        <h1>
          <FaSignInAlt /> Login
        </h1>
        <p>Please log in to get support</p>
      </section>

      <section className='form'>
        <form onSubmit={onSubmit}>
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
            <button className='btn btn-block'>Submit</button>
          </div>
        </form>
      </section>
      <section>
        <div className='my'>
          <span className='my'>Don't have an account?</span>{' '}
          <Link to='/customers/register' className='link'>
            Register
          </Link>
        </div>
        <div class='demo-text'>
          <p>Try App Demo: </p>
          <p>Email: customer123@gmail.com</p>
          <p>Password: customer123@</p>
        </div>
      </section>
    </>
  )
}

export default LoginCustomers
