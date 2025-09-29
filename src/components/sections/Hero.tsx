import React from 'react';
import { motion } from 'framer-motion';
import { Download, Github, Linkedin, Mail } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import cv from "../../../public/Samuvel_Resume.pdf"

const Hero: React.FC = () => {
  const { isDark } = useTheme();

  const socialLinks = [
    {
      icon: <Github size={24} />,
      href: 'https://github.com/samuvel1',
      label: 'GitHub'
    },
    {
      icon: <Linkedin size={24} />,
      href: 'https://www.linkedin.com/in/samuvel-tamilarasan-b-480805378/',
      label: 'LinkedIn'
    },
    {
      icon: <Mail size={24} />,
      href: 'mailto:samuvel1official@gmail.com',
      label: 'Email'
    }
  ];

  const handleDownloadResume = () => {
    // In a real implementation, this would link to your actual resume
    const link = document.createElement('a');
    link.href = cv; // You would place your resume in the public folder
    link.download = 'Samuvel_Tamilarasan_Resume.pdf';
    link.click();
  };

  return (
    <section
      id="home"
      className={`min-h-screen flex items-center justify-center relative overflow-hidden ${
        isDark ? 'bg-[#0d1117]' : 'bg-gradient-to-br from-blue-50 to-indigo-100'
      }`}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-64 h-64 rounded-full opacity-10 ${
              isDark ? 'bg-blue-400' : 'bg-blue-300'
            }`}
            animate={{
              x: [0, 100, -50, 0],
              y: [0, -100, 50, 0],
              rotate: [0, 360],
            }}
            transition={{
              duration: 20 + i * 5,
              repeat: Infinity,
              ease: 'linear',
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className={`text-4xl md:text-6xl lg:text-7xl font-bold mb-6 ${
              isDark ? 'text-white' : 'text-gray-800'
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            SAMUVEL
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              TAMILARASAN B
            </span>
          </motion.h1>

          <motion.p
            className={`text-xl md:text-2xl mb-4 ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Full Stack Developer & Software Engineer
          </motion.p>

          <motion.p
            className={`text-lg mb-8 max-w-2xl mx-auto ${
              isDark ? 'text-gray-400' : 'text-gray-500'
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            Passionate about creating innovative solutions and building scalable applications.
            Based in Udumalpet, Tamil Nadu.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleDownloadResume}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <Download className="mr-2" size={20} />
              Download Resume
            </motion.button>

            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`inline-flex items-center px-6 py-3 font-medium rounded-lg transition-all duration-200 ${
                isDark
                  ? 'bg-[#21262d] text-white hover:bg-[#30363d]'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              } shadow-lg hover:shadow-xl`}
            >
              Get In Touch
            </motion.a>
          </motion.div>

          <motion.div
            className="flex items-center justify-center space-x-6 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.8 }}
          >
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, y: -2 }}
                whileTap={{ scale: 0.9 }}
                className={`p-3 rounded-lg transition-colors ${
                  isDark
                    ? 'bg-[#21262d] text-gray-300 hover:text-white hover:bg-[#30363d]'
                    : 'bg-white text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                } shadow-lg hover:shadow-xl`}
                aria-label={social.label}
              >
                {social.icon}
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;