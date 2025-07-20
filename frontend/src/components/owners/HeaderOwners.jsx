import {
  FaSignInAlt,
  FaSignOutAlt,
  FaUser,
  FaHome,
  FaShoppingCart,
  FaTicketAlt,
} from 'react-icons/fa'
import { AiOutlineInfoCircle, AiFillPlusSquare } from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom'
import { logoutOwner } from '../../features/owners/auth/authSlice'
import { useDispatch, useSelector } from 'react-redux'

function HeaderOwners() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { owner } = useSelector((state) => state.ownersAuth)

  const onLogout = () => {
    dispatch(logoutOwner())
    navigate('/owners/login')
  }

  return (
    <header className='header'>
      <div className='logo'>
        <Link to='/owners' className='owner'>
          Ticket Help
        </Link>
      </div>
      <div>
        {owner ? (
          <ul>
            <li>
              <Link to='/owners/products' className='owner'>
                <FaShoppingCart></FaShoppingCart> Products
              </Link>
            </li>
            <li>
              <Link to='/owners/tickets' className='owner'>
                <FaTicketAlt></FaTicketAlt> Tickets
              </Link>
            </li>
            <li>
              <Link to='/owners/new-ticket' className='owner'>
                <AiFillPlusSquare></AiFillPlusSquare> Create
              </Link>
            </li>
            <li>
              <Link to='/owners/me' className='owner'>
                <FaUser></FaUser> {owner.name}
              </Link>
            </li>
            <li>
              <button className='btn btn-owner' onClick={onLogout}>
                <FaSignOutAlt /> Logout
              </button>
            </li>
          </ul>
        ) : (
          <ul>
            <li>
              <Link to='/' className='owner'>
                <FaHome /> Home
              </Link>
            </li>
            <li>
              <Link to='/owners/about-us' className='owner'>
                <AiOutlineInfoCircle /> About
              </Link>
            </li>
            <li>
              <Link to='/owners/login' className='owner'>
                <FaSignInAlt /> Login
              </Link>
            </li>
            <li>
              <Link to='/owners/register' className='owner'>
                <FaUser /> Register
              </Link>
            </li>
          </ul>
        )}
      </div>
    </header>
  )
}

export default HeaderOwners
