import React from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import AppContent from './AppContent';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

export default App;