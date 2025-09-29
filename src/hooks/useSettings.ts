import { useState, useEffect, useCallback } from 'react';
import { AppSettings, settingsService } from '../lib/settingsService';
import toast from 'react-hot-toast';

export const useSettings = () => {
  const [settings, setSettings] = useState<AppSettings | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchSettings = useCallback(async () => {
    setLoading(true);
    try {
      const fetchedSettings = await settingsService.getSettings();
      setSettings(fetchedSettings);
    } catch (error) {
      toast.error('Failed to fetch settings');
      console.error('Error fetching settings:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateSettings = async (newSettings: Partial<AppSettings>) => {
    try {
      await settingsService.updateSettings(newSettings);
      // Optimistically update local state or refetch
      setSettings(prev => prev ? { ...prev, ...newSettings } : null);
      toast.success('Settings updated successfully');
    } catch (error) {
      toast.error('Failed to update settings');
      console.error('Error updating settings:', error);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  return {
    settings,
    loading,
    updateSettings,
    refetch: fetchSettings,
  };
};
