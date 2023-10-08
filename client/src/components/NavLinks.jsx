import { NavLink } from 'react-router-dom'
import links from '../utils/links'
import { useDashboardContext } from '../pages/DashboardLayout'
const NavLinks = ({ isBigSidebar }) => {
  const { user, toggleSidebar } = useDashboardContext()
  return (
    <div className='nav-links'>
      {links.map((link) => {
        const { text, path, icon } = link
        const { role } = user
        if (role !== 'admin' && path === 'admin') return
        return (
          <NavLink
            to={path}
            className='nav-link'
            key={text}
            onClick={isBigSidebar ? null : toggleSidebar}
            end
          >
            <span className='icon'>{icon}</span>
            {text}
          </NavLink>
        )
      })}
    </div>
  )
}
export default NavLinks
