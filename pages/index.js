import React, { useState, Fragment, useContext } from "react";
import axios from "axios";
import Image from "next/image";
import Cookies from "js-cookie";
import Logo from "./../public/favicon.png";
import { useRouter } from "next/router";
import { value_data } from "@/context/context";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Toaster from "@/components/Toaster";

export default function Index() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginScreen, showLoginScreen] = useState(true);
  const [rememberMe, setRememberMe] = useState(false);
  const { loginData, setLoginData } = useContext(value_data);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setErrors] = useState(null);
  const router = useRouter();
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleCloseToaster = () => {
    setErrors(null); // Clear the toaster message
  };
  const handleRegister = async (e) => {
    e.preventDefault();
    const userData = {
      username,
      email,
      password,
    };
    if (rememberMe) {
      // Save the user's credentials in cookies
      Cookies.set("savedEmail", email, { expires: 30 }); // Expires in 30 days
      Cookies.set("savedRememberMe", "true", { expires: 30 }); // Expires in 30 days
    } else {
      // Clear saved credentials from cookies
      Cookies.remove("savedEmail");
      Cookies.remove("savedRememberMe");
    }
    try {
      if (loginScreen) {
       const response = await axios
          .post(`${process.env.NEXT_PUBLIC_API_URL_LOGIN}`, { email, password })
          setLoginData(JSON.stringify(response.data));
            localStorage.setItem("userData", JSON.stringify(response.data));
            router.push("/tracker");
          // .then((response) => {
          //   setLoginData(JSON.stringify(response.data));
          //   localStorage.setItem("userData", JSON.stringify(response.data));
          //   router.push("/tracker");
          // });
      } else {
        const response = await axios
          .post(`${process.env.NEXT_PUBLIC_API_URL_REGISTER}`, userData)
          setLoginData(JSON.stringify(response.data));
          localStorage.setItem("userData", JSON.stringify(response.data));
          router.push("/tracker");
          // .then((response) => {
          //   setLoginData(JSON.stringify(response.data));
          //   localStorage.setItem("userData", JSON.stringify(response.data));
          //   router.push("/tracker");
          // });
      }
    } catch(error){
      setErrors('Invalid credentials. Please check your email and password.')
    }
    
  };

  return (
    <Fragment>
      <div className="w-full shadow-md p-5 flex justify-between items-center overflow-hidden fixed top-0 z-10 bg-[#2a2e67]">
        <div className="flex flex-row justify-content w-fit text-center text-white">
            UST Canada Post
        </div>
        <div className="object-contain" >
        <Image
              src={Logo}
              className="object-contain w-10 h-10"
              alt="logo"
              width={35}
              height={35}
            />
        </div>
      </div>
      <div className="m-16">
        <div className="flex flex-col items-center">
          {!loginScreen && (
            <div className="w-full rounded-lg shadow-md sm:max-w-md mt-8 bg-[#2a2e67]">
              <div className="p-4 space-y-2 md:space-y-4 sm:p-5">
                <h1 className="text-xl leading-tight tracking-tight text-white md:text-2xl">
                  Sign In
                </h1>
                <form
                  className="space-y-4 md:space-y-4"
                  onSubmit={handleRegister}
                >
                  <div>
                    <label
                      htmlFor="username"
                      className="block mb-2 text-sm font-medium text-white "
                    >
                      Your Name
                    </label>
                    <input
                      autoComplete="true"
                      type="text"
                      name="username"
                      id="username"
                      onChange={(e) => setUsername(e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-white sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-1.5 "
                      placeholder="name@company.com"
                      required=""
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-white "
                    >
                      Your email
                    </label>
                    <input
                      autoComplete="true"
                      type="email"
                      name="email"
                      id="email"
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-white sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-1.5 "
                      placeholder="name@company.com"
                      required=""
                    />
                  </div>
                  <div >
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-white "
                    >
                      Password
                    </label>
                    <div className="relative">
                    <input
                      autoComplete="true"
                      type={showPassword ?"text" : "password"}
                      name="password"
                      id="password"
                      placeholder="••••••••"
                      onChange={(e) => setPassword(e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-white sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-1.5    "
                      required=""
                    />
                    <FontAwesomeIcon
                      className="sign-in-toggle-password-button absolute top-1/2 right-2 transform -translate-y-1/2 focus:outline-none"
                        onClick={toggleShowPassword}
                        icon={showPassword ? faEyeSlash : faEye}
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                      />
                    </div>
                    
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          autoComplete="true"
                          id="remember"
                          aria-describedby="remember"
                          type="checkbox"
                          className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 "
                          required=""
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label
                          htmlFor="remember"
                          className="text-white "
                          checked={rememberMe}
                          onChange={() => setRememberMe(!rememberMe)}
                        >
                          Remember me
                        </label>
                      </div>
                    </div>
                    <a
                      href="/"
                      className="text-sm font-medium text-white hover:underline "
                    >
                      Forgot password?
                    </a>
                  </div>
                  <button
                    type="submit"
                    className="bg-red-500 w-full flex justify-center mt-10 text-white  bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-1.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 disabled:cursor-not-allowed cursor-not-allowed disabled:opacity-50" disabled
                  >
                    Register
                  </button>
                  {/* </Link> */}
                  <div className="text-sm font-light text-white ">
                    Already have an account ?
                    <p
                      onClick={(e) => showLoginScreen(true)}
                      className="font-medium text-primary-600 hover:underline cursor-pointer"
                    >
                      Log In
                    </p>
                  </div>
                </form>
              </div>
            </div>
          )}
          {loginScreen && (
            <div className="w-full rounded-lg shadow-md sm:max-w-md mt-12 bg-[#2a2e67]">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl   leading-tight tracking-tight text-white md:text-2xl ">
                  Log In
                </h1>
                <form
                  className="space-y-4 md:space-y-4"
                  onSubmit={handleRegister}
                >
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-white "
                    >
                      Your email
                    </label>
                    <input
                      autoComplete="true"
                      type="email"
                      name="email"
                      id="email"
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-white sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-1.5 "
                      placeholder="name@company.com"
                      required=""
                    />
                    
                  </div>
                  <div >
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-white "
                    >
                      Password
                    </label>
                    <div className="relative">
                    <input
                      autoComplete="true"
                      type={showPassword ?"text" : "password"}
                      name="password"
                      id="password"
                      placeholder="••••••••"
                      onChange={(e) => setPassword(e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-indigo-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-1.5 relative   "
                      required=""
                    />  
                      <FontAwesomeIcon
                      className="toggle-password-button absolute top-1/2 right-2 transform -translate-y-1/2 focus:outline-none"
                        onClick={toggleShowPassword}
                        icon={showPassword ? faEyeSlash : faEye}
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                      />

                    </div>
                   
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          autoComplete="true"
                          id="remember"
                          aria-describedby="remember"
                          type="checkbox"
                          className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 "
                          required=""
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="remember" className="text-white ">
                          Remember me
                        </label>
                      </div>
                    </div>
                    <a
                      href="/"
                      className="text-sm font-medium text-white hover:underline"
                    >
                      Forgot password?
                    </a>
                  </div>

                  <button
                    type="submit"
                    className="bg-white w-full flex justify-center mt-10 text-indigo-800 hover:bg-indigo-900 
                    hover:text-white focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-1.5 text-center dark:bg-indigo-800 dark:hover:bg-indigo-800 dark:focus:ring-primary-800"
                  >
                    Submit
                  </button>
                  <div className="text-sm font-light text-white ">
                    Don't have an account yet?
                    <p
                      onClick={(e) => (showLoginScreen(false))}
                      className="font-medium text-white hover:underline cursor-pointer"
                    >
                      Sign up
                    </p>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
      <Toaster message={error} onClose={handleCloseToaster}/>
    </Fragment>
    
  );
}
