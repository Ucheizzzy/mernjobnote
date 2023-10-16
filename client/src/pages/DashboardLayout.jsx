import { Outlet, redirect, useNavigate, useNavigation } from 'react-router-dom'
import Wrapper from '../assets/wrappers/Dashboard'
import { BigSlider, Loading, Navbar, SmallSlider } from '../components'
import { createContext, useContext, useEffect, useState } from 'react'
import customFetch from '../utils/customFetch'
import { toast } from 'react-toastify'
import { useQuery } from '@tanstack/react-query'

const userQuery = {
  queryKey: ['user'],
  queryFn: async () => {
    const { data } = await customFetch.get('/users/current-user')
    return data
  },
}

export const loader = (queryClient) => async () => {
  try {
    return await queryClient.ensureQueryData(userQuery)
  } catch (error) {
    return redirect('/login')
  }
}

const DashboardContext = createContext()
const DashboardLayout = ({ isDarkThemeEnabled, queryClient }) => {
  const { data } = useQuery(userQuery)
  const { user } = data
  const navigate = useNavigate()
  const navigation = useNavigation()
  const [isAuthError, setIsAuthError] = useState(false)

  const [showSidebar, setShowSidebar] = useState(false)
  const [isDarkTheme, setDarkTheme] = useState(isDarkThemeEnabled)

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
    queryClient.invalidateQueries()
    toast.success(`logging out.. see you soon ${user.name}`)
  }

  customFetch.interceptors.response.use(
    (response) => {
      return response
    },
    (error) => {
      if (error?.response?.status === 401) {
        setIsAuthError(true)
      }
      return Promise.reject(error)
    }
  )
  useEffect(() => {
    if (!isAuthError) return
  }, [isAuthError])

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
