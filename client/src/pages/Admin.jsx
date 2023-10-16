import { redirect, useLoaderData } from 'react-router-dom'
import customFetch from '../utils/customFetch'
import { toast } from 'react-toastify'
import Wrapper from '../assets/wrappers/StatsContainer'
import { StatItem } from '../components'
import { FaSuitcaseRolling, FaCalendarCheck } from 'react-icons/fa'
import { useQuery } from '@tanstack/react-query'

const adminQuery = {
  queryKey: ['admin'],
  queryFn: async () => {
    const { data } = await customFetch.get('/users/admin/app-stats')

    return data
  },
}

export const loader = (queryClient) => async () => {
  try {
    return await queryClient.ensureQueryData(adminQuery)
  } catch (error) {
    return toast.error(error?.response?.data?.msg)
  }
}
const Admin = () => {
  // const { users, jobs } = useLoaderData()
  const {
    data: { users, jobs },
  } = useQuery(adminQuery)

  return (
    <Wrapper>
      <StatItem
        title='current users'
        count={users}
        color='#e9b949'
        bcg='#fcefc7'
        icon={<FaSuitcaseRolling />}
      />
      <StatItem
        title='total jobs'
        count={jobs}
        color='#647acb'
        bcg='#e0e8f9'
        icon={<FaCalendarCheck />}
      />
    </Wrapper>
  )
}
export default Admin
