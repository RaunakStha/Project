import React, { useContext } from 'react'
import {Link} from 'react-router-dom'
import AuthContext from '../context/Authcontext'


function Login() {

  const {loginUser} = useContext(AuthContext)
  const handleSubmit = e =>{
    e.preventDefault();
    const data = {
      email: e.target.email.value,
      password: e.target.password.value
    }
    data.email.length >0 && loginUser(data.email, data.password)
    // console.log(data)
  }

  return (
      <div className='w-full bg-gray-50 dark:bg-gray-900 flex flex-col justify-center items-center'>
        {/* <div className='relative w-1/2 h-full flex flex-col'>
          <div className='absolute top-[20%] left-[6%] flex flex-col'>
            <h1 className='text-5xl text text-[#4368fa] font-bold my-4'>It’s all about bidding</h1>
            <p className='text-xl text-[#2736b6] font-normal'> Available, Affordable, and Comfortable</p>
          </div>
          <img src='/images/Bid.jpg'alt=''className='w-full h-full object-cover' />
        </div> */}
        <h1 className='w-full max-w-[500px] mx-auto text-3xl text-[#060606] font-semibold m-8 flex justify-center'><img src='images/logo.png' className='w-6 h-6 mr-2 mt-2'></img>Online Auction</h1>

        <div className='w-1/3 h-full bg-[#ffffff] rounded-lg shadow-xl dark:border dark:bg-gray-800 dark:border-gray-900 flex flex-col p-14 justify-between items-center mb-10'>
          <div className='w-full flex flex-col max-w-[500px]'>
            <form onSubmit={handleSubmit}>
              <div className='w-full flex flex-col mb-2'>
                <h3 className='text-3xl font-semibold mb-2 text-center'>Login</h3>
                <p className='text-base mb-2 text-center'>Welcome! Please enter your details</p>
              </div>

              <div className='w-full flex flex-col'>
                <input 
                type="email"
                placeholder="Email" 
                className='w-full text-black py-2 bg-transparent my-2 border-b border-black outline-none focus:outline-none'
                name='email'
                autoComplete='on'/>

                <input 
                type="password"
                placeholder="password"
                className='w-full text-black py-2 bg-transparent my-2 border-b border-black outline-none focus:outline-none'
                name='password'/>
              </div>
              <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="remember"
                        aria-describedby="remember"
                        type="checkbox"
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                        required=""
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">
                        Remember me
                      </label>
                    </div>
                  </div>
                  <a
                    href="/forgot-password"
                    className="text-sm font-medium text-primary-600 hover:underline hover:text-indigo-600 dark:text-primary-500"
                  >
                    Forgot password?
                  </a>
                </div>
              <div className='w-full flex flex-col my-4 '>
                <button className='w-full my-2 p-4 text-center flex items-center justify-center bg-indigo-600'
                type='submit'>Log in</button>
              </div>

    
            </form>
          </div>

          <div className='w-full flex items-center'>
          <p className="text-sm font-light text-gray-600 dark:text-gray-500">
                Don't have an account?{" "}
                <a
                  href="/signup"
                  className="font-medium text-primary-600 hover:underline hover:text-indigo-600 dark:text-primary-500"
                >
                  register
                </a>
              </p>
          </div>
        </div>
      </div>
  )
}

export default Login;
