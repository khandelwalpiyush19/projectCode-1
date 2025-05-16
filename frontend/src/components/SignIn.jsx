import React from 'react'
import { FaEnvelope, FaLock } from 'react-icons/fa'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Link,useNavigate } from 'react-router-dom'
import { RouteIndex, RouteSignUp } from '@/helpers/RouteName'
import { getEnv } from '@/helpers/getEnv'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { setUser } from '@/redux/user/user.slice'
import GoogleLogin from './GoogleLogin'

// Define the form validation schema using Zod
const formSchema = z.object({
  email: z.string()
    .email("Please enter a valid email address"),
  password: z.string()
    .min(8, "Password must be at least 8 characters"),
  rememberMe: z.boolean().default(false).optional(),
})

const SignIn = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  // Initialize form with react-hook-form and zod validation
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  })
  

  // Handle form submission
  async function onSubmit(values) {
     try {
          const response = await fetch(`${getEnv('VITE_API_BASE_URL')}/user/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: 'include',
            body: JSON.stringify({
              name: values.name,
              email: values.email,
              password: values.password
            })
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
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Sign In</CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        
        <CardContent>
        <div>
            <GoogleLogin/>
          </div>
          <br />
          <p className='text-center text-sm'>
            Or 
          </p>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                        <FaEnvelope />
                      </div>
                      <FormControl>
                        <Input placeholder="your@email.com" className="pl-10" {...field} />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel>Password</FormLabel>
                      {/* <a href="#" className="text-sm font-medium text-blue-600 hover:underline">
                        Forgot password?
                      </a> */}
                    </div>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                        <FaLock />
                      </div>
                      <FormControl>
                        <Input type="password" className="pl-10" {...field} />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {/* <FormField
                control={form.control}
                name="rememberMe"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-2 space-y-0">
                    <FormControl>
                      <Checkbox 
                        checked={field.value} 
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Remember me</FormLabel>
                    </div>
                  </FormItem>
                )}
              /> */}
              
              <Button type="submit" className="w-full">Sign In</Button>
            </form>
          </Form>
        </CardContent>
        
        <CardFooter className="flex justify-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to={RouteSignUp} className="font-medium text-blue-600 hover:underline">
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}

export default SignIn

