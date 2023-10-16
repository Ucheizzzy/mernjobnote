import { Link, Form, redirect, useNavigate } from 'react-router-dom'
import Wrapper from '../assets/wrappers/RegisterAndLoginPage'
import { FormRow, SubmitBtn } from '../components'
import customFetch from '../utils/customFetch'
import { toast } from 'react-toastify'

export const action =
  (queryClient) =>
  async ({ request }) => {
    const formData = await request.formData()
    const data = Object.fromEntries(formData)
    try {
      await customFetch.post('/auth/login', data)
      queryClient.invalidateQueries()
      toast.success('Login successful')
      return redirect('/dashboard')
    } catch (error) {
      toast.error(error?.response?.data?.msg)
      return error
    }
  }
const Login = () => {
  const navigate = useNavigate()
  const loginDemoUser = async () => {
    const data = {
      email: 'test@test.com',
      password: 'secret123',
    }
    try {
      await customFetch.post(`/auth/login`, data)
      toast.success('You can test this app now')
      navigate('/dashboard')
    } catch (error) {
      toast.error(error?.response?.data?.msg)
    }
  }
  return (
    <Wrapper>
      <Form className='form' method='POST'>
        <h1 className='logo'>JOBNOTE</h1>
        <h4>Login</h4>

        <FormRow type='email' name='email' />
        <FormRow type='password' name='password' />

        <SubmitBtn />

        <button className='btn btn-block' type='button' onClick={loginDemoUser}>
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
