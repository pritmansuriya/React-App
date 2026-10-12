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
      links: ["About us", "Careers", "Contact", "Resources"],
    },
    {
      title: "Features",
      links: ["Student records", "Attendance", "Reports", "Scheduling"],
    },
    {
      title: "Support",
      links: ["Help center", "Privacy policy", "Terms", "Accessibility"],
    },
  ];

  const socialLinks = [
    { icon: <FaFacebookF />, label: "Facebook", href: "https://facebook.com" },
    { icon: <FaLinkedinIn />, label: "LinkedIn", href: "https://linkedin.com" },
    { icon: <FaTwitter />, label: "Twitter", href: "https://twitter.com" },
    { icon: <FaInstagram />, label: "Instagram", href: "https://instagram.com" },
  ];

  return (
    <footer id="footer" className="bg-slate-950 py-14 text-slate-200 lg:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col gap-8 border-b border-slate-800 pb-10 lg:flex-row lg:items-end lg:justify-between lg:gap-10 lg:pb-12">
          <div>
            <div className="flex items-center gap-3">
              <img src={logo} alt="School management logo" className="h-12 w-12 object-contain" />
              <div>
                <h3 className="text-xl font-bold text-white">SchoolFlow</h3>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Management</p>
              </div>
            </div>
            <p className="mt-5 max-w-md text-left text-sm leading-7 text-slate-400">
              A smarter workspace for school administration, communication, and student success.
            </p>
          </div>

          <div className="flex items-center gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                aria-label={link.label}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-700 bg-slate-900 text-lg text-white transition-colors duration-200 hover:border-blue-500 hover:text-blue-400"
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-10 grid gap-8 md:grid-cols-3 lg:mt-12 lg:grid-cols-4 lg:gap-10">
          {footerGroups.map((group) => (
            <div key={group.title}>
              <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-white">{group.title}</h4>
              <ul className="mt-5 space-y-3 text-sm text-slate-400">
                {group.links.map((link) => (
                  <li key={link} className="transition hover:text-white">
                    <a href="#" className="cursor-pointer">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-white">Contact</h4>
            <ul className="mt-5 space-y-3 text-sm text-slate-400">
              <li>pritmansuriya@gmail.com</li>
              <li>+91 6356324903</li>
              <li>245 Learning Avenue, Suite 300</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-slate-800 pt-6 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between lg:mt-12">
          <p>© 2026 SchoolFlow. All rights reserved.</p>
          <div className="flex gap-5">
            <a className="transition hover:text-white">Privacy</a>
            <a className="transition hover:text-white">Terms</a>
            <a  className="transition hover:text-white">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
