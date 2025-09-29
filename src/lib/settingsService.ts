import { ref, get, update } from 'firebase/database';
import { database } from './firebase';

const SETTINGS_REF = 'settings';

export interface AppSettings {
  maintenanceMode: boolean;
  maintenanceMessage: string;
  maintenanceEndTime?: string;
}

export const settingsService = {
  async getSettings(): Promise<AppSettings> {
    const settingsRef = ref(database, SETTINGS_REF);
    const snapshot = await get(settingsRef);
    if (snapshot.exists()) {
      return snapshot.val();
    }
    // Default settings if nothing is in the database
    return { 
      maintenanceMode: false, 
      maintenanceMessage: 'We are currently performing scheduled maintenance. We should be back online shortly.',
      maintenanceEndTime: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString() // Default to 2 hours from now
    };
  },

  async updateSettings(settings: Partial<AppSettings>): Promise<void> {
    const settingsRef = ref(database, SETTINGS_REF);
    await update(settingsRef, settings);
  },
};
