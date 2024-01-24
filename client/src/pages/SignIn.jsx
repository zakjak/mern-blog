import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react'
import { useDispatch, useSelector } from 'react-redux'
import { signInSuccess, signInStart, signInFailure } from '../redux/user/userSlice'
import Oauth from '../components/Oauth'


function SignIn() {
  const [formData, setFormData] = useState({})
  const {loading, error: errorMessage} = useSelector(state => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value.trim()})
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if(!formData.email || !formData.password){
      return dispatch(signInFailure('Please fill all the fields'))
    }
    try{
      dispatch(signInStart())
      const res = await fetch('/api/auth/signin', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      const data = await res.json()

      if(data.success === false){
        dispatch(signInFailure(data.message))
      }
      if(res.ok){
        dispatch(signInSuccess(data))
        navigate('/')
      }
    }catch(err){
      dispatch(signInFailure(err.message))
    }
  }

  return (
    <div className='min-h-screen mt-20'>
      <div className="flex gap-5 p3 max-w-3xl mx-auto flex-col md:flex-row
      md:items-center">
        {/* Left */}
        <div className="flex-1">
        <Link to='/' className='text-4xl font-bold dark:text-white'>
            <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>Sahand's</span>
            Blog
        </Link>
        <p className='text-sm mt-5'>
          This is a demo project. You can sign in with your email and
          password or with Google.
        </p>
        </div>
        {/* Right */}

        <div className="flex-1">
          <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
            <div>
              <Label value='Your email' />
              <TextInput 
                type='email'
                placeholder='name@company.com'
                id='email'
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value='Your password' />
              <TextInput 
                type='password'
                placeholder='***********'
                id='password'
                onChange={handleChange}
              />
            </div>
            <Button type='submit' gradientDuoTone='purpleToPink' disabled={loading}>
              {
                loading ? (
                  <>
                    <Spinner size='sm' />
                    <span className='pl-3'>Loading...</span>
                  </>
                ) : 'Sign In'
              }
            </Button>
            <Oauth />
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Don't have an account?</span>
            <Link to='/sign-up' className='text-blue-500'>
              Sign Up
            </Link>
          </div>
          {
            errorMessage && (
              <Alert className='mt-5' color='failure'>
                {errorMessage}
              </Alert>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default SignIn