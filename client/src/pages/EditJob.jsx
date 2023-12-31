import { toast } from 'react-toastify'
import Wrapper from '../assets/wrappers/DashboardFormPage'
import customFetch from '../utils/customFetch'
import { Form, redirect, useLoaderData } from 'react-router-dom'
import { FormRow, FormRowSelect, SubmitBtn } from '../components'
import { JOB_STATUS, JOB_TYPE } from '../../../utils/constants'
import { useQuery } from '@tanstack/react-query'

const singJobQuery = (id) => {
  return {
    queryKey: ['job', id],
    queryFn: async () => {
      const { data } = await customFetch.get(`/jobs/${id}`)
      return data
    },
  }
}

export const loader =
  (queryClient) =>
  async ({ params }) => {
    try {
      await queryClient.ensureQueryData(singJobQuery(params.id))
      return params.id
    } catch (error) {
      toast.error(error?.response?.data?.msg)
      return error
    }
  }

export const action =
  (queryClient) =>
  async ({ request, params }) => {
    const formData = await request.formData()
    const data = Object.fromEntries(formData)

    try {
      await customFetch.patch(`/jobs/${params.id}`, data)
      queryClient.invalidateQueries(['jobs'])
      toast.success('This job has been updated')
      return redirect('/dashboard/all-jobs')
    } catch (error) {
      toast.error(error?.response?.data?.msg)
      return error
    }
  }

const EditJob = () => {
  const id = useLoaderData()

  const {
    data: { job },
  } = useQuery(singJobQuery(id))
  return (
    <Wrapper>
      <Form className='form' method='POST'>
        <h4 className='form-title'>Edit job</h4>
        <div className='form-center'>
          <FormRow name='position' type='text' defaultValue={job.position} />
          <FormRow name='company' type='text' defaultValue={job.company} />
          <FormRow
            type='text'
            name='jobLocation'
            labelText='job location'
            defaultValue={job.jobLocation}
          />
          <FormRowSelect
            name='jobStatus'
            labelText='job Status'
            defaultValue={job.jobStatus}
            list={Object.values(JOB_STATUS)}
          />
          <FormRowSelect
            name='jobType'
            labelText='job type'
            defaultValue={job.jobType}
            list={Object.values(JOB_TYPE)}
          />

          <SubmitBtn formBtn />
        </div>
      </Form>
    </Wrapper>
  )
}
export default EditJob
