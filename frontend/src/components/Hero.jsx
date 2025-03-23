import React, { useState } from "react"; // Import useState for mobile menu toggle
import { motion } from "framer-motion";
import hero from "/hero.webp";
import logo from "/logo.png";
import { FaStar } from "react-icons/fa";
import {useNavigate} from "react-router-dom";

const Hero = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for mobile menu toggle
  const navigate = useNavigate();
  // Animation variants for left content
  const leftVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  // Animation variants for right content
  const rightVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <>
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
  <img
    className="w-full h-full object-contain"
    src={hero}
    alt="AI Interview"
  />
        <div className="absolute inset-0 bg-indigo-900/60"></div>{" "}
        {/* Dark Overlay */}
      </div>

      {/* Navbar */}
      <nav className="bg-white border-gray-200 white fixed top-0 left-0 w-full z-50 shadow-md">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          {/* Logo */}
          <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src={logo} className="h-8" alt="Logo" />
          </a>

          {/* Hamburger Icon (Right Side) */}
          <button
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            onClick={() => setIsMenuOpen(!isMenuOpen)} // Toggle mobile menu
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>

          {/* Nav Links (Desktop) */}
          <div className="hidden w-full md:flex md:w-auto md:items-center" id="navbar-default">
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              {[
                "Home",
                "About",
                "Contact",
              ].map((item, index) => (
                <li key={index}>
                  <a
                    href={`#${item.toLowerCase()}`}  
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-[#d40000] hover:text-white md:hover:bg-transparent md:border-0 md:hover:text-[#d40000] md:p-0 dark:text-white md:dark:hover:text-[#d40000] dark:hover:bg-[#d40000] dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
            {/* Contact Us Button (Desktop) */}
            <div className="md:ml-4">
              <button className="bg-[#d40000] px-4 py-2 rounded-md text-white text-sm font-medium hover:bg-[#b00000] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#d40000]" onClick={() => navigate('/login')}>
              SignUp/Login
              </button>
            </div>
          </div>

          {/* Mobile Menu (Hidden by Default) */}
          {isMenuOpen && (
            <div className="w-full md:hidden" id="navbar-mobile">
              <ul className="font-medium flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                {[
                  "Home",
                "About",
                "Contact",
                ].map((item, index) => (
                  <li key={index}>
                    <a
                      href={`#${item.toLowerCase()}`}
                      className="block py-2 px-3 text-gray-900 rounded hover:bg-[#d40000] hover:text-white dark:text-white dark:hover:bg-[#d40000] dark:hover:text-white"
                    >
                      {item}
                    </a>
                  </li>
                ))}
                {/* Contact Us Button (Mobile) */}
                <li>
                  <button className="w-full bg-[#d40000] px-4 py-2 rounded-md text-white text-sm font-medium hover:bg-[#b00000] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#d40000] mt-2" onClick={()=>{
                    navigate('/login')
                  }}>
                  SignUp/Login
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Content */}
      <div className="pt-60 lg:px-16 px-4 pb-4 h-full flex flex-col sm:flex-row sm:items-center text-white">
        {/* Left Content with Animation */}
        <motion.div
          className="w-full flex flex-col z-10"
          variants={leftVariants}
          initial="hidden"
          animate="visible"
        >
          <h4 className="text-sm font-semibold text-balck xl:text-xl">
            We manage your interviews,
          </h4>
          <h4 className="text-sm font-semibold text-white xl:text-xl">
            so you can manage your business.
          </h4>
          <h1 className="2xl:text-5xl md:text-6xl sm:text-4xl text-3xl font-semibold font-serif mt-6">
            We are
          </h1>
          <h1 className="2xl:text-8xl md:text-6xl sm:text-4xl text-3xl font-semibold font-serif">
            Hire360.ai
          </h1>

          <p className="lg:w-[70%] w-full text-white text-md mt-4 md:text-lg 2xl:text-2xl">
            Take charge of your interviews with the assistance of AI
          </p>

          
        </motion.div>

        {/* Right Content with Animation */}
        

      </div>
    </>
  );
};

export default Hero;