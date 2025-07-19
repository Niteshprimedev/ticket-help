import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import {
  getMeOwner,
  saveAccountDetailsOwner,
} from '../../features/owners/auth/authSlice'
import Spinner from '../assets/Spinner'
import BackButton from '../assets/BackButton'

function Owners() {
  const { owner } = useSelector((state) => state.ownersAuth)
  const [formData, setFormData] = useState({
    name: owner.name,
    email: owner.email,
    gender: owner.gender,
    dob: owner.dob,
  })

  const { name, email, gender, dob } = formData

  const dispatch = useDispatch()

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  // NOTE: only need one useEffect here
  useEffect(() => {
    dispatch(getMeOwner())
  }, [dispatch])

  const onSubmit = (e) => {
    e.preventDefault()

    const ownerData = {
      email,
      gender,
      dob,
    }

    dispatch(saveAccountDetailsOwner(ownerData))
      .unwrap()
      .then((owner) => {
        // NOTE: by unwrapping the AsyncThunkAction we can navigate the user after
        // getting a good response from our API or catch the AsyncThunkAction
        // rejection to show an error message
        toast.success(`Your Account details updated Successfully!`)
        setFormData({
          name: owner.name,
          email: owner.email,
          gender: owner.gender,
          dob: owner.dob,
        })
      })
      .catch(toast.error)
  }

  // NOTE: no need for loading state, we can check for absence of tickets
  // If we don't have tickets we are loading, if we do have tickets we just
  // need to update the tickets with latest tickets in the background
  if (!owner) {
    return <Spinner />
  }

  return (
    <>
      <BackButton isOwner={true} />
      <h1 className='owner'>{owner ? owner.name : ''}</h1>
      <h1 className='owner'>Account Details</h1>
      <section className='form owner'>
        <div className='form-group'>
          <label htmlFor='name'>
            My Name<span className='owner'>*</span>
          </label>
          <input
            name='name'
            id='name'
            type='text'
            className='form-control'
            value={name}
            disabled
          />
        </div>
        <div className='form-group'>
          <label htmlFor='email'>
            My Email<span className='owner'>*</span>
          </label>
          <input
            type='email'
            name='email'
            id='email'
            className='form-control'
            value={email}
            disabled
          />
        </div>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <label htmlFor='gender'>Gender</label>
            <select
              name='gender'
              id='gender'
              className='form-control'
              value={gender}
              onChange={onChange}
            >
              <option value='prefernot'>Prefer Not To Say</option>
              <option value='male'>Male</option>
              <option value='female'>Female</option>
            </select>
          </div>
          <div className='form-group'>
            <label htmlFor='gender'>Date of Birth</label>
            <input
              type='date'
              name='dob'
              id='dob'
              value={dob}
              onChange={onChange}
            />
          </div>
          <div className='password'>
            <h3>Change Password.</h3>
            <Link to={`/owners/me/change-password`} className='link owner'>
              Click here
            </Link>
          </div>
          {/* <div className='form-group'>
            <button className='btn btn-block btn-reverse'>Edit</button>
          </div> */}
          <div className='form-group'>
            <button className='btn btn-block btn-owner'>Save</button>
          </div>
        </form>
      </section>
    </>
  )
}

export default Owners
