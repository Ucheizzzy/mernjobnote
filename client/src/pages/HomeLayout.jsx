import { Outlet } from 'react-router-dom'

const HomeLayout = () => {
  return (
    <>
      {/* Add navbar here so something that i want to see on all pages. Just like an extend from laravel concept */}
      <Outlet />
    </>
  )
}
export default HomeLayout
