import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import { Code, Database, Globe, Smartphone } from 'lucide-react';

const About: React.FC = () => {
  const { isDark } = useTheme();

  const highlights = [
    {
      icon: <Code size={24} />,
      title: 'Full Stack Development',
      description: 'Experienced in both frontend and backend technologies'
    },
    {
      icon: <Database size={24} />,
      title: 'Database Design',
      description: 'Proficient in SQL and NoSQL database management'
    },
    {
      icon: <Globe size={24} />,
      title: 'Web Technologies',
      description: 'Modern web development with latest frameworks'
    },
    {
      icon: <Smartphone size={24} />,
      title: 'Mobile Development',
      description: 'Cross-platform mobile application development'
    }
  ];

  return (
    <section
      id="about"
      className={`py-20 ${isDark ? 'bg-[#0d1117]' : 'bg-white'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${
            isDark ? 'text-white' : 'text-gray-800'
          }`}>
            About Me
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto"></div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className={`p-8 rounded-xl shadow-xl ${
              isDark ? 'bg-[#21262d]' : 'bg-gray-50'
            }`}>
              <h3 className={`text-2xl font-semibold mb-6 ${
                isDark ? 'text-white' : 'text-gray-800'
              }`}>
                Professional Overview
              </h3>
              <div className="space-y-4">
                <p className={`text-lg leading-relaxed ${
                  isDark ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  I am a dedicated Full Stack Developer with a passion for creating innovative 
                  digital solutions. Based in Udumalpet, Tamil Nadu, I specialize in modern 
                  web technologies and have experience across the entire software development lifecycle.
                </p>
                <p className={`text-lg leading-relaxed ${
                  isDark ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  My expertise spans from frontend frameworks like React and Angular to backend 
                  technologies including Node.js, Python, and various databases. I'm committed 
                  to writing clean, efficient code and staying updated with the latest industry trends.
                </p>
                <div className={`mt-6 p-4 rounded-lg ${
                  isDark ? 'bg-[#0d1117]' : 'bg-white'
                } border-l-4 border-blue-600`}>
                  <p className={`font-medium ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                    "Passionate about building scalable applications that make a difference."
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {highlights.map((highlight, index) => (
              <motion.div
                key={highlight.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
                className={`p-6 rounded-lg shadow-lg transition-all duration-300 ${
                  isDark
                    ? 'bg-[#21262d] hover:bg-[#30363d]'
                    : 'bg-white hover:bg-gray-50'
                } border ${isDark ? 'border-[#30363d]' : 'border-gray-200'}`}
              >
                <div className="flex items-start space-x-4">
                  <div className={`p-3 rounded-lg ${
                    isDark ? 'bg-blue-600/20 text-blue-400' : 'bg-blue-100 text-blue-600'
                  }`}>
                    {highlight.icon}
                  </div>
                  <div>
                    <h4 className={`text-lg font-semibold mb-2 ${
                      isDark ? 'text-white' : 'text-gray-800'
                    }`}>
                      {highlight.title}
                    </h4>
                    <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      {highlight.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className={`inline-flex items-center space-x-8 p-6 rounded-xl ${
            isDark ? 'bg-[#21262d]' : 'bg-gray-50'
          }`}>
            <div className="text-center">
              <div className={`text-3xl font-bold ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                2+
              </div>
              <div className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                Years Experience
              </div>
            </div>
            <div className={`h-12 w-px ${isDark ? 'bg-gray-600' : 'bg-gray-300'}`}></div>
            <div className="text-center">
              <div className={`text-3xl font-bold ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                15+
              </div>
              <div className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                Projects Completed
              </div>
            </div>
            <div className={`h-12 w-px ${isDark ? 'bg-gray-600' : 'bg-gray-300'}`}></div>
            <div className="text-center">
              <div className={`text-3xl font-bold ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                10+
              </div>
              <div className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                Technologies
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;