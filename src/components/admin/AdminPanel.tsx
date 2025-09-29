import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { signOut } from 'firebase/auth';
import { auth } from '../../lib/firebase';
import { useTheme } from '../../contexts/ThemeContext';
import { useProjects } from '../../hooks/useProjects';
import { useCertificates } from '../../hooks/useCertificates';
import { Project, Certificate } from '../../types';
import { useNavigate } from 'react-router-dom';
import ProjectForm from './ProjectForm';
import CertificateForm from './CertificateForm';
import { settingsService, AppSettings } from '../../lib/settingsService';
import { 
  LogOut, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Settings,
  Folder,
  RefreshCw
} from 'lucide-react';
import toast from 'react-hot-toast';

interface AdminPanelProps {
  onLogout: () => void;
}

// Settings Panel Component
const SettingsPanel: React.FC = () => {
  const { isDark } = useTheme();
  const [settings, setSettings] = useState<AppSettings>({
    maintenanceMode: false,
    maintenanceMessage: 'We are currently performing scheduled maintenance. We should be back online shortly.',
    maintenanceEndTime: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString()
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const appSettings = await settingsService.getSettings();
        setSettings(appSettings);
      } catch (error) {
        console.error('Failed to load settings:', error);
      } finally {
        setLoading(false);
      }
    };

    loadSettings();
  }, []);

  const handleSettingsChange = async (key: keyof AppSettings, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSaveSettings = async () => {
    setSaving(true);
    try {
      await settingsService.updateSettings(settings);
      toast.success('Settings saved successfully');
    } catch (error) {
      console.error('Failed to save settings:', error);
      toast.error('Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className={`mt-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
          Loading settings...
        </p>
      </div>
    );
  }

  return (
    <div className={`p-8 rounded-lg ${isDark ? 'bg-[#21262d]' : 'bg-white'} shadow`}>
      <div className="space-y-8">
        {/* Maintenance Mode Section */}
        <div>
          <h3 className={`text-xl font-semibold mb-6 ${isDark ? 'text-white' : 'text-gray-800'}`}>
            Maintenance Mode
          </h3>
          
          <div className="space-y-6">
            {/* Maintenance Mode Toggle */}
            <div className="flex items-center justify-between">
              <div>
                <label className={`font-medium ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                  Enable Maintenance Mode
                </label>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  When enabled, visitors will see a maintenance page instead of your portfolio.
                </p>
              </div>
              <button
                onClick={() => handleSettingsChange('maintenanceMode', !settings.maintenanceMode)}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
                  settings.maintenanceMode
                    ? 'bg-blue-600'
                    : isDark
                    ? 'bg-gray-600'
                    : 'bg-gray-200'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    settings.maintenanceMode ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Maintenance Message */}
            <div>
              <label className={`block font-medium mb-2 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                Maintenance Message
              </label>
              <textarea
                value={settings.maintenanceMessage}
                onChange={(e) => handleSettingsChange('maintenanceMessage', e.target.value)}
                rows={4}
                className={`w-full px-3 py-2 rounded-lg ${
                  isDark
                    ? 'bg-[#2d333b] text-white border-[#30363d]'
                    : 'bg-white text-gray-900 border-gray-300'
                } border focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                placeholder="Enter the message to display during maintenance..."
              />
            </div>

            {/* Maintenance End Time */}
            <div>
              <label className={`block font-medium mb-2 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                Expected End Time
              </label>
              <input
                type="datetime-local"
                value={settings.maintenanceEndTime ? new Date(settings.maintenanceEndTime).toISOString().slice(0, 16) : ''}
                onChange={(e) => handleSettingsChange('maintenanceEndTime', new Date(e.target.value).toISOString())}
                className={`w-full px-3 py-2 rounded-lg ${
                  isDark
                    ? 'bg-[#2d333b] text-white border-[#30363d]'
                    : 'bg-white text-gray-900 border-gray-300'
                } border focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSaveSettings}
            disabled={saving}
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? (
              <>
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Settings className="w-4 h-4 mr-2" />
                Save Settings
              </>
            )}
          </motion.button>
        </div>
      </div>
    </div>
  );
};

const AdminPanel: React.FC<AdminPanelProps> = ({ onLogout }) => {
  const { isDark } = useTheme();
  const { projects, loading: projectsLoading, deleteProject } = useProjects();
  const { certificates, loading: certificatesLoading, deleteCertificate } = useCertificates();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState('projects');
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [showCertificateForm, setShowCertificateForm] = useState(false);
  const [editingCertificate, setEditingCertificate] = useState<Certificate | null>(null);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success('Logged out successfully');
      onLogout();
      navigate('/'); // Redirect to home page
    } catch (error) {
      toast.error('Failed to logout');
    }
  };

  const handleDeleteProject = async (project: Project) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      await deleteProject(project.id, project.imagePublicId, project.videoPublicId);
    }
  };

  const tabs = [
    { id: 'projects', name: 'Projects', icon: <Folder size={20} /> },
    { id: 'certificates', name: 'Certificates', icon: <Folder size={20} /> },
    { id: 'settings', name: 'Settings', icon: <Settings size={20} /> },
  ];

  return (
    <div className={`min-h-screen ${isDark ? 'bg-[#0d1117]' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className={`sticky top-0 z-40 border-b ${
        isDark ? 'bg-[#21262d] border-[#30363d]' : 'bg-white border-gray-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className={`text-2xl font-bold ${
                isDark ? 'text-white' : 'text-gray-800'
              }`}>
                Portfolio Admin
              </h1>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Manage your portfolio content
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              className={`inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                isDark
                  ? 'bg-red-600/20 text-red-400 hover:bg-red-600/30'
                  : 'bg-red-100 text-red-700 hover:bg-red-200'
              }`}
            >
              <LogOut size={16} className="mr-2" />
              Logout
            </motion.button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="mb-8">
          <div className="flex space-x-1 p-1 bg-gray-200 dark:bg-[#21262d] rounded-lg w-fit">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                  activeTab === tab.id
                    ? isDark
                      ? 'bg-[#0d1117] text-white shadow-sm'
                      : 'bg-white text-gray-900 shadow-sm'
                    : isDark
                      ? 'text-gray-400 hover:text-white'
                      : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.icon}
                <span className="ml-2">{tab.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'projects' && (
            <motion.div
              key="projects"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className={`text-xl font-semibold ${
                  isDark ? 'text-white' : 'text-gray-800'
                }`}>
                  Projects ({projects.length})
                </h2>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setEditingProject(null);
                    setShowProjectForm(true);
                  }}
                  className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  <Plus size={16} className="mr-2" />
                  Add Project
                </motion.button>
              </div>

              {projectsLoading ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                  <p className={`mt-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    Loading projects...
                  </p>
                </div>
              ) : projects.length === 0 ? (
                <div className={`text-center py-12 ${
                  isDark ? 'bg-[#21262d]' : 'bg-white'
                } rounded-lg shadow`}>
                  <Folder size={48} className={`mx-auto mb-4 ${
                    isDark ? 'text-gray-400' : 'text-gray-500'
                  }`} />
                  <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    No projects yet
                  </p>
                  <p className={`text-sm mt-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    Create your first project to get started
                  </p>
                </div>
              ) : (
                <div className="grid gap-6">
                  {projects.map((project) => (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`p-6 rounded-lg shadow-md border ${
                        isDark
                          ? 'bg-[#21262d] border-[#30363d]'
                          : 'bg-white border-gray-200'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-3">
                            <h3 className={`text-lg font-semibold ${
                              isDark ? 'text-white' : 'text-gray-800'
                            }`}>
                              {project.title}
                            </h3>
                            {project.featured && (
                              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                isDark ? 'bg-blue-600/20 text-blue-400' : 'bg-blue-100 text-blue-600'
                              }`}>
                                Featured
                              </span>
                            )}
                          </div>
                          <p className={`mb-3 ${
                            isDark ? 'text-gray-300' : 'text-gray-600'
                          }`}>
                            {project.description}
                          </p>
                          <div className="flex flex-wrap gap-2 mb-3">
                            {project.technologies.map((tech) => (
                              <span
                                key={tech}
                                className={`px-2 py-1 text-xs rounded ${
                                  isDark
                                    ? 'bg-[#30363d] text-gray-300'
                                    : 'bg-gray-100 text-gray-700'
                                }`}
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                          <div className="flex flex-col space-y-2">
                            <div className="flex items-center space-x-4 text-sm">
                              {project.liveUrl && (
                                <a
                                  href={project.liveUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className={`flex items-center ${
                                    isDark ? 'text-blue-400' : 'text-blue-600'
                                  } hover:underline`}
                                >
                                  <Eye size={14} className="mr-1" />
                                  Live Demo
                                </a>
                              )}
                              {project.githubUrl && (
                                <a
                                  href={project.githubUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className={`flex items-center ${
                                    isDark ? 'text-blue-400' : 'text-blue-600'
                                  } hover:underline`}
                                >
                                  GitHub
                                </a>
                              )}
                            </div>
                            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                              Added on: {new Date(project.createdAt).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2 ml-4">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                              setEditingProject(project);
                              setShowProjectForm(true);
                            }}
                            className={`p-2 rounded-lg transition-colors ${
                              isDark
                                ? 'bg-[#30363d] text-gray-300 hover:bg-[#40464d]'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                          >
                            <Edit size={16} />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleDeleteProject(project)}
                            className={`p-2 rounded-lg transition-colors ${
                              isDark
                                ? 'bg-red-600/20 text-red-400 hover:bg-red-600/30'
                                : 'bg-red-100 text-red-600 hover:bg-red-200'
                            }`}
                          >
                            <Trash2 size={16} />
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'certificates' && (
            <motion.div
              key="certificates"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className={`text-xl font-semibold ${
                  isDark ? 'text-white' : 'text-gray-800'
                }`}>
                  Certificates ({certificates.length})
                </h2>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setEditingCertificate(null);
                    setShowCertificateForm(true);
                  }}
                  className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  <Plus size={16} className="mr-2" />
                  Add Certificate
                </motion.button>
              </div>

              {certificatesLoading ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                  <p className={`mt-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    Loading certificates...
                  </p>
                </div>
              ) : certificates.length === 0 ? (
                <div className={`text-center py-12 ${
                  isDark ? 'bg-[#21262d]' : 'bg-white'
                } rounded-lg shadow`}>
                  <Folder size={48} className={`mx-auto mb-4 ${
                    isDark ? 'text-gray-400' : 'text-gray-500'
                  }`} />
                  <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    No certificates yet
                  </p>
                  <p className={`text-sm mt-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    Add your first certificate to get started
                  </p>
                </div>
              ) : (
                <div className="grid gap-6">
                  {certificates.map((certificate) => (
                    <motion.div
                      key={certificate.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`p-6 rounded-lg shadow-md border ${
                        isDark
                          ? 'bg-[#21262d] border-[#30363d]'
                          : 'bg-white border-gray-200'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className={`text-lg font-semibold mb-2 ${
                            isDark ? 'text-white' : 'text-gray-800'
                          }`}>
                            {certificate.title}
                          </h3>
                          <p className={`mb-3 ${
                            isDark ? 'text-gray-300' : 'text-gray-600'
                          }`}>
                            {certificate.issuingOrganization}
                          </p>
                          <p className={`text-sm ${
                            isDark ? 'text-gray-400' : 'text-gray-500'
                          }`}>
                            Issued: {new Date(certificate.issueDate).toLocaleDateString()}
                          </p>
                        </div>
                        
                        <div className="flex items-center space-x-2 ml-4">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                              setEditingCertificate(certificate);
                              setShowCertificateForm(true);
                            }}
                            className={`p-2 rounded-lg transition-colors ${
                              isDark
                                ? 'bg-[#30363d] text-gray-300 hover:bg-[#40464d]'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                          >
                            <Edit size={16} />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                              if (window.confirm('Are you sure you want to delete this certificate?')) {
                                deleteCertificate(certificate.id, certificate.imagePublicId);
                              }
                            }}
                            className={`p-2 rounded-lg transition-colors ${
                              isDark
                                ? 'bg-red-600/20 text-red-400 hover:bg-red-600/30'
                                : 'bg-red-100 text-red-600 hover:bg-red-200'
                            }`}
                          >
                            <Trash2 size={16} />
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'settings' && (
            <motion.div
              key="settings"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <SettingsPanel />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Project Form Modal */}
      <AnimatePresence>
        {showProjectForm && (
          <ProjectForm
            project={editingProject}
            onClose={() => {
              setShowProjectForm(false);
              setEditingProject(null);
            }}
          />
        )}
        {showCertificateForm && (
          <CertificateForm
            certificate={editingCertificate}
            onClose={() => {
              setShowCertificateForm(false);
              setEditingCertificate(null);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminPanel;