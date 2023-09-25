import { Link } from 'react-router-dom'
import Wrapper from '../assets/wrappers/RegisterAndLoginPage'
import { FormRow } from '../components'
const Login = () => {
  return (
    <Wrapper>
      <form className='form'>
        <h1 className='logo'>JOBNOTE</h1>
        <h4>Login</h4>

        <FormRow type='email' name='email' defaultValue='uche@gmail.com' />
        <FormRow type='password' name='password' defaultValue='secret' />

        <button className='btn btn-block' type='submit'>
          Submit
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
      </form>
    </Wrapper>
  )
}
export default Login
