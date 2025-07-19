import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Spinner from './assets/Spinner'

function ThankYouPage() {
  const { customer } = useSelector((state) => state.customersAuth)

  if (!customer) {
    return <Spinner />
  }

  return (
    <>
      <div className='container'>
        <h1>Thank you, {customer.name}!</h1>
        <p className='my-1'>
          Thank you so much for your valuable feedback. It helps us improve our
          services and make our products/features better.
        </p>
        <Link to='/customers' className='link'>
          Go to Home Page
        </Link>
      </div>
    </>
  )
}

export default ThankYouPage
