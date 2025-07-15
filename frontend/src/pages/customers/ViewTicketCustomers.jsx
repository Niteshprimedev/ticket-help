import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getCustomerTickets } from '../../features/customers/tickets/ticketSlice'
import Spinner from '../../components/assets/Spinner'
import BackButton from '../../components/assets/BackButton'
import TicketItemCustomers from '../../components/customers/TicketItemCustomers'

function ViewTicketCustomers() {
  const { tickets } = useSelector((state) => state.customersTickets)

  const dispatch = useDispatch()

  // NOTE: only need one useEffect here

  useEffect(() => {
    dispatch(getCustomerTickets())
  }, [dispatch])

  // NOTE: no need for loading state, we can check for absence of tickets
  // If we don't have tickets we are loading, if we do have tickets we just
  // need to update the tickets with latest tickets in the background
  if (!tickets) {
    return <Spinner />
  }

  return (
    <>
      <BackButton />
      <h1>Tickets</h1>
      <div className='tickets'>
        <div className='ticket-headings'>
          <div>Date</div>
          <div>Product</div>
          <div>Status</div>
          <div></div>
        </div>
        {tickets.map((ticket) => (
          <TicketItemCustomers key={ticket._id} ticket={ticket} />
        ))}
      </div>
    </>
  )
}

export default ViewTicketCustomers
