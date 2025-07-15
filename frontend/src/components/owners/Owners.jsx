import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getOwnerTickets } from '../../features/owners/tickets/ticketSlice'
import Spinner from '../assets/Spinner'
import BackButton from '../assets/BackButton'
import TicketItemOwners from './TicketItemOwners'

function Owners() {
  const { tickets } = useSelector((state) => state.ownersTickets)
  const { owner } = useSelector((state) => state.ownersAuth)

  const dispatch = useDispatch()

  // NOTE: only need one useEffect here

  useEffect(() => {
    dispatch(getOwnerTickets())
  }, [dispatch])

  // NOTE: no need for loading state, we can check for absence of tickets
  // If we don't have tickets we are loading, if we do have tickets we just
  // need to update the tickets with latest tickets in the background
  if (!tickets) {
    return <Spinner />
  }

  return (
    <>
      <BackButton isOwner={true} />
      <h1 className='owner'>{owner ? owner.name : ''}</h1>
      <h1 className='owner'>Tickets</h1>
      <div className='tickets owner'>
        <div className='ticket-headings'>
          <div>Date</div>
          <div>Product</div>
          <div>Status</div>
          <div></div>
        </div>
        {tickets.map((ticket) => (
          <TicketItemOwners key={ticket._id} ticket={ticket} />
        ))}
      </div>
    </>
  )
}

export default Owners
