import { useState } from 'react'
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import { FaSignInAlt } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { loginOwner } from '../../features/owners/auth/authSlice'
import Spinner from '../../components/assets/Spinner'

function LoginOwners() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const { email, password } = formData

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

    const ownerData = {
      email,
      password,
    }

    dispatch(loginOwner(ownerData))
      .unwrap()
      .then((owner) => {
        // NOTE: by unwrapping the AsyncThunkAction we can navigate the user after
        // getting a good response from our API or catch the AsyncThunkAction
        // rejection to show an error message
        setFormData((prevState) => ({
          ...prevState,
          email: '',
          password: '',
        }))
        toast.success(`Logged in as ${owner.name}`)
        navigate('/owners')
      })
      .catch(toast.error)
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className='heading owner'>
        <h1>
          <FaSignInAlt /> Login
        </h1>
        <p className='owner'>Please log in to get support</p>
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
            <button className='btn btn-block btn-owner'>Submit</button>
          </div>
        </form>
      </section>
      <section>
        <div className='my owner'>
          <span className='my owner'>Don't have an account?</span>{' '}
          <Link to='/owners/register' className='link owner'>
            Register
          </Link>
        </div>
        <div class='demo-text owner'>
          <p>Try App Demo: </p>
          <p>Email: owner123@gmail.com</p>
          <p>Password: owner123@</p>
        </div>
      </section>
    </>
  )
}

export default LoginOwners
