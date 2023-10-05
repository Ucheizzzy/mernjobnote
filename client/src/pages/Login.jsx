import { Link, Form, redirect, useNavigation } from 'react-router-dom'
import Wrapper from '../assets/wrappers/RegisterAndLoginPage'
import { FormRow } from '../components'
import customFetch from '../utils/customFetch'
import { toast } from 'react-toastify'

export const action = async ({ request }) => {
  const formData = await request.formData()
  const data = Object.fromEntries(formData)
  try {
    await customFetch.post('/auth/login', data)
    toast.success('Login successful')
    return redirect('/dashboard')
  } catch (error) {
    toast.error(error?.response?.data?.msg)
    return error
  }
}
const Login = () => {
  const navigation = useNavigation()
  const isSubmitting = navigation.state === 'submitting'
  return (
    <Wrapper>
      <Form className='form' method='POST'>
        <h1 className='logo'>JOBNOTE</h1>
        <h4>Login</h4>

        <FormRow type='email' name='email' defaultValue='uche@gmail.com' />
        <FormRow type='password' name='password' defaultValue='secret' />

        <button className='btn btn-block' type='submit' disabled={isSubmitting}>
          {isSubmitting ? 'submitting...' : 'submit'}
        </button>
        <button className='btn btn-block' type='submit'>
          Explore the app
        </button>
        <p>
          Don't have an account?
          <Link to='/register' className='member-btn'>
            Register
          </Link>
        </p>
      </Form>
    </Wrapper>
  )
}
export default Login
