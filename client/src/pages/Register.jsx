import { Link } from 'react-router-dom'
import Wrapper from '../assets/wrappers/RegisterAndLoginPage'
import { FormRow } from '../components'

const Register = () => {
  return (
    <Wrapper>
      <form className='form'>
        <h1 className='logo'>JOBNOTE</h1>
        <h4>Register</h4>

        <FormRow type='text' name='name' />
        <FormRow type='text' name='lastName' labelText='Last Name' />
        <FormRow type='text' name='location' />
        <FormRow type='email' name='email' />
        <FormRow type='password' name='password' />

        <button className='btn btn-block' type='submit'>
          Submit
        </button>
        <p>
          Already have an account?
          <Link to='/login' className='member-btn'>
            Login
          </Link>
        </p>
      </form>
    </Wrapper>
  )
}
export default Register
