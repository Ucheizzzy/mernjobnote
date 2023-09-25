import { BsFillSunFill, BsFillMoonFill } from 'react-icons/bs'
import Wrapper from '../assets/wrappers/ThemeToggle'
import { useDashboardContext } from '../pages/DashboardLayout'
const ThemeToggle = () => {
  const { isDarkTheme, toggleDarkTheme } = useDashboardContext()
  return (
    <Wrapper onClick={toggleDarkTheme}>
      {isDarkTheme ? (
        <BsFillSunFill className='toggle-con' />
      ) : (
        <BsFillMoonFill className='toggle-con' />
      )}
    </Wrapper>
  )
}
export default ThemeToggle
