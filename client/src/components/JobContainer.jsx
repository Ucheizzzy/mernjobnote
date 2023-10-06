import { useAllJobContext } from '../pages/AllJobs'

const JobContainer = () => {
  const { data } = useAllJobContext()
  const { jobs } = data
  return <div>JobContainer</div>
}

export default JobContainer
