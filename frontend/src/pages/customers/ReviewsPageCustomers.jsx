import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getCustomerReviewFeedbacks } from '../../features/customers/feedbacks/feedbackSlice'
import BackButton from '../../components/assets/BackButton'
import Spinner from '../../components/assets/Spinner'
import FeedbackItemCustomers from '../../components/customers/FeedbackItemCustomers'

function ReviewsPageCustomers() {
  const { feedbacks } = useSelector((state) => state.customersFeedbacks)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getCustomerReviewFeedbacks())
  }, [dispatch])

  if (feedbacks.length === 0) {
    return <Spinner />
  }

  return (
    <div>
      <BackButton isOwner={false} />
      <h1>Reviews</h1>
      <div className='container'>
        {feedbacks.map((feedbackItem) => (
          <FeedbackItemCustomers
            key={feedbackItem.addedBy + feedbackItem.feedbackMsg}
            feedback={feedbackItem}
            isFeedbackGiven={true}
            ticketId={null}
            isReviewPage={true}
          ></FeedbackItemCustomers>
        ))}
      </div>
    </div>
  )
}

export default ReviewsPageCustomers
