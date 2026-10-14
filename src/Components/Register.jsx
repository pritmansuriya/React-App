import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import logo from "../assets/SchoolLogo.png";
import {
  FaFacebookF,
  FaTwitter,
  FaGoogle,
  FaTimes,
} from "react-icons/fa";
import {
  IoEyeOutline,
  IoEyeOffOutline,
  IoArrowForward,
} from "react-icons/io5";

const validationSchema = Yup.object({
  name: Yup.string()
    .min(3, "Name must be at least 3 characters")
    .required("Name is requried"),

  email: Yup.string()
    .email("Invalid emial")
    .required("Email is requried"),

  password: Yup.string()
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%*]).{8,}$/,
      "Password must contain at least one uppercase latter,one lowercase letter,one number and one special character.",
    )
    .required("Password is requried"),

  repeatPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Password do not match")
    .required("Repeat Password is requried"),

  terms: Yup.boolean().oneOf(
    [true],
    "Please accept Terms & Privacy Policy",
  ),
});

const Register = () => {
  const [showPassword, setShowPasswod] = useState(false);
  const [showRepeatPassword, setShowRepeatPasswod] = useState(false);

  const navigate = useNavigate();

  return (
    <section className="min-h-screen bg-[#EDE9FE] flex items-center justify-center px-3 sm:px-5 py-6 sm:py-10">
      <div className="max-w-6xl w-full rounded-2xl sm:rounded-[30px] overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-2 animate-modal">

        {/* ================= Left Side ================= */}

        <div className="relative bg-gradient-to-br from-[#7C3AED] to-[#4F46E5] text-white overflow-hidden flex flex-col items-center justify-center px-6 sm:px-10 py-10 sm:py-14">
          <FaTimes
            onClick={() => navigate("/")}
            className="absolute top-5 left-5 sm:top-8 sm:left-8 text-2xl sm:text-3xl cursor-pointer z-20 hover:text-gray-200 transition"
          />

          <img src={logo} alt="logo" className="w-20 sm:w-24 z-10" />

          <h2 className="text-3xl sm:text-4xl lg:text-[50px] font-light mt-10 sm:mt-16 z-10 text-center">
            Nice to meet you
          </h2>

          <p className="text-base sm:text-xl text-violet-100 mt-3 z-10 text-center">
            Just register to join with us
          </p>
        </div>

        {/* ================= Right Side ================= */}

        <div className="bg-white px-5 sm:px-8 lg:px-12 py-8 sm:py-10 min-w-0">

          {/* Header */}

          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800">
                Register
              </h2>
            </div>

            <div className="flex justify-start sm:justify-center sm:mt-8">
              <Link
                to="/signin"
                className="flex items-center gap-2 text-[#7C3AED] hover:text-[#4F46E5] transition text-sm sm:text-base"
              >
                <IoArrowForward className="text-xl shrink-0" />
                <span>Already have account?</span>
              </Link>
            </div>
          </div>

          {/* Social Buttons */}

          <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 mt-8 sm:mt-10">
            <button
              type="button"
              className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full px-4 py-2.5 flex-1 min-w-0 transition"
            >
              <span className="w-6 h-6 shrink-0 rounded-full bg-white text-black flex items-center justify-center">
                <FaFacebookF className="text-sm" />
              </span>
              <span className="text-sm">FACEBOOK</span>
            </button>

            <button
              type="button"
              className="flex items-center justify-center gap-2 bg-sky-500 hover:bg-sky-600 text-white rounded-full px-4 py-2.5 flex-1 min-w-0 transition"
            >
              <span className="w-6 h-6 shrink-0 rounded-full bg-white text-black flex items-center justify-center">
                <FaTwitter className="text-sm" />
              </span>
              <span className="text-sm">TWITTER</span>
            </button>

            <button
              type="button"
              className="flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white rounded-full px-4 py-2.5 flex-1 min-w-0 transition"
            >
              <span className="w-6 h-6 shrink-0 rounded-full bg-white text-black flex items-center justify-center">
                <FaGoogle className="text-sm" />
              </span>
              <span className="text-sm">GOOGLE</span>
            </button>
          </div>

          {/* Divider */}

          <div className="flex items-center my-10">
            <div className="flex-1 border-t border-slate-200"></div>

            <span className="mx-5 text-slate-400 text-sm whitespace-nowrap">
              Or register with email
            </span>

            <div className="flex-1 border-t border-slate-200"></div>
          </div>

          {/* Form */}

          <Formik
            initialValues={{
              name: "",
              email: "",
              password: "",
              repeatPassword: "",
              terms: false,
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              localStorage.setItem("users", JSON.stringify(values));

              alert("Registration Successful");

              navigate("/signin");
            }}
          >
            {() => (
              <Form className="space-y-5">

                <div>
                  <Field
                    type="text"
                    name="name"
                    placeholder="Name"
                    className="w-full border border-slate-200 rounded-md px-4 py-3 text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                  />

                  <ErrorMessage
                    name="name"
                    component="p"
                    className="text-red-500 text-sm mt-2"
                  />
                </div>

                <div>
                  <Field
                    type="text"
                    name="email"
                    placeholder="Email"
                    className="w-full border border-slate-200 rounded-md px-4 py-3 text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                  />

                  <ErrorMessage
                    name="email"
                    component="p"
                    className="text-red-500 text-sm mt-2"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                  <div>
                    <div className="relative">
                      <Field
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Password"
                        className="w-full border border-slate-200 rounded-md px-4 py-3 pr-11 text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                      />

                      <button
                        type="button"
                        onClick={() => setShowPasswod(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-sm cursor-pointer text-[#7C3AED] z-10 font-medium"
                      >
                        {showPassword ? (
                          <IoEyeOffOutline />
                        ) : (
                          <IoEyeOutline />
                        )}
                      </button>
                    </div>

                    <ErrorMessage
                      name="password"
                      component="p"
                      className="text-red-500 text-sm mt-2"
                    />
                  </div>

                  <div>
                    <div className="relative">
                      <Field
                        type={showRepeatPassword ? "text" : "password"}
                        name="repeatPassword"
                        placeholder="Repeat Password"
                        className="w-full border border-slate-200 rounded-md px-4 py-3 pr-11 text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                      />

                      <button
                        type="button"
                        onClick={() =>
                          setShowRepeatPasswod(!showRepeatPassword)
                        }
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-sm cursor-pointer text-[#7C3AED] z-10 font-medium"
                      >
                        {showRepeatPassword ? (
                          <IoEyeOffOutline />
                        ) : (
                          <IoEyeOutline />
                        )}
                      </button>
                    </div>

                    <ErrorMessage
                      name="repeatPassword"
                      component="p"
                      className="text-red-500 text-sm mt-2"
                    />
                  </div>

                </div>

                {/* Bottom */}

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 pt-5">
                  <div>
                    <label className="flex items-start gap-3 text-sm">
                      <Field
                        type="checkbox"
                        name="terms"
                        className="accent-violet-600 cursor-pointer mt-1"
                      />

                      <span className="text-slate-500 text-left">
                        I have read and accept the Terms of
                        <span className="text-violet-600 whitespace-nowrap">
                          {" "}
                          Service & Privacy Policy *
                        </span>
                      </span>
                    </label>

                    <ErrorMessage
                      name="terms"
                      component="p"
                      className="text-red-500 text-sm mt-2"
                    />
                  </div>

                  <button
                    type="submit"
                    className="bg-[#4F46E5] cursor-pointer hover:bg-[#4338CA] text-white w-full sm:w-auto px-8 sm:px-10 py-3 rounded-full font-semibold transition shadow-md hover:shadow-lg"
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
