import Wrapper from '../assets/wrappers/StatsContainer'
import {
  FaSuitcaseRolling,
  FaCalendarCheck,
  FaBug,
  FaAccessibleIcon,
} from 'react-icons/fa'
import StatItem from './StatItem'
const StatsContainer = ({ defaultStats }) => {
  const stats = [
    {
      title: 'applied application',
      count: defaultStats?.applied || 0,
      icon: <FaSuitcaseRolling />,
      color: '#f59e0b',
      bcg: '#fef3c7',
    },
    {
      title: 'interview scheduled',
      count: defaultStats?.interview || 0,
      icon: <FaCalendarCheck />,
      color: '#647acb',
      bcg: '#e0e8f9',
    },
    {
      title: 'declined jobs',
      count: defaultStats?.declined || 0,
      icon: <FaBug />,
      color: '#d66a6a',
      bcg: '#ffeeee',
    },
    {
      title: 'accepted jobs',
      count: defaultStats?.accepted || 0,
      icon: <FaAccessibleIcon />,
      color: '#90EE90',
      bcg: '#fef3c7',
    },
  ]
  return (
    <Wrapper>
      {stats.map((item) => {
        return <StatItem key={item.title} {...item} />
      })}
    </Wrapper>
  )
}

export default StatsContainer
