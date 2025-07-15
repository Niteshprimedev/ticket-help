import { FiUsers } from 'react-icons/fi'
import { MdPeopleOutline } from 'react-icons/md'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'

function HeaderHome() {
  const navigate = useNavigate()
  const { customer } = useSelector((state) => state.customersAuth)
  const { owner } = useSelector((state) => state.ownersAuth)

  useEffect(() => {
    if (owner) {
      navigate('/owners')
    } else if (customer) {
      navigate('/customers')
    }
  }, [])

  return (
    <header className='header'>
      <div className='logo'>
        <Link to='/'>Ticket Help</Link>
      </div>
      <div>
        <ul>
          <li>
            <Link to='/owners' className='owner'>
              <MdPeopleOutline /> Owner
            </Link>
          </li>
          <li>
            <Link to='/customers'>
              <FiUsers /> Customers
            </Link>
          </li>
        </ul>
      </div>
    </header>
  )
}

export default HeaderHome
