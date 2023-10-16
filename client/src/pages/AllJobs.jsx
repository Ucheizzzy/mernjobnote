import { toast } from 'react-toastify'
import { JobContainer, SearchContainer } from '../components'
import customFetch from '../utils/customFetch'
import { useLoaderData } from 'react-router-dom'
import { createContext, useContext } from 'react'
import { useQuery } from '@tanstack/react-query'

const AllJobsQuery = (params) => {
  const { search, jobStatus, jobType, sort, page } = params
  return {
    queryKey: [
      'jobs',
      search ?? '',
      jobStatus ?? 'all',
      jobType ?? 'all',
      sort ?? 'newest',
      page ?? 1,
    ],
    queryFn: async () => {
      const { data } = await customFetch.get('/jobs', {
        params,
      })
      return data
    },
  }
}

export const loader =
  (queryClient) =>
  async ({ request }) => {
    try {
      const params = Object.fromEntries([
        ...new URL(request.url).searchParams.entries(),
      ])
      await queryClient.ensureQueryData(AllJobsQuery(params))
      return { searchValues: { ...params } }
    } catch (error) {
      toast.error(error?.response?.data?.msg)
      return error
    }
  }

const AllJobContext = createContext()
const AllJobs = () => {
  const { searchValues } = useLoaderData()
  const { data } = useQuery(AllJobsQuery(searchValues))
  return (
    <AllJobContext.Provider value={{ data, searchValues }}>
      <SearchContainer />
      <JobContainer />
    </AllJobContext.Provider>
  )
}
export const useAllJobContext = () => useContext(AllJobContext)
export default AllJobs
