import { toast } from 'react-toastify'
import { JobContainer, SearchContainer } from '../components'
import customFetch from '../utils/customFetch'
import { useLoaderData } from 'react-router-dom'
import { createContext, useContext } from 'react'

export const loader = async ({ request }) => {
  try {
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ])

    const { data } = await customFetch.get('/jobs', {
      params,
    })
    return { data, searchValues: { ...params } }
  } catch (error) {
    toast.error(error?.response?.data?.msg)
    return error
  }
}

const AllJobContext = createContext()
const AllJobs = () => {
  const { data, searchValues } = useLoaderData()
  return (
    <AllJobContext.Provider value={{ data, searchValues }}>
      <SearchContainer />
      <JobContainer />
    </AllJobContext.Provider>
  )
}
export const useAllJobContext = () => useContext(AllJobContext)
export default AllJobs
