import { FaSignInAlt, FaSignOutAlt, FaUser, FaHome } from 'react-icons/fa'
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
              <button className='btn btn-owner' onClick={onLogout}>
                <FaSignOutAlt /> Logout
              </button>
            </li>
            <li>
              <Link to='/owners/me' className='owner'>
                <FaUser></FaUser> {owner.name}
              </Link>
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
