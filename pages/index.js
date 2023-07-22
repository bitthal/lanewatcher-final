import React, { useState, Fragment, useContext } from "react";
import axios from "axios";
import Image from "next/image";
import Cookies from "js-cookie";
import Logo from "./../public/logo.png";
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
      <div className="w-full shadow-md p-5 flex justify-between items-center overflow-hidden absolute top-0">
        <div className="w-fit text-center text-red-800 font-bold">
            UST Canada Post
        </div>
      </div>
      <div className="bg-gray-50 relative top-14">
        <div className="flex flex-col items-center px-6 py-8 mx-auto md:min-h-[90vh] lg:py-0">
          <div className="flex items-center mb-6 text-2xl font-semibold text-gray-900 ">
            <Image
              src={Logo}
              className="object-contain w-40 h-40"
              alt="logo"
              width={35}
              height={35}
            />
          </div>
          {!loginScreen && (
            <div className="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0  ">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                  Sign in to your account
                </h1>
                <form
                  className="space-y-4 md:space-y-6"
                  onSubmit={handleRegister}
                >
                  <div>
                    <label
                      htmlFor="username"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      Your Name
                    </label>
                    <input
                      autoComplete="true"
                      type="text"
                      name="username"
                      id="username"
                      onChange={(e) => setUsername(e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                      placeholder="name@company.com"
                      required=""
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      Your email
                    </label>
                    <input
                      autoComplete="true"
                      type="email"
                      name="email"
                      id="email"
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                      placeholder="name@company.com"
                      required=""
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      Password
                    </label>
                    <input
                      autoComplete="true"
                      type="password"
                      name="password"
                      id="password"
                      placeholder="••••••••"
                      onChange={(e) => setPassword(e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5    "
                      required=""
                    />
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
                          className="text-gray-500 "
                          checked={rememberMe}
                          onChange={() => setRememberMe(!rememberMe)}
                        >
                          Remember me
                        </label>
                      </div>
                    </div>
                    <a
                      href="/"
                      className="text-sm font-medium text-white text-primary-600 hover:underline "
                    >
                      Forgot password?
                    </a>
                  </div>
                  {/* <Link
                    href="/tracker"
                    className="bg-red-500 w-full flex justify-center mt-10 text-white  bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  > */}
                  <button
                    type="submit"
                    className="bg-red-500 w-full flex justify-center mt-10 text-white  bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    Register
                  </button>
                  {/* </Link> */}
                  <div className="text-sm font-light text-gray-500 ">
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
            <div className="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0  ">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                  Log In
                </h1>
                <form
                  className="space-y-4 md:space-y-6"
                  onSubmit={handleRegister}
                >
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      Your email
                    </label>
                    <input
                      autoComplete="true"
                      type="email"
                      name="email"
                      id="email"
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                      placeholder="name@company.com"
                      required=""
                    />
                    
                  </div>
                  <div >
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      Password
                    </label>
                    <div className="flex">
                    <input
                      autoComplete="true"
                      type={showPassword ?"text" : "password"}
                      name="password"
                      id="password"
                      placeholder="••••••••"
                      onChange={(e) => setPassword(e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 relative   "
                      required=""
                    />  
                      <FontAwesomeIcon
                      className="toggle-password-button"
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
                        <label htmlFor="remember" className="text-gray-500 ">
                          Remember me
                        </label>
                      </div>
                    </div>
                    <a
                      href="/"
                      className="text-sm font-medium text-white text-primary-600 hover:underline "
                    >
                      Forgot password?
                    </a>
                  </div>

                  <button
                    type="submit"
                    className="bg-red-500 w-full flex justify-center mt-10 text-white  bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    Submit
                  </button>
                  <div className="text-sm font-light text-gray-500 ">
                    Don't have an account yet?
                    <p
                      // onClick={(e) => (showLoginScreen(false))}
                      className="font-medium text-primary-600 hover:underline cursor-pointer"
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
