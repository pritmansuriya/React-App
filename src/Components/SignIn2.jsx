import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";

import logo from "../assets/Luxi-Saas-Logo.png";
import activebar from "../assets/Activepurple.png";

import { FaFacebookF, FaTwitter, FaGoogle, FaTimes } from "react-icons/fa";
import { IoEyeOutline, IoEyeOffOutline, IoArrowForward } from "react-icons/io5";

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),

  password: Yup.string()
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%*]).{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character.",
    )
    .required("Password is required"),
});

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  return (
    <section className="min-h-screen bg-[#6A1BB1] flex items-center justify-center px-3 sm:px-5 py-5 sm:py-10">
      <div className="max-w-6xl w-full rounded-2xl sm:rounded-[30px] overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-2 animate-modal">
        {/* Left Side */}

        <div className="relative bg-[#7422B7] text-white overflow-hidden flex flex-col items-center justify-center px-5 sm:px-10 py-10 sm:py-14 min-h-[240px] sm:min-h-[300px] lg:min-h-[600px]">
          <FaTimes
            onClick={() => navigate("/")}
            className="absolute top-5 left-5 sm:top-8 sm:left-8 text-2xl sm:text-3xl cursor-pointer z-20 hover:text-gray-900 transition"
          />

          <img src={logo} alt="Luxi SaaS logo" className="w-20 sm:w-24 z-10" />

          <h2 className="text-3xl sm:text-4xl lg:text-[50px] font-light mt-8 sm:mt-12 lg:mt-16 z-10 text-center">
            Welcome back
          </h2>

          <p className="text-base sm:text-lg lg:text-xl text-gray-200 mt-3 z-10 text-center">
            Please login to continue
          </p>
        </div>

        {/* Right Side */}

        <div className="bg-white px-5 sm:px-8 lg:px-12 py-8 sm:py-10 min-w-0">
          {/* Header */}

          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800">
                Sign In
              </h2>

              <img src={activebar} alt="" className="w-14 mt-3" />
            </div>

            <div className="flex justify-start sm:justify-center sm:mt-6">
              <Link
                to="/register"
                className="flex items-center gap-2 text-purple-500 hover:text-purple-700 transition text-sm sm:text-base"
              >
                <IoArrowForward className="text-xl shrink-0" />
                <span>Create new account</span>
              </Link>
            </div>
          </div>

          {/* Social Buttons */}

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-8 sm:mt-10">
            <button
              type="button"
              className="flex items-center justify-center gap-2 bg-blue-600 text-white rounded-full px-3 py-2.5 hover:bg-blue-700 transition"
            >
              <span className="w-6 h-6 shrink-0 rounded-full bg-white text-black flex items-center justify-center">
                <FaFacebookF className="text-sm" />
              </span>
              <span className="text-xs sm:text-sm">FACEBOOK</span>
            </button>

            <button
              type="button"
              className="flex items-center justify-center gap-2 bg-sky-500 text-white rounded-full px-3 py-2.5 hover:bg-sky-600 transition"
            >
              <span className="w-6 h-6 shrink-0 rounded-full bg-white text-black flex items-center justify-center">
                <FaTwitter className="text-sm" />
              </span>
              <span className="text-xs sm:text-sm">TWITTER</span>
            </button>

            <button
              type="button"
              className="flex items-center justify-center gap-2 bg-red-500 text-white rounded-full px-3 py-2.5 hover:bg-red-600 transition"
            >
              <span className="w-6 h-6 shrink-0 rounded-full bg-white text-black flex items-center justify-center">
                <FaGoogle className="text-sm" />
              </span>
              <span className="text-xs sm:text-sm">GOOGLE</span>
            </button>
          </div>

          {/* Divider */}

          <div className="flex items-center gap-3 my-8 sm:my-10">
            <div className="flex-1 border-t border-gray-200" />

            <span className="text-gray-400 text-xs sm:text-sm text-center whitespace-nowrap">
              Or sign in with email
            </span>

            <div className="flex-1 border-t border-gray-200" />
          </div>

          {/* Login Form */}

          <Formik
            initialValues={{
              email: "",
              password: "",
              terms: false,
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              const storedUser = JSON.parse(
                localStorage.getItem("users") || "null",
              );

              if (
                storedUser &&
                storedUser.email === values.email &&
                storedUser.password === values.password
              ) {
                localStorage.setItem(
                  "loggedInUser",
                  JSON.stringify(storedUser),
                );

                alert("Login Successful");
                navigate("/dashboard");
              } else {
                alert("Invalid Email or Password");
              }
            }}
          >
            {() => (
              <Form className="space-y-5">
                {/* Email */}

                <div>
                  <Field
                    type="email"
                    name="email"
                    placeholder="Email"
                    autoComplete="email"
                    className="w-full min-w-0 border border-gray-300 rounded-md px-4 py-3 outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600"
                  />

                  <ErrorMessage
                    name="email"
                    component="p"
                    className="text-red-500 text-sm mt-2"
                  />
                </div>

                {/* Password */}

                <div>
                  <div className="relative">
                    <Field
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Password"
                      autoComplete="current-password"
                      className="w-full min-w-0 border border-gray-300 rounded-md px-4 py-3 pr-12 outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-lg cursor-pointer text-purple-700"
                    >
                      {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
                    </button>
                  </div>

                  <ErrorMessage
                    name="password"
                    component="p"
                    className="text-red-500 text-sm mt-2"
                  />
                </div>

                {/* Remember Me and Forgot Password */}

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <label className="flex items-center gap-2 text-sm text-gray-500 cursor-pointer">
                    <Field
                      type="checkbox"
                      name="terms"
                      className="accent-purple-600 cursor-pointer"
                    />
                    <span>Remember me</span>
                  </label>

                  <button
                    type="button"
                    onClick={() =>
                      alert("Please contact support to reset your password.")
                    }
                    className="text-purple-600 hover:text-purple-800 text-sm text-left"
                  >
                    Forgot password?
                  </button>
                </div>

                {/* Submit Button */}

                <div className="pt-3 sm:pt-5">
                  <button
                    type="submit"
                    className="w-full bg-lime-400 cursor-pointer hover:bg-gray-900 text-white px-6 py-3 rounded-full font-semibold transition duration-300"
                  >
                    CONTINUE
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </section>
  );
};

export default Register;
