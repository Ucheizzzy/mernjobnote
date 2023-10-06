import Wrapper from '../assets/wrappers/JobsContainer'
import { useAllJobContext } from '../pages/AllJobs'
import Job from './Job'

const JobContainer = () => {
  const { data } = useAllJobContext()
  const { jobs } = data
  if (jobs.length === 0) {
    return (
      <Wrapper>
        <h2>No job to display</h2>
      </Wrapper>
    )
  }
  return (
    <Wrapper>
      <div className='jobs'>
        {jobs.map((job) => {
          return <Job key={job._id} {...job} />
        })}
      </div>
    </Wrapper>
  )
}

export default JobContainer
