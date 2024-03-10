import React, { useState } from 'react'
import { MdArrowBack } from 'react-icons/md'
import { Link, useNavigate } from 'react-router-dom'

const Privacy = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigat = useNavigate();

  const navigate =(url) => {
    window.location.href = url
  }
  
  const userId = localStorage.getItem('userId')
  return (
    <div className='w-full max-w-lg'>
      <div className='flex items-center p-2 py-4 text-xl justify-between font-bold shadow-lg'>
        <Link to='/' className='cursor-pointer text-2xl'
        ><MdArrowBack/></Link>
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
         onClick={()=>setIsModalOpen(true)}
         className='px-4 py-4 bg-gray-100 text-start text-xl font-semibold text-red-600 rounded-lg mb-2 mx-2 hover:bg-gray-300'><div className='ml-10'>Delete Account</div></div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
          <div className="bg-white p-8 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Confirm Delete Account</h2>
            <p className="mb-4">Are you sure you want to delete your account?</p>
            <div className="flex justify-end">
              <button
                onClick={()=>navigate(`https://circle.net.in/delete-account.php?id=${userId}`)}
                className="bg-red-600 text-white px-4 py-2 rounded mr-2"
              >
                Delete
              </button>
              <button
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      
    </div>
  )
}

export default Privacy
