import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from './lib/firebase';
import { useTheme } from './contexts/ThemeContext';
import { Toaster } from 'react-hot-toast';
import { settingsService, AppSettings } from './lib/settingsService';
import MaintenancePage from './components/MaintenancePage';

// Components
import Navbar from './components/Navbar';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Skills from './components/sections/Skills';
import Projects from './components/sections/Projects';
import Certificates from './components/sections/Certificates';
import Education from './components/sections/Education';
import Contact from './components/sections/Contact';
import Footer from './components/Footer';
import AdminLogin from './components/admin/AdminLogin';
import AdminPanel from './components/admin/AdminPanel';

const Portfolio: React.FC = () => (
  <>
    <Navbar />
    <main>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Certificates />
      <Education />
      <Contact />
    </main>
    <Footer />
  </>
);

const AppContent: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [settings, setSettings] = useState<AppSettings | null>(null);
  const { isDark } = useTheme();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    // Load settings
    const loadSettings = async () => {
      try {
        const appSettings = await settingsService.getSettings();
        setSettings(appSettings);
      } catch (error) {
        console.error('Failed to load settings:', error);
        setSettings({
          maintenanceMode: false,
          maintenanceMessage: 'Maintenance mode is currently active.',
        });
      }
    };

    loadSettings();
    return () => unsubscribe();
  }, []);

  if (loading || !settings) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-[#0d1117] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading...</p>
        </div>
      </div>
    );
  }

  // Show maintenance page when maintenance mode is active
  if (settings.maintenanceMode) {
    // Allow access only if user is logged in with admin email
    if (!user || user.email !== 'samuvel1official@gmail.com') {
      const message = user 
        ? "You are not an admin. Only administrators can access the site during maintenance."
        : settings.maintenanceMessage;
        
      return (
        <MaintenancePage 
          message={message} 
          isDark={isDark}
          toggleDarkMode={() => {
            const newTheme = !isDark;
            localStorage.setItem('theme', newTheme ? 'dark' : 'light');
            document.documentElement.classList.toggle('dark');
          }}
          endTime={settings.maintenanceEndTime}
        />
      );
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#0d1117] transition-colors">
      <Router>
        <Routes>
          {/* Main Portfolio Route */}
          <Route path="/" element={<Portfolio />} />
          
          {/* Hidden Admin Route */}
          <Route 
            path="/admin-secret-panel" 
            element={
              user ? (
                <AdminPanel onLogout={() => setUser(null)} />
              ) : showAdminLogin ? (
                <AdminLogin onLogin={() => setShowAdminLogin(false)} />
              ) : (
                <>
                  {setShowAdminLogin(true)}
                  <AdminLogin onLogin={() => setShowAdminLogin(false)} />
                </>
              )
            } 
          />
          
          {/* Catch all route - redirect to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: 'var(--toast-bg)',
            color: 'var(--toast-color)',
            border: '1px solid var(--toast-border)',
          },
        }}
      />
    </div>
  );
};

export default AppContent;