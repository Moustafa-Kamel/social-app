import { RotatingLines } from 'react-loader-spinner'

export default function LoadingSpinner() {
  return (
    <div className='fixed inset-0 bg-main-color text-white flex justify-center items-center z-50'>
      <RotatingLines
visible={true}
height="100"
width="100"
color="grey"
strokeWidth="5"
animationDuration="0.75"
ariaLabel="rotating-lines-loading"
wrapperStyle={{}}
wrapperClass=""
/>
    </div>
  )
}
