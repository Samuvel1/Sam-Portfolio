import { ref, get, set, remove, push, update } from 'firebase/database';
import { database } from './firebase';
import { Certificate } from '../types';

const CERTIFICATES_REF = 'certificates';

export const certificatesService = {
  async getAllCertificates(): Promise<Certificate[]> {
    const certificatesRef = ref(database, CERTIFICATES_REF);
    const snapshot = await get(certificatesRef);
    
    if (snapshot.exists()) {
      const certificates: Certificate[] = [];
      snapshot.forEach((childSnapshot) => {
        certificates.push({
          id: childSnapshot.key,
          ...childSnapshot.val(),
        });
      });
      return certificates;
    }
    
    return [];
  },

  async createCertificate(certificate: Omit<Certificate, 'id' | 'createdAt'>): Promise<string> {
    const certificatesRef = ref(database, CERTIFICATES_REF);
    const newCertificateRef = push(certificatesRef);
    const certificateWithDate = {
      ...certificate,
      createdAt: new Date().toISOString(),
    };
    await set(newCertificateRef, certificateWithDate);
    return newCertificateRef.key!;
  },

  async updateCertificate(id: string, certificate: Partial<Certificate>): Promise<void> {
    const certificateRef = ref(database, `${CERTIFICATES_REF}/${id}`);
    await update(certificateRef, certificate);
  },

  async deleteCertificate(id: string): Promise<void> {
    const certificateRef = ref(database, `${CERTIFICATES_REF}/${id}`);
    await remove(certificateRef);
  },

  async getCertificate(id: string): Promise<Certificate | null> {
    const certificateRef = ref(database, `${CERTIFICATES_REF}/${id}`);
    const snapshot = await get(certificateRef);
    
    if (snapshot.exists()) {
      return {
        id: snapshot.key,
        ...snapshot.val(),
      };
    }
    
    return null;
  },
};