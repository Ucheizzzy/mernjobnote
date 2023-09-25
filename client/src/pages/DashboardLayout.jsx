import { Outlet } from 'react-router-dom'
import Wrapper from '../assets/wrappers/dashboard'
import { BigSlider, Navbar, SmallSlider } from '../components'
import { createContext, useContext, useState } from 'react'
import avatar from '../assets/images/avatar-1.jpg'

import { checkDefaultTheme } from '../App'
const DashboardContext = createContext()
const DashboardLayout = () => {
  const user = { name: 'uche', avatar: avatar }

  const [showSidebar, setShowSidebar] = useState(false)
  const [isDarkTheme, setDarkTheme] = useState(checkDefaultTheme())

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar)
  }
  const toggleDarkTheme = () => {
    const newDarkTheme = !isDarkTheme
    setDarkTheme(newDarkTheme)
    document.body.classList.toggle('dark-theme', newDarkTheme)
    localStorage.setItem('darkTheme', newDarkTheme)
  }

  const logoutUser = () => {
    console.log('user logged out')
  }
  return (
    <DashboardContext.Provider
      value={{
        user,
        isDarkTheme,
        showSidebar,
        toggleDarkTheme,
        toggleSidebar,
        logoutUser,
      }}
    >
      <Wrapper>
        <main className='dashboard'>
          <SmallSlider />
          <BigSlider />
          <div>
            <Navbar />
            <div className='dashboard-page'>
              <Outlet />
            </div>
          </div>
        </main>
      </Wrapper>
    </DashboardContext.Provider>
  )
}
export const useDashboardContext = () => useContext(DashboardContext)
export default DashboardLayout
