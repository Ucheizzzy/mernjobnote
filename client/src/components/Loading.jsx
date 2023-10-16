import ReactLoading from 'react-loading'
const Loading = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <ReactLoading type='bars' color='#14919b' />
    </div>
  )
}

export default Loading
