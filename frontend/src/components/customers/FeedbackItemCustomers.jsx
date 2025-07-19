import { FaTimes, FaStar } from 'react-icons/fa'
import { Link } from 'react-router-dom'

function FeedbackItemCustomers({ feedback, isFeedbackGiven, ticketId }) {
  if (!isFeedbackGiven) {
    return (
      <div className='feedback'>
        <p>Please take out 2 minutes to provide your valuable feedback.</p>
        <div className='feedback-rating'>
          <Link to={`/customers/ticket/${ticketId}/feedback-page`}>
            Click here
          </Link>
        </div>
      </div>
    )
  }

  const { feedbackMsg, rating, addedBy } = feedback

  const ratingStars = rating === 1 ? rating + 1 : rating

  const feedbackStars = []

  for (let idx = 0; idx < Math.floor(ratingStars / 2); idx++) {
    feedbackStars.push(idx + 1)
  }

  return (
    <div className='feedback'>
      <button className='feedback-close'>
        <FaTimes color='darkred'></FaTimes>
      </button>
      <h4>
        Review from <span>{addedBy}</span>
      </h4>
      <p>{feedbackMsg}</p>
      <div className='feedback-rating'>
        <p className='rating'>{rating.toFixed(1)}</p>
        <div className='icons'>
          {feedbackStars.map((feedbackStar) => (
            <FaStar key={feedbackStar} color='darkgoldenrod'></FaStar>
          ))}
        </div>
      </div>
    </div>
  )
}

export default FeedbackItemCustomers
