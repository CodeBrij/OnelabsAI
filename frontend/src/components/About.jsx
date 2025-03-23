import React, { useRef, useEffect } from "react";
import Typed from "typed.js";
import { motion, useInView } from "framer-motion"; // Import framer-motion for animations

const services = [
  {
    icon: "🌟", // You can replace this with an icon component like React Icons
    title: "AI-Powered Interviews",
    info: "Conduct interviews with the help of AI to ensure unbiased and efficient hiring processes."
  },
  {
    icon: "📊", // You can replace this with an icon component like React Icons
    title: "Analytics & Insights",
    info: "Get detailed analytics and insights into candidate performance to make informed decisions."
  },
  {
    icon: "🤖", // You can replace this with an icon component like React Icons
    title: "Automated Scheduling",
    info: "Automate interview scheduling to save time and streamline the hiring process."
  },
  {
    icon: "🔒", // You can replace this with an icon component like React Icons
    title: "Secure & Reliable",
    info: "Our platform ensures data security and reliability for all your hiring needs."
  },
  {
    icon: "📝", // You can replace this with an icon component like React Icons
    title: "Customizable Assessments",
    info: "Create and customize assessments tailored to your company's requirements."
  },
  {
    icon: "📞", // You can replace this with an icon component like React Icons
    title: "24/7 Support",
    info: "Our support team is available round the clock to assist you with any queries."
  }
];

const About = () => {
  // Create a reference for the Typed instance
  const typedRef = useRef(null);

  useEffect(() => {
    // Initialize Typed.js
    const typed = new Typed(typedRef.current, {
      strings: [
        "Industry Experts",
        "AI-Powered Recruitment",
        "Smarter Hiring",
        "Data-Driven Decisions",
      ],
      typeSpeed: 50,
      backSpeed: 30,
      loop: true,
    });

    // Cleanup on unmount
    return () => {
      typed.destroy();
    };
  }, []);

  // Animation variants for cards
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  };

  // Hook to detect when cards are in view
  const cardRefs = services.map(() => useRef(null));
  const cardInView = cardRefs.map((ref) => useInView(ref, { once: true }));

  return (
    <>
      {/* Typed Section */}
      <div className="max-w-4xl mb-10 mt-10 pt-20 sm:pt-70 px-10 xl:mx-25 relative z-10">
        <h1 className="text-4xl font-bold text-gray-900">
          <span className="text-gray-900">
            Simplifying Hiring for a Complex World
          </span>
          <br />
          We believe in <span className="text-[#d40000]" ref={typedRef}></span>
        </h1>

        <p className="text-gray-600 text-lg mt-4">
          At Hire360.ai, we are revolutionizing the recruitment landscape with cutting-edge AI. Our platform streamlines hiring by integrating AI-driven interviews, multi-modal candidate assessments, and intelligent scoring systems to ensure recruiters find the best talent efficiently.
        </p>
      </div>

      {/* Services Section */}
      <section className="bg-white min-h-screen flex flex-col items-center justify-center px-10 py-20 relative z-10">
        <div className="w-full max-w-7xl px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={index}
                ref={cardRefs[index]}
                variants={cardVariants}
                initial="hidden"
                animate={cardInView[index] ? "visible" : "hidden"}
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="text-4xl mb-4 text-[#d40000]">
                  {service.icon}
                </div>
                <h2 className="text-xl font-bold mb-2 text-gray-900">
                  {service.title}
                </h2>
                <p className="text-gray-600">{service.info}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CSS for Background Animation */}
      <style>
        {`
          @keyframes moveBackground {
            0% {
              background-position: 0 0;
            }
            100% {
              background-position: 100% 100%;
            }
          }
        `}
      </style>
    </>
  );
};

export default About;