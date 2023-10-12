import {
  Outlet,
  redirect,
  useLoaderData,
  useNavigate,
  useNavigation,
} from 'react-router-dom'
import Wrapper from '../assets/wrappers/dashboard'
import { BigSlider, Loading, Navbar, SmallSlider } from '../components'
import { createContext, useContext, useState } from 'react'
import { checkDefaultTheme } from '../App'
import customFetch from '../utils/customFetch'
import { toast } from 'react-toastify'

export const loader = async () => {
  try {
    const { data } = await customFetch.get('/users/current-user')
    return data
  } catch (error) {
    return redirect('/')
  }
}

const DashboardContext = createContext()
const DashboardLayout = () => {
  const navigate = useNavigate()
  const navigation = useNavigation()

  const { user } = useLoaderData()
  // console.log(user.name)

  const [showSidebar, setShowSidebar] = useState(false)
  const [isDarkTheme, setDarkTheme] = useState(checkDefaultTheme())

  const isPageLoading = navigation.state === 'loading'

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar)
  }
  const toggleDarkTheme = () => {
    const newDarkTheme = !isDarkTheme
    setDarkTheme(newDarkTheme)
    document.body.classList.toggle('dark-theme', newDarkTheme)
    localStorage.setItem('darkTheme', newDarkTheme)
  }

  const logoutUser = async () => {
    navigate('/')
    await customFetch.get('/auth/logout')
    toast.success(`logging out.. see you soon ${user.name}`)
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
              {isPageLoading ? <Loading /> : <Outlet context={{ user }} />}
            </div>
          </div>
        </main>
      </Wrapper>
    </DashboardContext.Provider>
  )
}
export const useDashboardContext = () => useContext(DashboardContext)
export default DashboardLayout
