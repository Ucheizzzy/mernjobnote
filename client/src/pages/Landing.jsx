import { Link } from 'react-router-dom'
import Wrapper from '../assets/wrappers/LandingPage'
import main from '../assets/images/joblane.svg'
const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <h1>JOBNOTE</h1>
      </nav>
      <div className='container page'>
        {/* info */}
        <div className='info'>
          <h1>
            Job <span>Noting</span> app
          </h1>
          <p>
            Do you know that you can get disqualified for a job that you are
            qualified for simply by applying twice for it? Yes you can and maybe
            that is why you did not hear from them. Jobnote is a comprehensive
            job noting application used by applicants to track their job
            application and interview process.
          </p>
          {/* come back to this for conditional rendering */}
          <Link to='/register' className='btn register-link'>
            Register
          </Link>
          <Link to='/login' className='btn'>
            Login
          </Link>
        </div>

        <img src={main} alt='job note' className='img main-img' />
      </div>
    </Wrapper>
  )
}
export default Landing
