import { useState, useEffect } from 'react';
import { Certificate } from '../types';
import { certificatesService } from '../lib/certificatesService';
import { deleteFromCloudinary } from '../lib/cloudinary';
import toast from 'react-hot-toast';
import { ref, onValue } from 'firebase/database';
import { database } from '../lib/firebase';

export const useCertificates = () => {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const certsRef = ref(database, 'certificates');

    const unsubscribe = onValue(certsRef, (snapshot) => {
      try {
        if (snapshot.exists()) {
          const certs: Certificate[] = [];
          snapshot.forEach((child) => {
            certs.push({ id: child.key as string, ...child.val() });
          });
          setCertificates(certs);
        } else {
          setCertificates([]);
        }
      } catch (error) {
        toast.error('Failed to fetch certificates');
        console.error('Error fetching certificates:', error);
      } finally {
        setLoading(false);
      }
    });

    return () => {
      try {
        unsubscribe();
      } catch (e) {
        // noop
      }
    };
  }, []);

  const addCertificate = async (certificate: Omit<Certificate, 'id' | 'createdAt'>) => {
    try {
      const id = await certificatesService.createCertificate(certificate);
      toast.success('Certificate added successfully');
      return id;
    } catch (error) {
      toast.error('Failed to add certificate');
      console.error('Error adding certificate:', error);
      throw error;
    }
  };

  const updateCertificate = async (id: string, certificate: Partial<Certificate>) => {
    try {
      await certificatesService.updateCertificate(id, certificate);
      toast.success('Certificate updated successfully');
    } catch (error) {
      toast.error('Failed to update certificate');
      console.error('Error updating certificate:', error);
      throw error;
    }
  };

  const deleteCertificate = async (id: string) => {
    try {
      await certificatesService.deleteCertificate(id);
      toast.success('Certificate deleted successfully');
    } catch (error) {
      toast.error('Failed to delete certificate');
      console.error('Error deleting certificate:', error);
      throw error;
    }
  };

  return {
    certificates,
    loading,
    addCertificate,
    updateCertificate,
    deleteCertificate
  };
};
