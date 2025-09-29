import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Calendar, Award } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useCertificates } from '../../hooks/useCertificates';
import { Certificate } from '../../types';

const Certificates: React.FC = () => {
  const { isDark } = useTheme();
  const { certificates, loading } = useCertificates();

  if (loading) {
    return (
      <section
        id="certificates"
        className={`py-20 ${isDark ? 'bg-[#0d1117]' : 'bg-white'}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className={`mt-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              Loading certificates...
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="certificates"
      className={`py-20 ${isDark ? 'bg-[#161b22]' : 'bg-gray-50'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2
            className={`text-3xl md:text-4xl font-bold mb-4 ${
              isDark ? 'text-white' : 'text-gray-800'
            }`}
          >
            Certifications
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-6"></div>
          <p
            className={`text-lg max-w-2xl mx-auto ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}
          >
            My professional certifications and credentials
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certificates.map((certificate: Certificate, index: number) => (
            <motion.div
              key={certificate.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className={`group rounded-xl overflow-hidden shadow-lg transition-all duration-300 ${
                isDark ? 'bg-[#21262d]' : 'bg-white'
              } hover:shadow-2xl`}
            >
              <div className="relative overflow-hidden">
                <img
                  src={certificate.imageUrl}
                  alt={certificate.title}
                  className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-4">
                  <h3 className="text-lg font-semibold text-white">
                    {certificate.title}
                  </h3>
                  <p className="text-sm text-gray-300">
                    {certificate.issuingOrganization}
                  </p>
                </div>
              </div>

              <div className="p-5">
                <div
                  className={`flex items-center text-sm mb-4 ${
                    isDark ? 'text-gray-400' : 'text-gray-500'
                  }`}
                >
                  <Calendar size={16} className="mr-2" />
                  Issued on{' '}
                  {new Date(certificate.issueDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </div>

                {certificate.credentialUrl && (
                  <motion.a
                    href={certificate.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                      isDark
                        ? 'bg-blue-600/20 text-blue-300 hover:bg-blue-600/30'
                        : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ExternalLink size={16} className="mr-2" />
                    View Credential
                  </motion.a>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {certificates.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center py-12"
          >
            <Award
              size={48}
              className={`mx-auto mb-4 ${
                isDark ? 'text-gray-500' : 'text-gray-400'
              }`}
            />
            <p
              className={`text-lg ${
                isDark ? 'text-gray-300' : 'text-gray-600'
              }`}
            >
              No certificates to display at the moment.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Certificates;
