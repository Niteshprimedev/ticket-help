import BackButton from '../../components/assets/BackButton'

function AboutPageOwners() {
  return (
    <>
      <BackButton isOwner={true}></BackButton>
      <h1 className='owner'>About Ticket Help App.</h1>
      <p className='my-1 owner'>
        Ticket Help App is here to help business owner create a page that allows
        customers to create tickets and share feedback on their
        products/features.
      </p>
      <p className='bg-color p'>Version 2.0.2</p>
    </>
  )
}

export default AboutPageOwners
