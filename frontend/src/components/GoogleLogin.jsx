import React from 'react'
import { Button } from './ui/button'
import {FcGoogle} from 'react-icons/fc'
import { signInWithPopup } from 'firebase/auth'
import { auth, provider } from '@/helpers/firebase'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getEnv } from '@/helpers/getEnv'
import { RouteIndex } from '@/helpers/RouteName'
import { useDispatch } from 'react-redux'
import { setUser } from '@/redux/user/user.slice'

const GoogleLogin = () => {
const navigate =  useNavigate()
const dispatch = useDispatch()
    const handleLogin = async () => {
        try {
        const googleResponse = await signInWithPopup(auth, provider);
           const user = googleResponse.user
           const bodyData={
            name: user.displayName,
            email: user.email,
            avatar: user.photoURL
           }
        
        
        const response = await fetch(`${getEnv('VITE_API_BASE_URL')}/user/google-login`, {
                method: "post",
                headers: {
                  "Content-Type": "application/json",
                },
                credentials: 'include',
                body: JSON.stringify(bodyData)
              })
        
              const data = await response.json()
        console.log(data)
              if (!response.ok) {
                console.log("registeration failed !!!!")
                throw new Error(data.message || 'Registration failed')
              }
        
              toast.success('Login successful!.')
               dispatch(setUser(data.user))
              navigate(RouteIndex)
            } catch (error) {
              console.error('Registration error:', error)
              toast.error(error.message || 'An error occurred during registration')
            }
    }
  return (
<Button className="w-full p-4" onClick={handleLogin}>
    <FcGoogle/>
    Sign in with Google

</Button>
  )
}

export default GoogleLogin