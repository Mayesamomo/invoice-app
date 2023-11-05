/* eslint-disable react/prop-types */
import { useState } from 'react';
import { FaSignOutAlt, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { SidebarMenus } from './SidebarMenus';
import { Link } from 'react-router-dom';
import Footer from '../Footer/Footer';
import useAuth from '../../hooks/useAuth'
import { useLogout } from '../../hooks/useLogout';
function Sidebar({ isOpen }) {
  const { logout } = useLogout()
  const { user } = useAuth();
  const [isExpanded, setIsExpanded] = useState(isOpen);

  //logout function
  const handleLogout = () => {
    try {
      logout()
    } catch (error) {
      console.log(error)
    }
  };

  const sidebarClass = isExpanded
    ? 'p-2 bg-white w-25 flex flex-col' 
    : 'p-2 bg-white w-18 flex flex-col'; 

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  const arrowIcon = isExpanded ? <FaArrowLeft /> : <FaArrowRight />;
  const signOutIcon = isExpanded ? (
    <FaSignOutAlt />
  ) : (
    <FaSignOutAlt className="mr-5" /> 
  );

  const activeLink = 'text-white bg-gradient-to-r from-cyan-400 to-cyan-300';
  const normalLink = '';

  // Define a common class for all icons
  const iconClass = isExpanded ? '' : 'mr-2';
if(user) {
  return (
    <div className={sidebarClass} id="sideNav">
      <div
        onClick={toggleSidebar}
        className="text-gray-500 py-2.5 px-4 my-4 rounded transition duration-200 hover:bg-gradient-to-r hover:from-cyan-400 hover:to-cyan-300 hover:text-white text-center cursor-pointer"
      >
        {arrowIcon}
      </div>

      <nav>
        {SidebarMenus.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className={`block text-gray-500 py-2.5 px-4 my-4 rounded transition duration-200 hover:bg-gradient-to-r hover:from-cyan-400 hover:to-cyan-300 hover:text-white text-center ${item.active ? activeLink : normalLink}`}
          >
            <div className='flex items-center space-x-2 p-2 hover:rounded-lg'>
              <div className={`text-2xl ${iconClass}`}>
                {item.icon}
              </div>
              {isExpanded && (
                <div className='text-xl'>{item.title}</div>
              )}
            </div>
          </Link>
        ))}
      </nav>
      {isExpanded && (
        <div className="text-xl block text-gray-500 py-2.5 px-4 my-4 rounded transition duration-200 hover:bg-gradient-to-r hover:from-cyan-400 hover:to-cyan-300 hover:text-white text-center">
          <div onClick={handleLogout} className="flex items-center space-x-2">
            {signOutIcon}
            <span>Logout</span>
          </div>
        </div>
      )}
      {/* Location indicator */}
      <div className="bg-gradient-to-r from-cyan-300 to-cyan-500 h-px mt-2"></div>
      {/* Conditionally render the footer */}
      {isExpanded && <Footer />}
    </div>
  );
}
 
}

export default Sidebar;
