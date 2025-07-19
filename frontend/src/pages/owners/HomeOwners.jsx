import { Link } from 'react-router-dom'
import { FaQuestionCircle, FaTicketAlt } from 'react-icons/fa'

function HomeOwners() {
  return (
    <>
      <section className='heading owner'>
        <h1>What do you want to do?</h1>
        <p className='owner'>Please choose from an option below</p>
      </section>

      <Link to='/owners/new-ticket' className='btn btn-reverse btn-block owner'>
        <FaQuestionCircle /> Create Customer Ticket
      </Link>

      <Link to='/owners/tickets' className='btn btn-block btn-owner'>
        <FaTicketAlt /> View My Tickets
      </Link>
    </>
  )
}

export default HomeOwners
