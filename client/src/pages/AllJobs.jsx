import { toast } from 'react-toastify'
import { JobContainer, SearchContainer } from '../components'
import customFetch from '../utils/customFetch'
import { useLoaderData } from 'react-router-dom'
import { createContext, useContext } from 'react'

export const loader = async ({ request }) => {
  try {
    const { data } = await customFetch.get('/jobs')
    return { data }
  } catch (error) {
    toast.error(error?.response?.data?.msg)
    return error
  }
}

const AllJobContext = createContext()
const AllJobs = () => {
  const { data } = useLoaderData()
  return (
    <AllJobContext.Provider value={{ data }}>
      <SearchContainer />
      <JobContainer />
    </AllJobContext.Provider>
  )
}
export const useAllJobContext = () => useContext(AllJobContext)
export default AllJobs
