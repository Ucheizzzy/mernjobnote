import Wrapper from '../assets/wrappers/BigSidebar'
import { useDashboardContext } from '../pages/DashboardLayout'
import NavLinks from './NavLinks'

const BigSlider = () => {
  const { showSidebar } = useDashboardContext()
  return (
    <Wrapper>
      <div
        className={
          showSidebar ? 'sidebar-container' : 'sidebar-container show-sidebar'
        }
      >
        <div className='context'>
          <header>
            <h3 className='logo'>JOBNOTE</h3>
          </header>
          <NavLinks isBigSidebar />
        </div>
      </div>
    </Wrapper>
  )
}
export default BigSlider
