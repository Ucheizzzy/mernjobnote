import { redirect, useLoaderData } from 'react-router-dom'
import customFetch from '../utils/customFetch'
import { toast } from 'react-toastify'
import Wrapper from '../assets/wrappers/StatsContainer'
export const loader = async () => {
  try {
    const { data } = await customFetch.get('/users/admin/app-stats')
    return data
  } catch (error) {
    toast.error(error?.response?.data?.msg)
    return redirect('dashboard')
  }
}
const Admin = () => {
  const { users, jobs } = useLoaderData()
  return <Wrapper>Admin</Wrapper>
}
export default Admin
