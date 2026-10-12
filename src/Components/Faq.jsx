import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import newsImage from "../assets/News.png";
import eventImage from "../assets/Event.png";

const eventData = [
  {
    image: newsImage,
    tag: "Event",
    title: "Admissions Open 2026",
    date: "14 Oct 2026",
    description:
      "School tours and registration support begin this month for new families planning the academic year ahead.",
  },
  {
    image: eventImage,
    tag: "News",
    title: "Wellbeing Week Highlights",
    date: "22 Oct 2026",
    description:
      "Our community initiatives focused on student wellbeing, teacher support, and healthier daily routines across campus.",
  },
  {
    image: newsImage,
    tag: "Event",
    title: "Parent Workshop Series",
    date: "05 Nov 2026",
    description:
      "A practical series covering student success habits, communication, and school planning for the new term.",
  },
];

const contactSchema = Yup.object({
  name: Yup.string().min(2, "Name is too short").required("Name is required"),
  email: Yup.string().email("Enter a valid email").required("Email is required"),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, "Phone must be 10 digits")
    .required("Phone is required"),
  message: Yup.string().min(10, "Please add a few more details").required("Message is required"),
  terms: Yup.boolean().oneOf([true], "Please accept the terms to continue"),
});

const Faq = () => {
  return (
    <section id="faq" className="overflow-hidden bg-slate-50 py-14 lg:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-10 text-center lg:mb-12">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">News & Events</p>
          <h2 className="mt-4 text-4xl font-black text-slate-900 sm:text-5xl">Stay connected with the school community.</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {eventData.map((item) => (
            <article
              key={item.title}
              className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_20px_40px_rgba(15,23,42,0.04)] transition duration-200 hover:-translate-y-0.5"
            >
              <img src={item.image} alt={item.title} className="h-52 w-full object-cover" />
              <div className="p-6">
                <div className="flex items-center justify-between gap-4">
                  <span className="rounded-full bg-blue-50 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-blue-700">
                    {item.tag}
                  </span>
                  <span className="text-xs font-medium text-slate-500">{item.date}</span>
                </div>
                <h3 className="mt-4 text-xl font-bold text-slate-900">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{item.description}</p>
                <button className="mt-5 text-sm font-semibold text-blue-700 transition hover:text-blue-900">
                  Read more
                </button>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-14 grid gap-6 lg:mt-20 lg:grid-cols-[1fr_1.2fr] lg:items-start lg:gap-8">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_20px_40px_rgba(15,23,42,0.04)] lg:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">About us</p>
            <h3 className="mt-4 text-3xl font-black text-slate-900">Built to support learning, communication, and growth.</h3>
            <p className="mt-5 text-base leading-8 text-slate-600">
              We help schools manage daily operations with less complexity and more clarity. From student records to communication and scheduling, our platform keeps the essentials in one place so staff can focus on teaching and student success.
            </p>
            <ul className="mt-8 space-y-4 text-sm text-slate-700">
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2.5 w-2.5 rounded-full bg-green-500" />
                Simplify everyday school administration
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2.5 w-2.5 rounded-full bg-green-500" />
                Keep teams informed through connected workflows
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2.5 w-2.5 rounded-full bg-green-500" />
                Make decisions with consistent, accessible data
              </li>
            </ul>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_20px_40px_rgba(15,23,42,0.04)] lg:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">Contact</p>
            <h3 className="mt-4 text-3xl font-black text-slate-900">Tell us what your school needs.</h3>

            <Formik
              initialValues={{ name: "", email: "", phone: "", message: "", terms: false }}
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
                    <ErrorMessage name="name" component="p" className="mt-1 text-xs text-red-500" />
                  </div>

                  <div>
                    <Field
                      name="email"
                      type="email"
                      placeholder="Email address"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:bg-white"
                    />
                    <ErrorMessage name="email" component="p" className="mt-1 text-xs text-red-500" />
                  </div>
                </div>

                <div>
                  <Field
                    name="phone"
                    type="tel"
                    placeholder="Phone number"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:bg-white"
                  />
                  <ErrorMessage name="phone" component="p" className="mt-1 text-xs text-red-500" />
                </div>

                <div>
                  <Field
                    as="textarea"
                    name="message"
                    rows="5"
                    placeholder="How can we help?"
                    className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:bg-white"
                  />
                  <ErrorMessage name="message" component="p" className="mt-1 text-xs text-red-500" />
                </div>

                <label className="flex items-start gap-3 text-sm text-slate-600">
                  <Field type="checkbox" name="terms" className="mt-1 h-4 w-4 accent-blue-600" />
                  <span>I agree to the terms and privacy policy.</span>
                </label>
                <ErrorMessage name="terms" component="p" className="mt-1 text-xs text-red-500" />

                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/30 transition hover:from-blue-700 hover:to-indigo-700"
                >
                  Send Message
                </button>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Faq;
