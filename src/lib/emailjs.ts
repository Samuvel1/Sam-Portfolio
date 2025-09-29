import { init } from 'emailjs-com';

// Initialize EmailJS with public key
const initEmailJS = () => {
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
  if (publicKey) {
    init(publicKey);
  } else {
    console.error('EmailJS public key not found in environment variables');
  }
};

export default initEmailJS;