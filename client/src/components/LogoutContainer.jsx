import Wrapper from '../assets/wrappers/LogoutContainer'
import { FaUserCircle, FaCaretDown } from 'react-icons/fa'
import { useDashboardContext } from '../pages/DashboardLayout'
import { useState } from 'react'
const LogoutContainer = () => {
  const { user, logoutUser } = useDashboardContext()
  const [showLogout, setShowLogout] = useState(false)
  return (
    <Wrapper>
      <button
        type='button'
        className='btn logout-btn'
        onClick={() => setShowLogout(!showLogout)}
      >
        {user?.avatar ? (
          <img src={user?.avatar} alt='profile image' className='img' />
        ) : (
          <FaUserCircle />
        )}
        {user?.name}
        <FaCaretDown />
      </button>
      <div className={showLogout ? 'dropdown show-dropdown' : 'dropdown'}>
        <button type='button' className='dropdown-btn' onClick={logoutUser}>
          Logout
        </button>
      </div>
    </Wrapper>
  )
}
export default LogoutContainer
