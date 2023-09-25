import Wrapper from '../assets/wrappers/Navbar'
import { FaAlignLeft } from 'react-icons/fa'
import { useDashboardContext } from '../pages/DashboardLayout'
import LogoutContainer from './LogoutContainer'
import ThemeToggle from './ThemeToggle'
import { Link } from 'react-router-dom'
const Navbar = () => {
  const { toggleSidebar } = useDashboardContext()
  return (
    <Wrapper>
      <div className='nav-center'>
        <button className='toggle-btn' type='button' onClick={toggleSidebar}>
          <FaAlignLeft />
        </button>
        <div>
          <h1 className='logo'>JOBNOTE</h1>

          <h4 className='logo-text'>Dashboard</h4>
        </div>
        <div className='btn-container'>
          <ThemeToggle />
          <LogoutContainer />
        </div>
      </div>
    </Wrapper>
  )
}
export default Navbar
