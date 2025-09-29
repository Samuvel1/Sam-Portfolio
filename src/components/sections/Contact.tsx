import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Github, Linkedin } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useTheme } from '../../contexts/ThemeContext';
import { ContactForm } from '../../types';
import toast from 'react-hot-toast';

const Contact: React.FC = () => {
  const { isDark } = useTheme();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactForm>();

  const contactInfo = [
    {
      icon: <Mail size={24} />,
      title: 'Email',
      value: 'samuvel1official@gmail.com',
      href: 'mailto:samuvel1official@gmail.com'
    },
    {
      icon: <Phone size={24} />,
      title: 'Phone',
      value: '+91 9487927966',
      href: 'tel:+919487927966'
    },
    {
      icon: <MapPin size={24} />,
      title: 'Location',
      value: 'Udumalpet, Tamil Nadu',
      href: 'https://maps.google.com/?q=Udumalpet,Tamil+Nadu'
    }
  ];

  const socialLinks = [
    {
      icon: <Github size={24} />,
      name: 'GitHub',
      href: 'https://github.com/samuvel1',
      color: isDark ? 'hover:text-white' : 'hover:text-gray-900'
    },
    {
      icon: <Linkedin size={24} />,
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/in/samuvel-tamilarasan-b-480805378/',
      color: 'hover:text-blue-600'
    }
  ];

  const onSubmit = async (data: ContactForm) => {
    setIsSubmitting(true);
    
    try {
      // Get environment variables
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      // Debug: Log environment variables (remove in production)
      // console.log('EmailJS Config:', {
      //   serviceId: serviceId ? `${serviceId.substring(0, 8)}...` : 'MISSING',
      //   templateId: templateId ? `${templateId.substring(0, 8)}...` : 'MISSING',
      //   publicKey: publicKey ? `${publicKey.substring(0, 8)}...` : 'MISSING'
      // });

      // Validate environment variables
      if (!serviceId || !templateId || !publicKey) {
        const missing = [];
        if (!serviceId) missing.push('VITE_EMAILJS_SERVICE_ID');
        if (!templateId) missing.push('VITE_EMAILJS_TEMPLATE_ID');
        if (!publicKey) missing.push('VITE_EMAILJS_PUBLIC_KEY');
        throw new Error(`Missing environment variables: ${missing.join(', ')}`);
      }

      // Check for placeholder values
      if (serviceId.includes('your_') || templateId.includes('your_') || publicKey.includes('your_')) {
        throw new Error('Please replace placeholder values in your .env file with actual EmailJS credentials');
      }

      // Prepare template parameters with simpler structure
      const templateParams = {
        user_name: data.name,
        user_email: data.email,
        message: data.message,
      };

      // console.log('Sending email with params:', templateParams);

      // Send email using EmailJS (don't call init here, do it once in your app)
      await emailjs.send(
        serviceId,
        templateId,
        templateParams
      );

      // console.log('EmailJS response:', response);

      toast.success("Message sent successfully! I'll get back to you soon.");
      reset();

    } catch (error) {
      console.error('EmailJS Error:', error);
      
      // Handle specific EmailJS errors
      if (error && typeof error === 'object' && 'text' in error) {
        const errorText = (error as any).text;
        if (errorText.includes('template ID not found')) {
          toast.error('Email template not found. Please check your EmailJS configuration.');
        } else if (errorText.includes('service ID not found')) {
          toast.error('Email service not found. Please check your EmailJS configuration.');
        } else if (errorText.includes('public key')) {
          toast.error('Invalid public key. Please check your EmailJS configuration.');
        } else {
          toast.error(`Email service error: ${errorText}`);
        }
      } else if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('Failed to send message. Please try contacting me directly.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
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
            Get In Touch
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-6"></div>
          <p className={`text-lg max-w-2xl mx-auto ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
            I'm always open to discussing new opportunities and interesting projects.
            Let's connect and create something amazing together!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className={`text-2xl font-semibold mb-8 ${
              isDark ? 'text-white' : 'text-gray-800'
            }`}>
              Let's Connect
            </h3>
            
            <div className="space-y-6 mb-8">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={info.title}
                  href={info.href}
                  target={info.href.startsWith('http') ? '_blank' : undefined}
                  rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ x: 5 }}
                  className={`flex items-center space-x-4 p-4 rounded-lg transition-all duration-300 ${
                    isDark
                      ? 'bg-[#21262d] hover:bg-[#30363d] text-gray-300'
                      : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                  } group cursor-pointer`}
                >
                  <div className={`p-3 rounded-lg transition-colors ${
                    isDark ? 'bg-blue-600/20 text-blue-400' : 'bg-blue-100 text-blue-600'
                  } group-hover:scale-110 transition-transform`}>
                    {info.icon}
                  </div>
                  <div>
                    <h4 className={`font-medium ${
                      isDark ? 'text-white' : 'text-gray-800'
                    }`}>
                      {info.title}
                    </h4>
                    <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      {info.value}
                    </p>
                  </div>
                </motion.a>
              ))}
            </div>

            <div className="space-y-4">
              <h4 className={`text-lg font-medium ${
                isDark ? 'text-white' : 'text-gray-800'
              }`}>
                Follow Me
              </h4>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    className={`p-3 rounded-lg transition-colors ${
                      isDark
                        ? 'bg-[#21262d] text-gray-300 hover:bg-[#30363d]'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    } ${social.color}`}
                    aria-label={social.name}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className={`p-8 rounded-xl shadow-lg ${
              isDark ? 'bg-[#21262d]' : 'bg-gray-50'
            }`}
          >
            <h3 className={`text-2xl font-semibold mb-6 ${
              isDark ? 'text-white' : 'text-gray-800'
            }`}>
              Send Message
            </h3>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  isDark ? 'text-gray-200' : 'text-gray-700'
                }`}>
                  Name *
                </label>
                <input
                  type="text"
                  {...register('name', { 
                    required: 'Name is required',
                    minLength: {
                      value: 2,
                      message: 'Name must be at least 2 characters'
                    }
                  })}
                  className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                    isDark
                      ? 'bg-[#0d1117] border-[#30363d] text-white focus:border-blue-500'
                      : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                  } focus:ring-2 focus:ring-blue-500/20 focus:outline-none`}
                  placeholder="Your name"
                />
                {errors.name && (
                  <p className="mt-2 text-sm text-red-500">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  isDark ? 'text-gray-200' : 'text-gray-700'
                }`}>
                  Email *
                </label>
                <input
                  type="email"
                  {...register('email', { 
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Please enter a valid email address'
                    }
                  })}
                  className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                    isDark
                      ? 'bg-[#0d1117] border-[#30363d] text-white focus:border-blue-500'
                      : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                  } focus:ring-2 focus:ring-blue-500/20 focus:outline-none`}
                  placeholder="your.email@example.com"
                />
                {errors.email && (
                  <p className="mt-2 text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  isDark ? 'text-gray-200' : 'text-gray-700'
                }`}>
                  Message *
                </label>
                <textarea
                  {...register('message', { 
                    required: 'Message is required',
                    minLength: {
                      value: 5,
                      message: 'Message must be at least 5 characters'
                    }
                  })}
                  rows={6}
                  className={`w-full px-4 py-3 rounded-lg border transition-colors resize-none ${
                    isDark
                      ? 'bg-[#0d1117] border-[#30363d] text-white focus:border-blue-500'
                      : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                  } focus:ring-2 focus:ring-blue-500/20 focus:outline-none`}
                  placeholder="Tell me about your project or say hello..."
                />
                {errors.message && (
                  <p className="mt-2 text-sm text-red-500">{errors.message.message}</p>
                )}
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={20} className="mr-2" />
                    Send Message
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;