import React from 'react'
import { MdArrowBack } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

const Privacy = () => {
  const navigate =(url) => {
    window.location.href = url
  }
  
  const userId = localStorage.getItem('userId')
  return (
    <div className='w-full max-w-lg'>
      <div className='flex items-center p-2 py-4 text-xl justify-between font-bold shadow-lg'>
        <div className='cursor-pointer text-2xl'
        onClick={() => window.history.back()}
        ><MdArrowBack/></div>
        <div>Privacy and Security</div>
        <div></div>
      </div>
      <div className='mt-4'>
        <div
         onClick={()=>navigate('https://circle.net.in/change-password.php')}
         className='px-4 py-4 bg-gray-100 text-start text-xl rounded-lg mb-2 mx-2 hover:bg-gray-300'><div className='ml-10'>Change Password</div></div>
        <div
         onClick={()=>navigate('https://circle.net.in/help&support.php')}
         className='px-4 py-4 bg-gray-100 text-start text-xl rounded-lg mb-2 mx-2 hover:bg-gray-300'><div className='ml-10'>Help and Support</div></div>
        <div
         onClick={()=>navigate('https://circle.net.in/policy.php')}
         className='px-4 py-4 bg-gray-100 text-start text-xl rounded-lg mb-2 mx-2 hover:bg-gray-300'><div className='ml-10'>Policy and Terms of use</div></div>
        <div
         onClick={()=>navigate(`https://circle.net.in/delete-account.php?id=${userId}`)}
         className='px-4 py-4 bg-gray-100 text-start text-xl font-semibold text-red-600 rounded-lg mb-2 mx-2 hover:bg-gray-300'><div className='ml-10'>Delete Account</div></div>
      </div>
    </div>
  )
}

export default Privacy
