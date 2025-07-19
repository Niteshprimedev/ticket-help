import {
  FaSignInAlt,
  FaSignOutAlt,
  FaUser,
  FaHome,
  FaTicketAlt,
  FaStar,
} from 'react-icons/fa'

import { AiFillPlusSquare, AiOutlineInfoCircle } from 'react-icons/ai'
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
              <Link to='/customers/reviews'>
                <FaStar></FaStar> Reviews
              </Link>
            </li>
            <li>
              <Link to='/customers/tickets'>
                <FaTicketAlt></FaTicketAlt> Tickets
              </Link>
            </li>
            <li>
              <Link to='/customers/new-ticket'>
                <AiFillPlusSquare></AiFillPlusSquare> Create
              </Link>
            </li>
            <li>
              <Link to='/customers/me'>
                <FaUser></FaUser> {customer.name}
              </Link>
            </li>
            <li>
              <button className='btn' onClick={onLogout}>
                <FaSignOutAlt /> Logout
              </button>
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
              <Link to='/customers/about-us'>
                <AiOutlineInfoCircle /> About
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
