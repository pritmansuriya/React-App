import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import logo from "../assets/Luxi-Saas-Logo.png";
import activebar from "../assets/Activepurple.png";
import { FaFacebookF, FaTwitter, FaGoogle, FaTimes } from "react-icons/fa";
import { IoEyeOutline, IoEyeOffOutline, IoArrowForward } from "react-icons/io5";


const validationSchema = Yup.object({
  name: Yup.string()
    .min(3, "Name must be at least 3 characters")
    .required("Name is requried"),

  email: Yup.string().email("Invalid emial").required("Email is requried"),

  password: Yup.string()
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%*]).{8,}$/,
      "Password must contain at least one uppercase latter,one lowercase letter,one number and one special character.",
    )
    .required("Password is requried"),

  repeatPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Password do not match")
    .required("Repeat Password is requried"),

  terms: Yup.boolean().oneOf([true], "Please accept Terms & Privacy Policy"),
});
const Register = () => {
  const [showPassword, setShowPasswod] = useState(false);
  const [showRepeatPassword, setShowRepeatPasswod] = useState(false);

  const navigate = useNavigate();
  return (
    <section className="min-h-screen bg-[#6A1BB1] flex items-center justify-center px-5 py-10">
      <div className="max-w-6xl w-full rounded-[30px] overflow-hidden shadow-2xl grid lg:grid-cols-2 animate-modal">
        {/* ================= Left Side ================= */}

        <div className="relative bg-[#7422B7] text-white overflow-hidden flex flex-col items-center justify-center px-10 py-14">
          {/* Background Curves */}

          {/* <div className="absolute -left-24 -top-24 w-72 h-200 rounded-full bg-white/10 rotate-12"></div> */}

          {/* <div className="absolute -right-30 -bottom-37.5 w-80 h-150 rounded-full bg-black/10 rotate-12"></div> */}

          {/* Close */}

          <FaTimes
            onClick={() => navigate("/")}
            className="absolute top-8 left-8 text-white text-3xl cursor-pointer z-20 hover:text-gray-900 transition"
          />

          {/* Logo */}

          <img src={logo} alt="logo" className="w-24 z-10" />

          <h2 className="text-[50px] font-light mt-16 z-10">
            Nice to meet you
          </h2>

          <p className="text-xl text-gray-200 mt-3 z-10">
            Just register to join with us
          </p>
        </div>

        {/* ================= Right Side ================= */}

        <div className="bg-white px-12 py-10">
          {/* Header */}

          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-5xl font-bold text-gray-800">Register</h2>

              <img src={activebar} alt="" className="w-14 mt-3" />
            </div>

            <div className="flex justify-center mt-8">
              <Link
                to="/signin"
                className="flex items-center gap-2 text-purple-500 hover:text-purple-700 transition"
              >
                <IoArrowForward className="text-xl" />
                <span className="">Already have account?</span>
              </Link>
            </div>
          </div>

          {/* Social Buttons */}

          <div className="flex gap-4 mt-10">
            <button className="flex items-center cursor-pointer gap-2 bg-blue-600 text-white rounded-full px-5 py-2">
              <span className="w-6 h-6 rounded-full bg-white text-black flex items-center justify-center">
                <FaFacebookF className="text-sm" />
              </span>

              <span className="text-sm">FACEBOOK</span>
            </button>

            <button className="flex items-center cursor-pointer gap-2 bg-sky-500 text-white rounded-full px-5 py-2">
              <span className="w-6 h-6 rounded-full bg-white text-black flex items-center justify-center">
                <FaTwitter className="text-sm" />
              </span>

              <span className="text-sm">TWITTER</span>
            </button>

            <button className="flex items-center cursor-pointer gap-2 bg-red-500 text-white rounded-full px-5 py-2">
              <span className="w-6 h-6 rounded-full bg-white text-black flex items-center justify-center">
                <FaGoogle className="text-sm" />
              </span>

              <span className="text-sm">GOOGLE</span>
            </button>
          </div>

          {/* Divider */}

          <div className="flex items-center my-10">
            <div className="flex-1 border-t"></div>

            <span className="mx-5 text-gray-400 text-sm">
              Or register with email
            </span>

            <div className="flex-1 border-t"></div>
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
                    className="w-full border rounded-md px-4 py-3 outline-none focus:border-purple-600"
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
                    className="w-full border rounded-md px-4 py-3 outline-none focus:border-purple-600"
                  />

                  <ErrorMessage
                    name="email"
                    component="p"
                    className="text-red-500 text-sm mt-2"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4 ">
                  <div>
                    <div className="relative">
                      <Field
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Password"
                        className="w-full border rounded-md px-4 py-3 outline-none focus:border-purple-600"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPasswod(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-sm cursor-pointer text-purple-600 z-10 font-medium"
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
                  <div>
                    <div className="relative">
                      <Field
                        type={showRepeatPassword ? "text" : "password"}
                        name="repeatPassword"
                        placeholder="Repeat Password"
                        className="w-full border rounded-md px-4 py-3 outline-none focus:border-purple-600"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowRepeatPasswod(!showRepeatPassword)
                        }
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-sm cursor-pointer text-purple-600 z-10 font-medium"
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

                <div className="flex items-center justify-between pt-5">
                  <div>
                    <label className="flex items-start gap-3 text-sm">
                      <Field
                        type="checkbox"
                        name="terms"
                        className="accent-lime-500 cursor-pointer mt-1"
                      />

                      <span className="text-gray-500 text-left">
                        I have read and accept the Terms of
                        <span className="text-lime-500 whitespace-nowrap">
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
                    className="bg-lime-400 cursor-pointer hover:bg-gray-900 text-white px-10 py-3 rounded-full font-semibold"
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
