import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import Modal from 'react-modal'
import { FaPlus } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import {
  getCustomerSingleTicket,
  closeCustomerTicket,
} from '../../features/customers/tickets/ticketSlice'
import {
  getCustomerTicketNotes,
  createCustomerTicketNote,
} from '../../features/customers/notes/noteSlice'
import {
  getCustomerTicketFeedback,
  createCustomerTicketFeedback,
} from '../../features/customers/feedbacks/feedbackSlice'
import { useParams, useNavigate } from 'react-router-dom'
import BackButton from '../../components/assets/BackButton'
import Spinner from '../../components/assets/Spinner'
import NoteItemCustomers from '../../components/customers/NoteItemCustomers'
import FeedbackItemCustomers from '../../components/customers/FeedbackItemCustomers'

const customStyles = {
  content: {
    width: '600px',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    position: 'relative',
  },
}

Modal.setAppElement('#root')

function ReviewsPageCustomers() {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [noteContent, setNoteContent] = useState('')
  const { ticket } = useSelector((state) => state.customersTickets)

  const { customer } = useSelector((state) => state.customersAuth)

  const { notes } = useSelector((state) => state.customersNotes)

  const { feedback } = useSelector((state) => state.customersFeedback)

  // NOTE: no need for two useParams
  // const params = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { ticketId } = useParams()

  // Close ticket
  const onTicketClose = () => {
    // const feedbackData = {
    //   feedbackMsg: 'This is a test feedback msg',
    //   rating: 7,
    // }

    // dispatch(createCustomerTicketFeedback({ feedbackData, ticketId }))
    // NOTE: we can unwrap our AsyncThunkACtion here so no need for isError and
    // isSuccess state
    dispatch(closeCustomerTicket(ticketId))
      .unwrap()
      .then(() => {
        toast.success('Ticket Closed')
        navigate('/customers/tickets')
      })
      .catch(toast.error)
  }

  // Create note submit
  const onNoteSubmit = (e) => {
    // NOTE: we can unwrap our AsyncThunkACtion here so no need for isError and
    // isSuccess state
    e.preventDefault()

    dispatch(createCustomerTicketNote({ noteContent, ticketId }))
      .unwrap()
      .then(() => {
        setNoteContent('')
        closeModal()
      })
      .catch(toast.error)
  }

  // Open/close modal
  const openModal = () => setModalIsOpen(true)
  const closeModal = () => setModalIsOpen(false)

  // if (!ticket) {
  //   return <Spinner />
  // }

  return (
    <div className='ticket-page'>
      <header className='ticket-header'>
        <BackButton />
        <h1>Reviews Page in progress....</h1>
        {/* <h2>
          Ticket ID: {ticket._id}
          <span className={`status status-${ticket.status}`}>
            {ticket.status}
          </span>
        </h2>
        <h3>username: {customer.name}</h3>
        <h3>
          Date Submitted: {new Date(ticket.createdAt).toLocaleString('en-US')}
        </h3>
        <h3>Product: {ticket.product}</h3>
        <h3>Creatd By: {ticket.createdBy}</h3>
        <hr />
        <div className='ticket-desc'>
          <h3>Description of Issue</h3>
          <p>{ticket.description}</p>
        </div> */}
      </header>
    </div>
  )
}

export default ReviewsPageCustomers
