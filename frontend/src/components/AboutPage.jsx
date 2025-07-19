import BackButton from './assets/BackButton'

function AboutPage() {
  return (
    <>
      <BackButton isOwner={false}></BackButton>
      <h1>About Ticket Help App.</h1>
      <p className='my-1'>
        Ticket Help App is here to help business owner create a page that allows
        customers to create tickets and share feedback on their
        products/features.
      </p>
      <p className='bg-dark p'>Version 2.0.2</p>
    </>
  )
}

export default AboutPage
