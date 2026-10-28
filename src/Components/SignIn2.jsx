import { useState } from "react";
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
  email: Yup.string()
    .email("Please enter a valid email address.")
    .required("Email is required."),
  password: Yup.string().required("Password is required."),
});

const SignIn2 = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (values, { setStatus, setSubmitting }) => {
    setStatus(undefined);

    try {
      const savedUsers = JSON.parse(localStorage.getItem("users") || "[]");

      const users = Array.isArray(savedUsers)
        ? savedUsers
        : savedUsers?.email
          ? [savedUsers]
          : [];

      const email = values.email.trim().toLowerCase();

      const storedUser = users.find(
        (user) =>
          user.email?.trim().toLowerCase() === email &&
          user.password === values.password
      );

      if (!storedUser) {
        setStatus("Invalid email or password.");
        return;
      }

      const loggedInUser = {
        id: storedUser.id,
        name: storedUser.name || "",
        email: storedUser.email,
      };

      localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));

      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      setStatus("Unable to log in. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    "w-full min-w-0 rounded-lg border border-slate-200 bg-white px-4 py-3 text-slate-800 outline-none transition placeholder:text-slate-400 hover:border-violet-300 focus:border-[#7C3AED] focus:ring-4 focus:ring-violet-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-400 dark:hover:border-violet-500 dark:focus:border-violet-400 dark:focus:ring-violet-500/20";

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-[#EDE9FE] via-[#F5F3FF] to-[#E0E7FF] px-3 py-5 transition-colors duration-300 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950 sm:px-5 sm:py-10">
      {/* Background decorations */}
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-violet-400/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-indigo-400/20 blur-3xl" />

      {/* Main card */}
      <div className="animate-modal relative z-10 grid w-full max-w-6xl grid-cols-1 overflow-hidden rounded-2xl border border-white/80 bg-white shadow-[0_25px_80px_rgba(79,70,229,0.18)] transition-colors duration-300 dark:border-slate-700 dark:bg-slate-900 dark:shadow-black/30 sm:rounded-[30px] lg:grid-cols-2">
        {/* Left panel */}
        <div className="relative flex min-h-[260px] flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[#7C3AED] via-[#6D28D9] to-[#4F46E5] px-5 py-10 text-white sm:min-h-[300px] sm:px-10 sm:py-14 lg:min-h-[600px]">
          <div className="pointer-events-none absolute -bottom-20 -left-16 h-64 w-64 rounded-full bg-fuchsia-400/20 blur-3xl" />
          <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-indigo-300/20 blur-3xl" />

          {/* Close button */}
          <button
            type="button"
            onClick={() => navigate("/")}
            aria-label="Return to home"
            className="absolute left-5 top-5 z-20 text-2xl transition hover:rotate-90 hover:text-violet-200 sm:left-8 sm:top-8 sm:text-3xl"
          >
            <FaTimes />
          </button>

          {/* Logo */}
          <img
            src={logo}
            alt="SchoolFlow logo"
            className="relative z-10 w-20 rounded-lg bg-white p-2 shadow-lg sm:w-24"
          />

          <h2 className="relative z-10 mt-8 text-center text-3xl font-semibold tracking-tight sm:mt-12 sm:text-4xl lg:text-[42px]">
            Welcome back
          </h2>

          <p className="relative z-10 mt-3 text-center text-base text-violet-100 sm:text-lg">
            Please login to continue
          </p>

          <div className="absolute bottom-0 left-0 h-1.5 w-full bg-gradient-to-r from-fuchsia-300 via-violet-200 to-indigo-300" />
        </div>

        {/* Right panel */}
        <div className="relative z-10 min-w-0 border-l border-slate-100 bg-white px-5 py-8 transition-colors duration-300 dark:border-slate-700 dark:bg-slate-900 sm:px-8 sm:py-10 lg:px-12">
          {/* Header */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-3xl font-bold tracking-tight text-slate-800 dark:text-white sm:text-4xl lg:text-5xl">
              Sign In
            </h2>

            <Link
              to="/register"
              className="flex items-center gap-2 text-sm text-[#7C3AED] transition hover:text-[#4F46E5] dark:text-violet-400 dark:hover:text-violet-300 sm:text-base"
            >
              <IoArrowForward className="shrink-0 text-xl" />
              <span>Create new account</span>
            </Link>
          </div>

          {/* Social buttons */}
          <div className="mt-8 grid grid-cols-1 gap-3 sm:mt-10 sm:grid-cols-3">
            <button
              type="button"
              onClick={() => alert("Facebook login is not connected yet.")}
              className="flex items-center justify-center gap-2 rounded-full bg-blue-600 px-3 py-2.5 text-white transition hover:bg-blue-700"
            >
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white text-black">
                <FaFacebookF className="text-sm" />
              </span>
              <span className="text-xs sm:text-sm">FACEBOOK</span>
            </button>

            <button
              type="button"
              onClick={() => alert("Twitter login is not connected yet.")}
              className="flex items-center justify-center gap-2 rounded-full bg-sky-500 px-3 py-2.5 text-white transition hover:bg-sky-600"
            >
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white text-black">
                <FaTwitter className="text-sm" />
              </span>
              <span className="text-xs sm:text-sm">TWITTER</span>
            </button>

            <button
              type="button"
              onClick={() => alert("Google login is not connected yet.")}
              className="flex items-center justify-center gap-2 rounded-full bg-red-500 px-3 py-2.5 text-white transition hover:bg-red-600"
            >
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white text-black">
                <FaGoogle className="text-sm" />
              </span>
              <span className="text-xs sm:text-sm">GOOGLE</span>
            </button>
          </div>

          {/* Divider */}
          <div className="my-8 flex items-center gap-3 sm:my-10">
            <div className="flex-1 border-t border-slate-200 dark:border-slate-700" />

            <span className="whitespace-nowrap text-center text-xs text-slate-400 dark:text-slate-500 sm:text-sm">
              Or sign in with email
            </span>

            <div className="flex-1 border-t border-slate-200 dark:border-slate-700" />
          </div>

          {/* Login form */}
          <Formik
            initialValues={{
              email: "",
              password: "",
              terms: false,
            }}
            validationSchema={validationSchema}
            onSubmit={handleLogin}
          >
            {({ status, isSubmitting }) => (
              <Form className="space-y-5">
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

                {/* Password */}
                <div>
                  <div className="relative">
                    <Field
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Password"
                      autoComplete="current-password"
                      className={`${inputClass} pr-12`}
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword((current) => !current)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-lg text-[#7C3AED] transition hover:text-[#4F46E5] dark:text-violet-400 dark:hover:text-violet-300"
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

                {/* Remember me and forgot password */}
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                    <Field
                      type="checkbox"
                      name="terms"
                      className="h-4 w-4 cursor-pointer accent-[#7C3AED]"
                    />
                    <span>Remember me</span>
                  </label>

                  <button
                    type="button"
                    onClick={() => alert("Password reset is not connected yet.")}
                    className="text-left text-sm text-[#7C3AED] transition hover:text-[#4F46E5] dark:text-violet-400 dark:hover:text-violet-300"
                  >
                    Forgot password?
                  </button>
                </div>

                {/* Login error */}
                {status && (
                  <p
                    role="alert"
                    className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600 dark:border dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-300"
                  >
                    {status}
                  </p>
                )}

                {/* Submit */}
                <div className="pt-3 sm:pt-5">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full cursor-pointer rounded-full bg-gradient-to-r from-[#7C3AED] to-[#4F46E5] px-6 py-3.5 font-semibold text-white shadow-lg shadow-indigo-200/70 transition duration-300 hover:-translate-y-0.5 hover:from-violet-700 hover:to-indigo-700 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-violet-200 disabled:cursor-not-allowed disabled:opacity-60 dark:shadow-black/20 dark:focus:ring-violet-500/30"
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

export default SignIn2;
