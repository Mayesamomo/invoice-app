/* eslint-disable react/prop-types */
import useAuth from '../../hooks/useAuth'
import { useLogout } from '../../hooks/useLogout';
import {  FaBell, FaUser } from 'react-icons/fa';
import WageFlow from '../../assets/wageFlow_logo.png';
function Navbar() {
  const { logout } = useLogout()
  const { user } = useAuth()
   if(user) {
    return (
      <div className="bg-white text-white shadow w-full p-2 flex items-center justify-between">
        <div className="flex items-center">
          <div className="hidden md:flex items-center">
            <img
              src={WageFlow}
              alt="Logo"
              className="w-28 h-18 mr-2"
            />
            <h2 className="font-bold text-xl">WageFlow</h2>
          </div>
          <div className="md:hidden flex items-center"></div>
        </div>
  
        <div className="space-x-5 mr-2">
          <button>
            <FaBell className="text-gray-500 text-lg" />
          </button>
          <button >
            <FaUser className="text-gray-500 text-lg hover:text-blue-300" />
          </button>
        </div>
      </div>
    );
   }

  
}

export default Navbar
