import { Link, Form, redirect } from 'react-router-dom'
import Wrapper from '../assets/wrappers/RegisterAndLoginPage'
import { FormRow, SubmitBtn } from '../components'
import customFetch from '../utils/customFetch'
import { toast } from 'react-toastify'

export const action = async ({ request }) => {
  const formData = await request.formData()
  const data = Object.fromEntries(formData)
  try {
    await customFetch.post('/auth/register', data)
    toast.success('Register successful, Login now')
    return redirect('/login')
  } catch (error) {
    toast.error(error?.response?.data?.msg)
    return error
  }
}

const Register = () => {
  return (
    <Wrapper>
      <Form className='form' method='post'>
        <h1 className='logo'>JOBNOTE</h1>
        <h4>Register</h4>

        <FormRow type='text' name='name' />
        <FormRow type='text' name='lastName' labelText='Last Name' />
        <FormRow type='text' name='location' />
        <FormRow type='email' name='email' />
        <FormRow type='password' name='password' />

        <SubmitBtn />
        <p>
          Already have an account?
          <Link to='/login' className='member-btn'>
            Login
          </Link>
        </p>
      </Form>
    </Wrapper>
  )
}
export default Register
