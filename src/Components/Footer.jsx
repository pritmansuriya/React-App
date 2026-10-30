import React from "react";
import logo from "../assets/SchoolLogo.png";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";

const Footer = () => {
  const footerGroups = [
    {
      title: "Company",
      links: [
        { name: "About Us", href: "#about" },
        {
          name: "My Portfolio",
          href: "https://prit-portfolio-r61gbvr4t-prit23.vercel.app/",
        },
        { name: "GitHub", href: "https://github.com/pritmansuriya/" },
        { name: "Contact", href: "#contact" },
      ],
    },
    {
      title: "Features",
      links: [
        { name: "Student Records", href: "#feature2" },
        { name: "Attendance", href: "#attendance" },
        { name: "Reports", href: "#reports" },
        { name: "Scheduling", href: "#scheduling" },
      ],
    },
    {
      title: "Support",
      links: [
        { name: "Help Center", href: "#help" },
        { name: "Privacy Policy", href: "#privacy" },
        { name: "Terms", href: "#terms" },
        { name: "Accessibility", href: "#accessibility" },
      ],
    },
  ];

  const socialLinks = [
    {
      icon: <FaFacebookF />,
      label: "Facebook",
      href: "https://facebook.com",
    },
    {
      icon: <FaLinkedinIn />,
      label: "LinkedIn",
      href: "https://linkedin.com",
    },
    {
      icon: <FaTwitter />,
      label: "Twitter",
      href: "https://twitter.com",
    },
    {
      icon: <FaInstagram />,
      label: "Instagram",
      href: "https://instagram.com",
    },
  ];

  return (
    <footer
      id="footer"
      className="bg-slate-100 py-14 text-slate-700 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-200 lg:py-20"
    >
      <div className="mx-auto max-w-7xl px-6">
        {/* Brand and Social Links */}
        <div className="flex flex-col gap-8 border-b border-slate-200 pb-10 transition-colors duration-300 dark:border-slate-800 lg:flex-row lg:items-end lg:justify-between lg:gap-10 lg:pb-12">
          <div>
            <div className="flex items-center gap-3">
              <img
                src={logo}
                alt="SchoolFlow logo"
                className="h-12 w-12 object-contain"
              />

              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  SchoolFlow
                </h3>

                <p className="text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                  Management
                </p>
              </div>
            </div>

            <p className="mt-5 max-w-md text-left text-sm leading-7 text-slate-600 dark:text-slate-400">
              A smarter workspace for school administration, communication, and
              student success.
            </p>
          </div>

          {/* Social Media */}
          <div className="flex items-center gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-300 bg-white text-lg text-slate-700 transition-all duration-200 hover:border-blue-500 hover:bg-blue-50 hover:text-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:hover:border-blue-500 dark:hover:bg-slate-800 dark:hover:text-blue-400"
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Footer Links */}
        <div className="mt-10 grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:mt-12 lg:grid-cols-4 lg:gap-10">
          {footerGroups.map((group) => (
            <div key={group.title}>
              <h4 className="text-left text-sm font-semibold uppercase tracking-[0.2em] text-slate-900 dark:text-white">
                {group.title}
              </h4>

              <ul className="mt-5 space-y-3 text-left text-sm text-slate-600 dark:text-slate-400">
                {group.links.map((link) => {
                  const isExternal = link.href.startsWith("https://");

                  return (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        target={isExternal ? "_blank" : undefined}
                        rel={
                          isExternal ? "noopener noreferrer" : undefined
                        }
                        className="cursor-pointer transition-colors duration-200 hover:text-blue-600 focus-visible:outline-none focus-visible:underline dark:hover:text-blue-400"
                      >
                        {link.name}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}

          {/* Contact Information */}
          <div>
            <h4 className="text-left text-sm font-semibold uppercase tracking-[0.2em] text-slate-900 dark:text-white">
              Contact
            </h4>

            <ul className="mt-5 space-y-3 text-left text-sm text-slate-600 dark:text-slate-400">
              <li>
                <a
                  href="mailto:pritmansuriya@gmail.com"
                  className="break-words transition-colors hover:text-blue-600 dark:hover:text-blue-400"
                >
                  pritmansuriya@gmail.com
                </a>
              </li>

              <li>
                <a
                  href="tel:+916356324903"
                  className="transition-colors hover:text-blue-600 dark:hover:text-blue-400"
                >
                  +91 6356324903
                </a>
              </li>

              <li>245 Learning Avenue, Suite 300</li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-10 flex flex-col gap-4 border-t border-slate-200 pt-6 text-sm text-slate-500 transition-colors duration-300 dark:border-slate-800 dark:text-slate-400 sm:flex-row sm:items-center sm:justify-between lg:mt-12">
          <p>© 2026 SchoolFlow. All rights reserved.</p>

          <div className="flex flex-wrap gap-5">
            <a
              href="#privacy"
              className="cursor-pointer transition-colors hover:text-blue-600 dark:hover:text-blue-400"
            >
              Privacy
            </a>

            <a
              href="#terms"
              className="cursor-pointer transition-colors hover:text-blue-600 dark:hover:text-blue-400"
            >
              Terms
            </a>

            <a
              href="#cookies"
              className="cursor-pointer transition-colors hover:text-blue-600 dark:hover:text-blue-400"
            >
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
