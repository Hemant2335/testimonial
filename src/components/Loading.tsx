import loadinggif from '../assets/loading (1).gif'

const Loading = () => {
  return (
    <div className=" fixed flex h-[100vh] w-screen top-0 left-0 justify-center items-center  z-[50] bg-[rgba(34,34,34,0.5)]">
        <img src={loadinggif} alt="Loading..." />
    </div>
  )
}

export default Loading