import { FaSignInAlt, FaSignOutAlt, FaUser, FaHome } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { logoutCustomer } from '../../features/customers/auth/authSlice'
import { useDispatch, useSelector } from 'react-redux'

function HeaderCustomers() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { customer } = useSelector((state) => state.customersAuth)

  const onLogout = () => {
    dispatch(logoutCustomer())
    navigate('/customers/login')
  }

  return (
    <header className='header'>
      <div className='logo'>
        <Link to='/customers'>Ticket Help</Link>
      </div>
      <div>
        {customer ? (
          <ul>
            <li>
              <button className='btn' onClick={onLogout}>
                <FaSignOutAlt /> Logout
              </button>
            </li>
            <li>
              <Link to='/customers/me'>
                <FaUser></FaUser> {customer.name}
              </Link>
            </li>
          </ul>
        ) : (
          <ul>
            <li>
              <Link to='/'>
                <FaHome /> Home
              </Link>
            </li>
            <li>
              <Link to='/customers/login'>
                <FaSignInAlt /> Login
              </Link>
            </li>
            <li>
              <Link to='/customers/register'>
                <FaUser /> Register
              </Link>
            </li>
          </ul>
        )}
      </div>
    </header>
  )
}

export default HeaderCustomers
