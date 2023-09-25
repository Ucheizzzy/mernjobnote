import { FaTimes } from 'react-icons/fa'
import Wrapper from '../assets/wrappers/SmallSidebar'
import { useDashboardContext } from '../pages/DashboardLayout'

import NavLinks from './NavLinks'
const SmallSlider = () => {
  const { showSidebar, toggleSidebar } = useDashboardContext()
  return (
    <Wrapper>
      <div
        className={
          showSidebar ? 'sidebar-container show-sidebar' : 'sidebar-container'
        }
      >
        <div className='content'>
          <button type='button' className='close-btn' onClick={toggleSidebar}>
            <FaTimes />
          </button>
          <header>
            <h1 className='logo'>JOBNOTE</h1>
          </header>
          <NavLinks />
        </div>
      </div>
    </Wrapper>
  )
}
export default SmallSlider
