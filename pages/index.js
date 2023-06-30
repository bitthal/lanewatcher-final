import React, { Fragment } from "react";
import Link from "next/link";
import Image from "next/image";
export default function Index() {
  return (
    <Fragment>
      <div className="">
        <section className="bg-gray-50 ">
          <div className="flex flex-col items-center  px-6 py-8 mx-auto md:min-h-[90vh] lg:py-0">
            <a
              href="#"
              className="flex items-center mb-6 text-2xl font-semibold text-gray-900 "
            >
              <Image
                src="/logo.png"
                className="object-contain w-40 h-40"
                alt="logo"
              />
            </a>
            <div className="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0  ">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                  Sign in to your account
                </h1>
                <form className="space-y-4 md:space-y-6" action="#">
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      Your email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
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
                      type="password"
                      name="password"
                      id="password"
                      placeholder="••••••••"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5    "
                      required=""
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
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
                      href="#"
                      className="text-sm font-medium text-white text-primary-600 hover:underline "
                    >
                      Forgot password?
                    </a>
                  </div>
                  <Link
                    href="/tracker"
                    className="bg-red-500 w-full flex justify-center mt-10 text-white  bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    Sign in
                  </Link>
                  <p className="text-sm font-light text-gray-500 ">
                    Don’t have an account yet?{" "}
                    <a
                      href="#"
                      className="font-medium text-primary-600 hover:underline "
                    >
                      Sign up
                    </a>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Fragment>
  );
}
