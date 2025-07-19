import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { changePasswordOwner } from '../../features/owners/auth/authSlice'
import Spinner from '../../components/assets/Spinner'
import BackButton from '../../components/assets/BackButton'

function ChangePasswordOwners() {
  const { owner } = useSelector((state) => state.ownersAuth)
  const [formData, setFormData] = useState({
    oldPassword: '',
    password: '',
    confirmPassword: '',
  })

  const { oldPassword, password, confirmPassword } = formData

  const dispatch = useDispatch()

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (password.length < 8) {
      toast.error('Password should be at least 8 characters long')
    } else if (password !== confirmPassword) {
      toast.error('New and Confirm Passwords do not match')
    } else if (oldPassword === password) {
      toast.error('Current and New Passwords should not be same')
    } else {
      const ownerData = {
        oldPassword,
        password,
      }

      dispatch(changePasswordOwner(ownerData))
        .unwrap()
        .then((owner) => {
          // NOTE: by unwrapping the AsyncThunkAction we can navigate the user after
          // getting a good response from our API or catch the AsyncThunkAction
          // rejection to show an error message
          setFormData((prevState) => ({
            ...prevState,
            oldPassword: '',
            password: '',
            confirmPassword: '',
          }))
          toast.success(`Your Password Changed Successfully!`)
        })
        .catch(toast.error)
    }
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
      <h1 className='owner'>Change Password</h1>
      <section className='form owner'>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <label htmlFor='oldPassword'>
              Current Password<span className='owner'>*</span>
            </label>
            <input
              type='password'
              className='form-control'
              id='oldPassword'
              name='oldPassword'
              value={oldPassword}
              onChange={onChange}
              placeholder='Enter your current password'
              required
            />
          </div>
          <div className='form-group'>
            <label htmlFor='password'>
              New Password<span className='owner'>*</span>
            </label>
            <input
              type='password'
              className='form-control'
              id='password'
              name='password'
              value={password}
              onChange={onChange}
              placeholder='Enter your new password'
              required
            />
          </div>
          <div className='form-group'>
            <label htmlFor='confirmPassword'>
              Confirm New Password<span className='owner'>*</span>
            </label>
            <input
              type='password'
              className='form-control'
              id='confirmPassword'
              name='confirmPassword'
              value={confirmPassword}
              onChange={onChange}
              placeholder='Confirm your new password'
              required
            />
          </div>
          <div className='form-group'>
            <button className='btn btn-block btn-owner'>Update Password</button>
          </div>
        </form>
      </section>
    </>
  )
}

export default ChangePasswordOwners
