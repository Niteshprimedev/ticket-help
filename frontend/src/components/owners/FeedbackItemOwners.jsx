import { FaStar } from 'react-icons/fa'

function FeedbackItemOwners({ feedback }) {
  const { feedbackMsg, rating, addedBy } = feedback

  const ratingStars = rating === 1 ? rating + 1 : rating

  const feedbackStars = []

  for (let idx = 0; idx < Math.floor(ratingStars / 2); idx++) {
    feedbackStars.push(idx + 1)
  }

  return (
    <div className='feedback owner'>
      <h4>
        Review from <span>{addedBy}</span>
      </h4>
      <p>{feedbackMsg}</p>
      <div className='feedback-rating'>
        <p className='rating owner'>{rating.toFixed(1)}</p>
        <div className='icons'>
          {feedbackStars.map((feedbackStar) => (
            <FaStar key={feedbackStar} color='darkgoldenrod'></FaStar>
          ))}
        </div>
      </div>
    </div>
  )
}

export default FeedbackItemOwners
