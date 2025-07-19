import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import { getCustomerSingleTicket } from '../../features/customers/tickets/ticketSlice'
import { createCustomerTicketFeedback } from '../../features/customers/feedbacks/feedbackSlice'
import { useParams, useNavigate } from 'react-router-dom'
import BackButton from '../../components/assets/BackButton'
import Spinner from '../../components/assets/Spinner'
import FeedbackRatingSelectCustomers from '../../pages/customers/FeedbackRatingSelectCustomers'

function FeedbackPageCustomers() {
  const [feedbackMsg, setFeedbackMsg] = useState('')
  const [rating, setRating] = useState(10)

  const { ticket } = useSelector((state) => state.customersTickets)

  // NOTE: no need for two useParams
  // const params = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { ticketId } = useParams()

  useEffect(() => {
    dispatch(getCustomerSingleTicket(ticketId)).unwrap().catch(toast.error)
  }, [ticketId, dispatch])

  const handleInputChange = (e) => {
    setFeedbackMsg(e.target.value)
  }

  const handleFeedbackSubmission = (e) => {
    e.preventDefault()

    if (feedbackMsg.trim().length < 10) {
      toast.error('Please add your valuable feedback of at least 10 characters')
      return
    } else {
      const feedbackData = {
        feedbackMsg: feedbackMsg,
        rating: rating,
      }

      // NOTE: we can unwrap our AsyncThunkACtion here so no need for isError and
      // isSuccess state
      dispatch(createCustomerTicketFeedback({ feedbackData, ticketId }))
        .unwrap()
        .then(() => {
          setRating(10)
          setFeedbackMsg('')
          navigate('/customers/feedback/thank-you')
        })
        .catch(toast.error)
    }
  }

  if (!ticket) {
    return <Spinner />
  }

  return (
    <div>
      <BackButton />
      <h2>Please give your feedback for ticket id: </h2>
      <h2>{ticket._id}</h2>
      <div className='feedback-form'>
        <form action='' onSubmit={handleFeedbackSubmission}>
          <h2>How would you rate our service?</h2>
          <FeedbackRatingSelectCustomers
            selectRating={setRating}
            selectedRating={rating}
          ></FeedbackRatingSelectCustomers>
          <div className='form-group'>
            <input
              type='text'
              name='feedback'
              id='feedback'
              placeholder='Write a review*'
              onChange={handleInputChange}
            />
            <button type='submit' className='btn btn-block'>
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default FeedbackPageCustomers
