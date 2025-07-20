import { FaTimes, FaStar } from 'react-icons/fa'
import { Link } from 'react-router-dom'

function FeedbackItemCustomers({
  feedback,
  isFeedbackGiven,
  ticketId,
  isReviewPage,
}) {
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

  const { feedbackMsg, rating } = feedback

  const ratingStars = rating === 1 ? rating + 1 : rating

  const feedbackStars = []

  for (let idx = 0; idx < Math.floor(ratingStars / 2); idx++) {
    feedbackStars.push(idx + 1)
  }

  let ratingWord = ''

  if (isReviewPage && feedback.averageRating < 4) {
    ratingWord = 'an average'
  } else if (isReviewPage && feedback.averageRating < 8) {
    ratingWord = 'a good'
  } else {
    ratingWord = 'an excellent'
  }

  return (
    <div className={isReviewPage ? 'feedback text-center' : 'feedback'}>
      {!isReviewPage && (
        <button className='feedback-close'>
          <FaTimes color='darkred'></FaTimes>
        </button>
      )}
      {isReviewPage ? (
        <>
          <h4>
            Customers Review for <span>{feedback.ownerName}</span> services
          </h4>
          <p>
            The {feedback.ownerName} has got <strong>{ratingWord}</strong>{' '}
            rating for his services by{' '}
            <strong>{feedback.totalCustomers}</strong>+ customers.
          </p>
        </>
      ) : (
        <>
          <h4>Review from Me</h4>
          <p>{feedbackMsg}</p>
        </>
      )}

      <div
        className={
          isReviewPage ? 'feedback-rating flex-center' : 'feedback-rating'
        }
      >
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
