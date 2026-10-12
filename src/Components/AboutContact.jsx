import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const contactSchema = Yup.object({
  name: Yup.string().min(2, "Name is too short").required("Name is required"),

  email: Yup.string()
    .email("Enter a valid email")
    .required("Email is required"),

  phone: Yup.string()
    .matches(/^[0-9]{10}$/, "Phone must be 10 digits")
    .required("Phone is required"),

  message: Yup.string()
    .min(10, "Please add a few more details")
    .required("Message is required"),

  terms: Yup.boolean().oneOf([true], "Please accept the terms to continue"),
});

const AboutContact = () => {
  return (
    <div className="overflow-hidden bg-slate-50 py-14 lg:py-20">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-6 px-6 lg:grid-cols-[1fr_1.2fr] lg:gap-8">
        {/* About Us Section */}
        <section
          id="about"
          className="scroll-mt-24 rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_20px_40px_rgba(15,23,42,0.04)] lg:p-8"
        >
          <p className="inline-flex rounded-full border border-violet-200 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-blue-700 shadow-sm">
            About Us
          </p>

          <h2 className="mt-4 text-3xl font-black text-slate-900">
            Built to support learning, communication, and growth.
          </h2>

          <p className="mt-5 max-w-4xl text-base leading-8 text-slate-600">
            We help schools manage daily operations with less complexity and
            more clarity. From student records to communication and scheduling,
            our platform keeps the essentials in one place so staff can focus on
            teaching and student success.
          </p>

          <ul className="mt-8 space-y-4 text-sm text-slate-700">
            <li className="flex items-start gap-3">
              <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-green-500" />
              Simplify everyday school administration
            </li>

            <li className="flex items-start gap-3">
              <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-green-500" />
              Keep teams informed through connected workflows
            </li>

            <li className="flex items-start gap-3">
              <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-green-500" />
              Make decisions with consistent, accessible data
            </li>
          </ul>
        </section>

        {/* Contact Section */}
        <section
          id="contact"
          className="scroll-mt-24 rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_20px_40px_rgba(15,23,42,0.04)] lg:p-8"
        >
          <p className="inline-flex rounded-full border border-violet-200 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-blue-700 shadow-sm">
            Contact
          </p>

          <h2 className="mt-4 text-3xl font-black text-slate-900">
            Tell us what your school needs.
          </h2>

          <p className="mt-3 text-sm leading-7 text-slate-600">
            Have a question about SchoolFlow? Complete the form below to share
            your requirements.
          </p>

          <Formik
            initialValues={{
              name: "",
              email: "",
              phone: "",
              message: "",
              terms: false,
            }}
            validationSchema={contactSchema}
            onSubmit={(values, { resetForm }) => {
              console.log("Contact form submitted", values);
              alert("Your message has been sent successfully.");
              resetForm();
            }}
          >
            <Form className="mt-8 space-y-5">
              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <Field
                    name="name"
                    type="text"
                    placeholder="Your name"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:bg-white"
                  />

                  <ErrorMessage
                    name="name"
                    component="p"
                    className="mt-1 text-xs text-red-500"
                  />
                </div>

                <div>
                  <Field
                    name="email"
                    type="email"
                    placeholder="Email address"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:bg-white"
                  />

                  <ErrorMessage
                    name="email"
                    component="p"
                    className="mt-1 text-xs text-red-500"
                  />
                </div>
              </div>

              <div>
                <Field
                  name="phone"
                  type="tel"
                  placeholder="Phone number"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:bg-white"
                />

                <ErrorMessage
                  name="phone"
                  component="p"
                  className="mt-1 text-xs text-red-500"
                />
              </div>

              <div>
                <Field
                  as="textarea"
                  name="message"
                  rows="5"
                  placeholder="How can we help?"
                  className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:bg-white"
                />

                <ErrorMessage
                  name="message"
                  component="p"
                  className="mt-1 text-xs text-red-500"
                />
              </div>

              <div>
                <label className="flex items-start gap-3 text-sm text-slate-600">
                  <Field
                    type="checkbox"
                    name="terms"
                    className="mt-1 h-4 w-4 accent-blue-600"
                  />

                  <span>I agree to the terms and privacy policy.</span>
                </label>

                <ErrorMessage
                  name="terms"
                  component="p"
                  className="mt-1 text-xs text-red-500"
                />
              </div>

              <button
                type="submit"
                className="inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/30 transition hover:from-blue-700 hover:to-indigo-700"
              >
                Send Message
              </button>
            </Form>
          </Formik>
        </section>
      </div>
    </div>
  );
};

export default AboutContact;
