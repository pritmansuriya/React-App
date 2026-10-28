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
    .required("Name is required"),

  email: Yup.string()
    .email("Invalid email")
    .required("Email is required"),

  password: Yup.string()
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%*]).{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character."
    )
    .required("Password is required"),

  repeatPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords do not match")
    .required("Repeat password is required"),

  terms: Yup.boolean().oneOf(
    [true],
    "Please accept Terms & Privacy Policy"
  ),
});

const saveRegisteredUser = (values) => {
  const savedUsers = JSON.parse(localStorage.getItem("users") || "[]");

  // Support array storage and the older single-user format.
  const users = Array.isArray(savedUsers)
    ? savedUsers
    : savedUsers?.email
      ? [savedUsers]
      : [];

  const email = values.email.trim().toLowerCase();

  const existingUser = users.find(
    (user) => user.email?.trim().toLowerCase() === email
  );

  if (existingUser) {
    throw new Error("An account with this email already exists.");
  }

  const newUser = {
    id: crypto.randomUUID(),
    name: values.name.trim(),
    email,
    password: values.password,
  };

  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));
};

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const navigate = useNavigate();

  const inputClass =
    "w-full min-w-0 rounded-md border border-slate-200 bg-white px-4 py-3 text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-400 dark:focus:border-violet-400 dark:focus:ring-violet-500/20";

  const socialButtonClass =
    "flex min-w-0 flex-1 items-center justify-center gap-2 rounded-full px-4 py-2.5 text-white transition";

  return (
    <section className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#EDE9FE] via-[#F5F3FF] to-[#E0E7FF] px-3 py-6 transition-colors duration-300 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950 sm:px-5 sm:py-10">
      {/* Main card */}
      <div className="animate-modal grid w-full max-w-6xl grid-cols-1 overflow-hidden rounded-2xl border border-white/80 bg-white shadow-2xl transition-colors duration-300 dark:border-slate-700 dark:bg-slate-900 dark:shadow-black/30 sm:rounded-[30px] lg:grid-cols-2">
        {/* Left side */}
        <div className="relative flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[#7C3AED] to-[#4F46E5] px-6 py-10 text-white sm:px-10 sm:py-14">
          <div className="pointer-events-none absolute -left-16 -top-16 h-56 w-56 rounded-full bg-fuchsia-400/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-16 -right-16 h-56 w-56 rounded-full bg-indigo-300/20 blur-3xl" />

          <button
            type="button"
            onClick={() => navigate("/")}
            aria-label="Return to home"
            className="absolute left-5 top-5 z-20 cursor-pointer text-2xl transition hover:rotate-90 hover:text-violet-200 sm:left-8 sm:top-8 sm:text-3xl"
          >
            <FaTimes />
          </button>

          <img
            src={logo}
            alt="SchoolFlow logo"
            className="relative z-10 w-20 rounded-lg bg-white p-2 shadow-lg sm:w-24"
          />

          <h2 className="relative z-10 mt-10 text-center text-3xl font-light sm:mt-16 sm:text-4xl lg:text-[50px]">
            Nice to meet you
          </h2>

          <p className="relative z-10 mt-3 text-center text-base text-violet-100 sm:text-xl">
            Just register to join with us
          </p>

          <div className="absolute bottom-0 left-0 h-1.5 w-full bg-gradient-to-r from-fuchsia-300 via-violet-200 to-indigo-300" />
        </div>

        {/* Right side */}
        <div className="min-w-0 bg-white px-5 py-8 transition-colors duration-300 dark:bg-slate-900 sm:px-8 sm:py-10 lg:px-12">
          {/* Header */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <h2 className="text-3xl font-bold text-slate-800 dark:text-white sm:text-4xl lg:text-5xl">
              Register
            </h2>

            <div className="flex justify-start sm:mt-8 sm:justify-center">
              <Link
                to="/signin"
                className="flex items-center gap-2 text-sm text-[#7C3AED] transition hover:text-[#4F46E5] dark:text-violet-400 dark:hover:text-violet-300 sm:text-base"
              >
                <IoArrowForward className="shrink-0 text-xl" />
                <span>Already have account?</span>
              </Link>
            </div>
          </div>

          {/* Social buttons */}
          <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:gap-4">
            <button
              type="button"
              onClick={() => alert("Facebook registration is not connected yet.")}
              className={`${socialButtonClass} bg-blue-600 hover:bg-blue-700`}
            >
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white text-black">
                <FaFacebookF className="text-sm" />
              </span>
              <span className="text-sm">FACEBOOK</span>
            </button>

            <button
              type="button"
              onClick={() => alert("Twitter registration is not connected yet.")}
              className={`${socialButtonClass} bg-sky-500 hover:bg-sky-600`}
            >
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white text-black">
                <FaTwitter className="text-sm" />
              </span>
              <span className="text-sm">TWITTER</span>
            </button>

            <button
              type="button"
              onClick={() => alert("Google registration is not connected yet.")}
              className={`${socialButtonClass} bg-red-500 hover:bg-red-600`}
            >
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white text-black">
                <FaGoogle className="text-sm" />
              </span>
              <span className="text-sm">GOOGLE</span>
            </button>
          </div>

          {/* Divider */}
          <div className="my-8 flex items-center gap-3 sm:my-10">
            <div className="flex-1 border-t border-slate-200 dark:border-slate-700" />

            <span className="whitespace-nowrap text-center text-sm text-slate-400 dark:text-slate-500">
              Or register with email
            </span>

            <div className="flex-1 border-t border-slate-200 dark:border-slate-700" />
          </div>

          {/* Registration form */}
          <Formik
            initialValues={{
              name: "",
              email: "",
              password: "",
              repeatPassword: "",
              terms: false,
            }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting, setFieldError }) => {
              try {
                saveRegisteredUser(values);
                alert("Registration successful");
                navigate("/signin");
              } catch (error) {
                setFieldError("email", error.message);
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-5">
                {/* Name */}
                <div>
                  <Field
                    type="text"
                    name="name"
                    placeholder="Name"
                    autoComplete="name"
                    className={inputClass}
                  />

                  <ErrorMessage
                    name="name"
                    component="p"
                    className="mt-2 text-sm text-red-500"
                  />
                </div>

                {/* Email */}
                <div>
                  <Field
                    type="email"
                    name="email"
                    placeholder="Email"
                    autoComplete="email"
                    className={inputClass}
                  />

                  <ErrorMessage
                    name="email"
                    component="p"
                    className="mt-2 text-sm text-red-500"
                  />
                </div>

                {/* Password fields */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <div className="relative">
                      <Field
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Password"
                        autoComplete="new-password"
                        className={`${inputClass} pr-11`}
                      />

                      <button
                        type="button"
                        onClick={() => setShowPassword((previous) => !previous)}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                        className="absolute right-4 top-1/2 z-10 -translate-y-1/2 cursor-pointer text-lg text-[#7C3AED] transition hover:text-[#4F46E5] dark:text-violet-400 dark:hover:text-violet-300"
                      >
                        {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
                      </button>
                    </div>

                    <ErrorMessage
                      name="password"
                      component="p"
                      className="mt-2 text-sm text-red-500"
                    />
                  </div>

                  <div>
                    <div className="relative">
                      <Field
                        type={showRepeatPassword ? "text" : "password"}
                        name="repeatPassword"
                        placeholder="Repeat Password"
                        autoComplete="new-password"
                        className={`${inputClass} pr-11`}
                      />

                      <button
                        type="button"
                        onClick={() =>
                          setShowRepeatPassword((previous) => !previous)
                        }
                        aria-label={
                          showRepeatPassword
                            ? "Hide repeat password"
                            : "Show repeat password"
                        }
                        className="absolute right-4 top-1/2 z-10 -translate-y-1/2 cursor-pointer text-lg text-[#7C3AED] transition hover:text-[#4F46E5] dark:text-violet-400 dark:hover:text-violet-300"
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
                      className="mt-2 text-sm text-red-500"
                    />
                  </div>
                </div>

                {/* Terms and submit */}
                <div className="flex flex-col gap-5 pt-5 sm:flex-row sm:items-center sm:justify-between">
                  <div className="min-w-0">
                    <label className="flex cursor-pointer items-start gap-3 text-sm">
                      <Field
                        type="checkbox"
                        name="terms"
                        className="mt-1 h-4 w-4 shrink-0 cursor-pointer accent-violet-600"
                      />

                      <span className="text-left text-slate-500 dark:text-slate-400">
                        I have read and accept the Terms of
                        <span className="whitespace-nowrap text-violet-600 dark:text-violet-400">
                          {" "}Service & Privacy Policy *
                        </span>
                      </span>
                    </label>

                    <ErrorMessage
                      name="terms"
                      component="p"
                      className="mt-2 text-sm text-red-500"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full shrink-0 cursor-pointer rounded-full bg-[#4F46E5] px-8 py-3 font-semibold text-white shadow-md transition hover:bg-[#4338CA] hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:px-10"
                  >
                    {isSubmitting ? "PLEASE WAIT..." : "CONTINUE"}
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
