import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Model from "./Model";
import close from "../assets/Close.png";
import { useNavigate } from "react-router-dom";


const validationSchema = Yup.object({
  name: Yup.string()
    .min(3, "Name must be at least 3 characters")
    .required("Name is required"),

  email: Yup.string().email("Invalid email").required("Email is required"),

  phone: Yup.string()
    .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
    .required("Phone number is required"),

  company: Yup.string().required("Company is required"),

  message: Yup.string()
    .min(10, "Message must be at least 10 characters")
    .required("Message is required"),

  terms: Yup.boolean().oneOf([true], "Please accept Terms & Privacy Policy"),
});

export const Contact = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  return (
    <Model isOpen={isOpen} onClose={onClose}>
      {/* Close */}

      <div className="px-16 py-14 ">
        <div className="flex flex-col items-center">
          <h2 className="text-white text-5xl text-center font-bold mb-4">
            Say Hello to Us
          </h2>

          <p className=" w-full max-w-162 text-center text-white/90 text-lg leading-8">
            Aenean sit amet magna vel magna fringilla fermentum. Donec sit amet
            nulla sed arcu pulvinar ultricies commodo id ligula.
          </p>
        </div>

        <Formik
          initialValues={{
            name: "",
            email: "",
            phone: "",
            company: "",
            message: "",
            terms: false,
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => {
            localStorage.setItem("contactData", JSON.stringify(values));

            alert("Message Sent Successfully");
            onClose();
            navigate("/info1");
            resetForm();
          }}
        >
          <Form className="mt-12">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Name */}

              <div>
                <Field
                  type="text"
                  name="name"
                  placeholder="What is your name? *"
                  className="w-full bg-transparent border border-purple-300 rounded-lg px-5 py-3 text-white placeholder-gray-300 outline-none focus:border-lime-400"
                />

                <ErrorMessage
                  name="name"
                  component="p"
                  className="text-red-300 text-sm mt-1"
                />
              </div>

              {/* Email */}

              <div>
                <Field
                  type="email"
                  name="email"
                  placeholder="What is your email? *"
                  className="w-full bg-transparent border border-purple-300 rounded-lg px-5 py-3 text-white placeholder-gray-300 outline-none focus:border-lime-400"
                />

                <ErrorMessage
                  name="email"
                  component="p"
                  className="text-red-300 text-sm mt-1"
                />
              </div>

              {/* Phone */}

              <div>
                <Field
                  type="text"
                  name="phone"
                  placeholder="What is your phone number?"
                  className="w-full bg-transparent border border-purple-300 rounded-lg px-5 py-3 text-white placeholder-gray-300 outline-none focus:border-lime-400"
                />

                <ErrorMessage
                  name="phone"
                  component="p"
                  className="text-red-300 text-sm mt-1"
                />
              </div>

              {/* Company */}

              <div>
                <Field
                  type="text"
                  name="company"
                  placeholder="What is your company?"
                  className="w-full bg-transparent border border-purple-300 rounded-lg px-5 py-3 text-white placeholder-gray-300 outline-none focus:border-lime-400"
                />

                <ErrorMessage
                  name="company"
                  component="p"
                  className="text-red-300 text-sm mt-1"
                />
              </div>
            </div>

            {/* Message */}

            <div className="mt-6">
              <Field
                as="textarea"
                rows="5"
                name="message"
                placeholder="Write your message here"
                className="w-full bg-transparent border border-purple-300 rounded-lg px-5 py-4 text-white placeholder-gray-300 outline-none resize-none focus:border-lime-400"
              />

              <ErrorMessage
                name="message"
                component="p"
                className="text-red-300 text-sm mt-1"
              />
            </div>

            {/* Bottom */}

            <div className="flex flex-col lg:flex-row justify-between items-center mt-8 gap-6">
              <div>
                <label className="flex items-start gap-3">
                  <Field
                    type="checkbox"
                    name="terms"
                    className="accent-lime-500 mt-1 w-5 h-5 cursor-pointer"
                  />

                  <span className="text-gray-200">
                    I have read and accept the Terms of
                    <span className="text-lime-400">
                      {" "}
                      Service & Privacy Policy *
                    </span>
                  </span>
                </label>

                <ErrorMessage
                  name="terms"
                  component="p"
                  className="text-red-300 text-sm mt-2"
                />
              </div>

              <button
                type="submit"
                className="bg-lime-400 hover:bg-gray-900   transition text-white font-semibold rounded-full px-10 py-3"
              >
                SEND MESSAGE
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </Model>
  );
};

export default Contact;
