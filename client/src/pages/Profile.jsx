import { Form, useNavigation, useOutletContext } from 'react-router-dom'
import Wrapper from '../assets/wrappers/DashboardFormPage'
import { FormRow } from '../components'
import customFetch from '../utils/customFetch'
import { toast } from 'react-toastify'

export const action = async ({ request }) => {
  const formData = await request.formData()
  const file = formData.get(avatar)
  //we will not always want to update the file that is why we use file && file.size
  if (file && file.size > 50000) {
    toast.error('image size is too large')
    return null
  }
  try {
    await customFetch.patch('/users/update-user', formData)
    toast.success('profile updated successfully')
  } catch (error) {
    toast.error(error?.response?.data?.msg)
  }
  return null
}
const Profile = () => {
  const { user } = useOutletContext()
  const navigation = useNavigation()
  const isSubmitting = navigation.state === 'submitting'
  return (
    <Wrapper>
      <Form className='form' method='POST' encType='multipart/form-data'>
        <h4 className='form-title'>Profile</h4>

        <div className='form-center'>
          <div className='form-row'>
            <label htmlFor='avatar' className='form-label'>
              Select an image (max 0.5mb)
            </label>
            <input
              type='file'
              id='avatar'
              name='avatar'
              className='form-input'
              accept='image/*'
            />
          </div>

          <FormRow type='text' name='name' defaultValue={user.name} />
          <FormRow
            type='text'
            labelText='last name'
            name='lastName'
            defaultValue={user.lastName}
          />
          <FormRow type='email' name='email' defaultValue={user.email} />
          <FormRow
            type='location'
            name='location'
            defaultValue={user.location}
          />

          <button
            type='submit'
            className='btn btn-block form-btn'
            disabled={isSubmitting}
          >
            {isSubmitting ? 'submitting...' : 'save changes'}
          </button>
        </div>
      </Form>
    </Wrapper>
  )
}
export default Profile
