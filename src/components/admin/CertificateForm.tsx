import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { useTheme } from '../../contexts/ThemeContext';
import { Certificate } from '../../types';
import { uploadToCloudinary } from '../../lib/cloudinary';
import { useCertificates } from '../../hooks/useCertificates';

interface CertificateFormProps {
  certificate?: Certificate | null;
  onClose: () => void;
}

interface CertificateFormData {
  title: string;
  issuingOrganization: string;
  issueDate: string;
  credentialId?: string;
  credentialUrl?: string;
  imageFile: FileList;
}

const CertificateForm: React.FC<CertificateFormProps> = ({ certificate, onClose }) => {
  const { isDark } = useTheme();
  const { addCertificate, updateCertificate } = useCertificates();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>(certificate?.imageUrl || '');

  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm<CertificateFormData>({
    defaultValues: {
      title: certificate?.title || '',
      issuingOrganization: certificate?.issuingOrganization || '',
      issueDate: certificate?.issueDate || '',
      credentialId: certificate?.credentialId || '',
      credentialUrl: certificate?.credentialUrl || '',
    },
  });

  const watchImageFile = watch('imageFile');

  useEffect(() => {
    if (watchImageFile && watchImageFile[0]) {
      const file = watchImageFile[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, [watchImageFile]);

  const onSubmit = async (data: CertificateFormData) => {
    setIsSubmitting(true);
    try {
      let imageUrl = certificate?.imageUrl;
      let imagePublicId = certificate?.imagePublicId;

      if (data.imageFile?.[0]) {
        const imageUploadResponse = await uploadToCloudinary(data.imageFile[0]);
        imageUrl = imageUploadResponse.secure_url;
        imagePublicId = imageUploadResponse.public_id;
      }

      if (!imageUrl) {
        throw new Error("An image is required.");
      }

      const certificateData: Omit<Certificate, 'id' | 'createdAt'> = {
        title: data.title,
        issuingOrganization: data.issuingOrganization,
        issueDate: data.issueDate,
        credentialId: data.credentialId || '',
        credentialUrl: data.credentialUrl || '',
        imageUrl,
        imagePublicId: imagePublicId || '',
      };

      if (certificate) {
        await updateCertificate(certificate.id, certificateData);
      } else {
        await addCertificate({
          ...certificateData,
          createdAt: new Date().toISOString(),
        });
      }
      reset();
      onClose();
    } catch (error) {
      console.error('Error submitting certificate:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 overflow-y-auto py-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className={`p-6 rounded-lg shadow-xl w-full max-w-2xl mx-4 my-auto ${
          isDark ? 'bg-[#161b22] text-white' : 'bg-white text-gray-900'
        }`}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
              Certificate Title *
            </label>
            <input
              type="text"
              {...register('title', { required: 'Certificate title is required' })}
              className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                isDark
                  ? 'bg-[#0d1117] border-[#30363d] text-white focus:border-blue-500'
                  : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
              } focus:ring-2 focus:ring-blue-500/20 focus:outline-none`}
              placeholder="Enter certificate title"
            />
            {errors.title && <p className="mt-2 text-sm text-red-500">{errors.title.message}</p>}
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
              Issuing Organization *
            </label>
            <input
              type="text"
              {...register('issuingOrganization', { required: 'Issuing organization is required' })}
              className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                isDark
                  ? 'bg-[#0d1117] border-[#30363d] text-white focus:border-blue-500'
                  : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
              } focus:ring-2 focus:ring-blue-500/20 focus:outline-none`}
              placeholder="Google, Microsoft, etc."
            />
            {errors.issuingOrganization && (
              <p className="mt-2 text-sm text-red-500">{errors.issuingOrganization.message}</p>
            )}
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
              Issue Date *
            </label>
            <input
              type="date"
              {...register('issueDate', { required: 'Issue date is required' })}
              className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                isDark
                  ? 'bg-[#0d1117] border-[#30363d] text-white focus:border-blue-500'
                  : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
              } focus:ring-2 focus:ring-blue-500/20 focus:outline-none`}
            />
            {errors.issueDate && <p className="mt-2 text-sm text-red-500">{errors.issueDate.message}</p>}
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
              Certificate Image *
            </label>
            <input
              type="file"
              accept="image/*"
              {...register('imageFile', { required: !certificate })}
              className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                isDark
                  ? 'bg-[#0d1117] border-[#30363d] text-white focus:border-blue-500'
                  : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
              } focus:ring-2 focus:ring-blue-500/20 focus:outline-none`}
            />
            {errors.imageFile && (
              <p className="mt-2 text-sm text-red-500">{errors.imageFile.message}</p>
            )}

            {imagePreview && (
              <div className="mt-3">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-48 object-cover rounded-lg"
                  onError={() => setImagePreview('')}
                />
              </div>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                Credential ID
              </label>
              <input
                type="text"
                {...register('credentialId')}
                className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                  isDark
                    ? 'bg-[#0d1117] border-[#30363d] text-white focus:border-blue-500'
                    : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                } focus:ring-2 focus:ring-blue-500/20 focus:outline-none`}
                placeholder="Enter credential ID"
              />
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                Credential URL
              </label>
              <input
                type="url"
                {...register('credentialUrl')}
                className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                  isDark
                    ? 'bg-[#0d1117] border-[#30363d] text-white focus:border-blue-500'
                    : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                } focus:ring-2 focus:ring-blue-500/20 focus:outline-none`}
                placeholder="https://credential.net/123"
              />
            </div>
          </div>

          <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200 dark:border-[#30363d]">
            <motion.button
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onClose}
              className={`px-6 py-2 text-sm font-medium rounded-lg transition-colors ${
                isDark ? 'bg-[#30363d] text-gray-300 hover:bg-[#40464d]' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Cancel
            </motion.button>
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  {certificate ? 'Updating...' : 'Creating...'}
                </div>
              ) : (
                certificate ? 'Update Certificate' : 'Create Certificate'
              )}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default CertificateForm;
