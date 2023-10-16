import { redirect } from 'react-router-dom'
import customFetch from '../utils/customFetch'
import { toast } from 'react-toastify'

export const action =
  (queryClient) =>
  async ({ params }) => {
    try {
      const { data } = await customFetch.delete(`/jobs/${params.id}`)
      queryClient.invalidateQueries(['jobs'])
      toast.success(data?.msg)
    } catch (error) {
      toast.error(error?.response?.data?.msg)
    }
    return redirect('/dashboard/all-jobs')
  }
