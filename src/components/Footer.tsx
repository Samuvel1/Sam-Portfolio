import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Code, Coffee } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const Footer: React.FC = () => {
  const { isDark } = useTheme();

  return (
    <footer className={`py-12 ${
      isDark ? 'bg-[#21262d] border-t border-[#30363d]' : 'bg-gray-50 border-t border-gray-200'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className={`flex items-center justify-center space-x-2 mb-4 ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
            <span>Made with</span>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Heart size={18} className="text-red-500" fill="currentColor" />
            </motion.div>
            <span>and</span>
            <Code size={18} className="text-blue-500" />
            <span>by</span>
            <motion.span
              whileHover={{ scale: 1.05 }}
              className={`font-semibold ${
                isDark ? 'text-white' : 'text-gray-800'
              }`}
            >
              Samuvel Tamilarasan B
            </motion.span>
          </div>

          <div className={`flex items-center justify-center space-x-2 mb-6 ${
            isDark ? 'text-gray-400' : 'text-gray-500'
          }`}>
            <Coffee size={16} />
            <span className="text-sm">
              Powered by coffee and late-night coding sessions
            </span>
          </div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className={`inline-flex items-center space-x-4 px-6 py-3 rounded-lg ${
              isDark ? 'bg-[#0d1117]' : 'bg-white'
            } shadow-md`}
          >
            <div className="text-center">
              <div className={`text-2xl font-bold ${
                isDark ? 'text-blue-400' : 'text-blue-600'
              }`}>
                {new Date().getFullYear()}
              </div>
              <div className={`text-xs ${
                isDark ? 'text-gray-400' : 'text-gray-500'
              }`}>
                Current Year
              </div>
            </div>
            
            <div className={`h-8 w-px ${
              isDark ? 'bg-[#30363d]' : 'bg-gray-300'
            }`}></div>
            
            <div className="text-center">
              <div className={`text-2xl font-bold ${
                isDark ? 'text-blue-400' : 'text-blue-600'
              }`}>
                24/7
              </div>
              <div className={`text-xs ${
                isDark ? 'text-gray-400' : 'text-gray-500'
              }`}>
                Dedication
              </div>
            </div>
            
            <div className={`h-8 w-px ${
              isDark ? 'bg-[#30363d]' : 'bg-gray-300'
            }`}></div>
            
            <div className="text-center">
              <div className={`text-2xl font-bold ${
                isDark ? 'text-blue-400' : 'text-blue-600'
              }`}>
                ∞
              </div>
              <div className={`text-xs ${
                isDark ? 'text-gray-400' : 'text-gray-500'
              }`}>
                Learning
              </div>
            </div>
          </motion.div>

          <div className={`mt-8 pt-8 border-t ${
            isDark ? 'border-[#30363d]' : 'border-gray-200'
          }`}>
            <p className={`text-sm ${
              isDark ? 'text-gray-400' : 'text-gray-500'
            }`}>
              © {new Date().getFullYear()} Samuvel Tamilarasan B. All rights reserved.
              <br />
              Built with React, TypeScript, Firebase & Tailwind CSS
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;