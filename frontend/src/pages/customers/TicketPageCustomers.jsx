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

function TicketsPageCustomers() {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [noteContent, setNoteContent] = useState('')
  const { ticket } = useSelector((state) => state.customersTickets)

  const { customer } = useSelector((state) => state.customersAuth)

  const { notes } = useSelector((state) => state.customersNotes)

  const { feedback } = useSelector((state) => state.customersFeedbacks)

  // NOTE: no need for two useParams
  // const params = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { ticketId } = useParams()

  useEffect(() => {
    dispatch(getCustomerSingleTicket(ticketId)).unwrap().catch(toast.error)
    dispatch(getCustomerTicketNotes(ticketId)).unwrap().catch(toast.error)
    dispatch(getCustomerTicketFeedback(ticketId)).unwrap().catch(toast.error)
  }, [ticketId, dispatch])

  // Close ticket
  const onTicketClose = () => {
    if (!window.confirm('Are you sure you want to close this ticket?')) {
      return
    }

    // NOTE: we can unwrap our AsyncThunkACtion here so no need for isError and
    // isSuccess state
    dispatch(closeCustomerTicket(ticketId))
      .unwrap()
      .then(() => {
        toast.success('Ticket Closed')
        navigate(`/customers/ticket/${ticketId}/feedback-page`)
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

  if (!ticket) {
    return <Spinner />
  }

  return (
    <div className='ticket-page'>
      <header className='ticket-header'>
        <BackButton />
        <h2>
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
        <h3>
          Creatd By:{' '}
          {ticket.createdBy === customer.name ? 'Me' : ticket.createdBy}
        </h3>
        <hr />
        <div className='ticket-desc'>
          <h3>Description of Issue</h3>
          <p>{ticket.description}</p>
        </div>
        <h2>Notes</h2>
      </header>

      {ticket.status !== 'closed' && (
        <button onClick={openModal} className='btn'>
          <FaPlus /> Add Note
        </button>
      )}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel='Add Note'
      >
        <h2>Add Note</h2>
        <button className='btn-close' onClick={closeModal}>
          X
        </button>
        <form onSubmit={onNoteSubmit}>
          <div className='form-group'>
            <textarea
              name='noteContent'
              id='noteContent'
              className='form-control'
              placeholder='Note text'
              value={noteContent}
              onChange={(e) => setNoteContent(e.target.value)}
            ></textarea>
          </div>
          <div className='form-group'>
            <button className='btn' type='submit'>
              Submit
            </button>
          </div>
        </form>
      </Modal>

      {notes ? (
        notes.map((note) => <NoteItemCustomers key={note._id} note={note} />)
      ) : (
        <Spinner />
      )}

      {ticket.status === 'closed' &&
        (feedback ? (
          <>
            <hr />
            <FeedbackItemCustomers
              feedback={feedback}
              isFeedbackGiven={true}
              ticketId={ticketId}
            />
          </>
        ) : (
          <FeedbackItemCustomers
            feedback={feedback}
            isFeedbackGiven={false}
            ticketId={ticketId}
          />
        ))}

      {ticket.status !== 'closed' && (
        <button onClick={onTicketClose} className='btn btn-block btn-danger'>
          Close Ticket
        </button>
      )}
    </div>
  )
}

export default TicketsPageCustomers
