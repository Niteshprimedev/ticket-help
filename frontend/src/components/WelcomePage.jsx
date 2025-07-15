import { Link } from 'react-router-dom'
import { FiUsers } from 'react-icons/fi'
import { MdPeopleOutline } from 'react-icons/md'

function WelcomePage() {
  return (
    <div>
      <section className='heading'>
        <h1>Ticket Help</h1>
        <p>Please choose an option below</p>
      </section>
      <section className='welcome-page'>
        <Link to='/owners' className='btn btn-owner'>
          <MdPeopleOutline></MdPeopleOutline> Owner
        </Link>
        <Link to='/customers' className='btn'>
          <FiUsers></FiUsers> Customers
        </Link>
      </section>
    </div>
  )
}

export default WelcomePage
