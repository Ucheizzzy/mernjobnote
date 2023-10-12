import Wrapper from '../assets/wrappers/JobsContainer'
import { useAllJobContext } from '../pages/AllJobs'
import Job from './Job'
import PageBtnComplex from './PageBtnComplex'

const JobContainer = () => {
  const { data } = useAllJobContext()
  const { jobs, totalJob, numOfPages } = data
  if (jobs.length === 0) {
    return (
      <Wrapper>
        <h2>No job to display</h2>
      </Wrapper>
    )
  }
  return (
    <Wrapper>
      <h5>
        {totalJob} job{jobs.length > 1 && 's'} found
      </h5>
      <div className='jobs'>
        {jobs.map((job) => {
          return <Job key={job._id} {...job} />
        })}
      </div>
      {numOfPages > 1 && <PageBtnComplex />}
    </Wrapper>
  )
}

export default JobContainer
