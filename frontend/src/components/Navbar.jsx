import React from 'react'
import { FaBlog, FaSignInAlt, FaPlus, FaUser, FaSignOutAlt } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import SearchBar from './SearchBar'
import { RouteIndex, RouteProfile, RouteSignIn } from '@/helpers/RouteName'
import { useSelector } from 'react-redux'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useDispatch } from 'react-redux'
import { removeUser } from '@/redux/user/user.slice'
import { toast } from 'react-toastify'
import { getEnv } from '@/helpers/getEnv'

const Navbar = () => {
  const navigate = useNavigate()
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()

  const handleLogout = async  () => {
    try {
             const response = await fetch(`${getEnv('VITE_API_BASE_URL')}/user/logout`, {
               method: "get",
               credentials: 'include',
             })
       
             const data = await response.json()
             if (!response.ok) {
               throw new Error(data.message || 'Registration failed')
             }
       
             toast.success('Logout  successful!.')
             dispatch(removeUser(data.user))
             navigate(RouteIndex)
           } catch (error) {
             console.error('Registration error:', error)
             toast.error(error.message || 'An error occurred during registration')
           }
  }

  return (
    <nav className="fixed top-0 right-0 left-0 ml-64 flex h-16 items-center justify-between bg-white px-6 text-gray-800 shadow-md">
      {/* Logo on the left */}
      <div className="flex items-center space-x-2">
        <FaBlog className="text-2xl text-blue-600" />
        <Link to="/" className="text-xl font-bold">BlogSpace</Link>
      </div>
      
      <div>
        <SearchBar/>
      </div>
      
      {/* User section on the right */}
      {!user.isLoggedIn ? (
        <Link 
          to={RouteSignIn} 
          className="flex items-center space-x-2 rounded-md bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700"
        >
          <FaSignInAlt />
          <span>Sign In</span>
        </Link>
      ) : (
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="h-10 w-10 cursor-pointer border-2 border-blue-500">
                <AvatarImage src={user.avatar} />
                <AvatarFallback className="bg-blue-500 text-white">
                  {user.username?.charAt(0).toUpperCase() || 'U'}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel className="flex flex-col">
                <span className="font-bold">{user.user.name}</span>
                <span className="text-sm font-normal text-gray-500">{user.user.email}</span>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to={RouteProfile} className="w-full cursor-pointer">
                  <FaUser className="mr-2" />
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/create-blog" className="w-full cursor-pointer">
                  <FaPlus className="mr-2" />
                  Add Blog
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                className="cursor-pointer text-red-600 focus:bg-red-50 focus:text-red-700"
                onClick={handleLogout}
              >
                <FaSignOutAlt className="mr-2" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
    </nav>
  )
}

export default Navbar