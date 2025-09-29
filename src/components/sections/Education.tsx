import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Calendar, MapPin, Award } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

const Education: React.FC = () => {
  const { isDark } = useTheme();

  const education = [
    {
      degree: 'Bachelor of Commerce - Professional Accounting',
      institution: 'Sree Saraswathi Thyagaraja College',
      location: 'Pollachi, Tamil Nadu',
      period: '2021 - 2024',
      grade: 'CGPA: 6.5/10',
      
    },
    {
      degree: 'Higher Secondary Certificate (12th)',
      institution: 'Rajalakshmi Genguswamy Higher Secondary School',
      location: 'Udumalpet, Tamil Nadu',
      period: '2020 - 2021',
      grade: '84%',
      description: 'Specialized in Commerce with Computer Application.',
    }
  ];

  const achievements = [
    {
      title: 'Best Final Year Project',
      description: 'AI-powered E-commerce Recommendation System',
      year: '2024'
    },
    {
      title: 'Coding Competition Winner',
      description: 'Inter-college Programming Contest',
      year: '2023'
    },
    {
      title: 'Hackathon Runner-up',
      description: 'Smart India Hackathon Regional Round',
      year: '2023'
    }
  ];

  return (
    <section
      id="education"
      className={`py-20 ${isDark ? 'bg-[#21262d]' : 'bg-gray-50'}`}
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
            Education & Achievements
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-6"></div>
          <p className={`text-lg max-w-2xl mx-auto ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
            My academic journey and notable accomplishments
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Education Timeline */}
          <div className="lg:col-span-2">
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className={`text-2xl font-semibold mb-8 ${
                isDark ? 'text-white' : 'text-gray-800'
              }`}
            >
              Academic Background
            </motion.h3>

            <div className="space-y-8">
              {education.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className={`relative p-6 rounded-xl shadow-lg ${
                    isDark ? 'bg-[#0d1117]' : 'bg-white'
                  } border-l-4 border-blue-600`}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-lg ${
                      isDark ? 'bg-blue-600/20 text-blue-400' : 'bg-blue-100 text-blue-600'
                    }`}>
                      <GraduationCap size={24} />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                        <h4 className={`text-xl font-semibold ${
                          isDark ? 'text-white' : 'text-gray-800'
                        }`}>
                          {item.degree}
                        </h4>
                        <div className={`flex items-center text-sm ${
                          isDark ? 'bg-[#21262d] text-green-400' : 'bg-green-100 text-green-700'
                        } px-3 py-1 rounded-full mt-2 sm:mt-0`}>
                          <Award size={14} className="mr-1" />
                          {item.grade}
                        </div>
                      </div>
                      
                      <div className={`text-lg font-medium mb-2 ${
                        isDark ? 'text-blue-400' : 'text-blue-600'
                      }`}>
                        {item.institution}
                      </div>
                      
                      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
                        <div className={`flex items-center text-sm ${
                          isDark ? 'text-gray-400' : 'text-gray-500'
                        }`}>
                          <Calendar size={16} className="mr-2" />
                          {item.period}
                        </div>
                        <div className={`flex items-center text-sm ${
                          isDark ? 'text-gray-400' : 'text-gray-500'
                        }`}>
                          <MapPin size={16} className="mr-2" />
                          {item.location}
                        </div>
                      </div>
                      
                      <p className={`mb-4 ${
                        isDark ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                        {item.description}
                      </p>
                      
                      <div className="space-y-2">
                        <h5 className={`font-medium ${
                          isDark ? 'text-white' : 'text-gray-800'
                        }`}>
                          Key Achievements:
                        </h5>
                        {/* <ul className="space-y-1">
                          {item.achievements.map((achievement, idx) => (
                            <li
                              key={idx}
                              className={`flex items-center text-sm ${
                                isDark ? 'text-gray-300' : 'text-gray-600'
                              }`}
                            >
                              <div className={`w-2 h-2 rounded-full mr-3 ${
                                isDark ? 'bg-blue-400' : 'bg-blue-600'
                              }`}></div>
                              {achievement}
                            </li>
                          ))}
                        </ul> */}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Achievements Sidebar */}
          <div>
            <motion.h3
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className={`text-2xl font-semibold mb-8 ${
                isDark ? 'text-white' : 'text-gray-800'
              }`}
            >
              Notable Awards
            </motion.h3>

            <div className="space-y-4">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02 }}
                  className={`p-4 rounded-lg shadow-md transition-all duration-300 ${
                    isDark
                      ? 'bg-[#0d1117] hover:bg-[#21262d]'
                      : 'bg-white hover:bg-gray-50'
                  } border ${isDark ? 'border-[#30363d]' : 'border-gray-200'}`}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`p-2 rounded ${
                      isDark ? 'bg-yellow-600/20 text-yellow-400' : 'bg-yellow-100 text-yellow-600'
                    }`}>
                      <Award size={18} />
                    </div>
                    <div>
                      <h4 className={`font-semibold mb-1 ${
                        isDark ? 'text-white' : 'text-gray-800'
                      }`}>
                        {achievement.title}
                      </h4>
                      <p className={`text-sm mb-2 ${
                        isDark ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                        {achievement.description}
                      </p>
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                        isDark
                          ? 'bg-[#21262d] text-gray-400'
                          : 'bg-gray-100 text-gray-500'
                      }`}>
                        {achievement.year}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Additional Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className={`mt-8 p-6 rounded-xl ${
                isDark ? 'bg-[#0d1117]' : 'bg-white'
              } shadow-lg`}
            >
              <h4 className={`text-lg font-semibold mb-4 text-center ${
                isDark ? 'text-white' : 'text-gray-800'
              }`}>
                Academic Highlights
              </h4>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className={`text-2xl font-bold ${
                    isDark ? 'text-blue-400' : 'text-blue-600'
                  }`}>
                    8.5
                  </div>
                  <div className={`text-sm ${
                    isDark ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    CGPA
                  </div>
                </div>
                <div>
                  <div className={`text-2xl font-bold ${
                    isDark ? 'text-blue-400' : 'text-blue-600'
                  }`}>
                    3
                  </div>
                  <div className={`text-sm ${
                    isDark ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Awards
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;