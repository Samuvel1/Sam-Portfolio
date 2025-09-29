import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Image as ImageIcon } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { Project } from '../../types';
import { uploadToCloudinary } from '../../lib/cloudinary';
import { useProjects } from '../../hooks/useProjects';

interface ProjectFormProps {
  project?: Project | null;
  onClose: () => void;
}

interface ProjectFormData {
  title: string;
  description: string;
  technologies: string;
  imageFile: FileList;
  videoFile?: FileList;
  liveUrl: string;
  githubUrl: string;
  featured: boolean;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ project, onClose }) => {
  const { isDark } = useTheme();
  const { addProject, updateProject } = useProjects();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>(project?.imageUrl || '');

  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm<ProjectFormData>({
    defaultValues: {
      title: project?.title || '',
      description: project?.description || '',
      technologies: project?.technologies.join(', ') || '',
      liveUrl: project?.liveUrl || '',
      githubUrl: project?.githubUrl || '',
      featured: project?.featured || false,
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



  const onSubmit = async (data: ProjectFormData) => {
    setIsSubmitting(true);
    try {
      let imageUrl = project?.imageUrl;
      let imagePublicId = project?.imagePublicId;

      if (data.imageFile?.[0]) {
        const imageUploadResponse = await uploadToCloudinary(data.imageFile[0]);
        imageUrl = imageUploadResponse.secure_url;
        imagePublicId = imageUploadResponse.public_id;
      }

      if (!imageUrl) {
        throw new Error("An image is required.");
      }

      let videoUrl = project?.videoUrl;
      let videoPublicId = project?.videoPublicId;
      if (data.videoFile?.[0]) {
        const videoUploadResponse = await uploadToCloudinary(data.videoFile[0]);
        videoUrl = videoUploadResponse.secure_url;
        videoPublicId = videoUploadResponse.public_id;
      }

      const projectData: Omit<Project, 'id' | 'createdAt'> = {
        title: data.title,
        description: data.description,
        technologies: data.technologies.split(',').map((tech) => tech.trim()),
        liveUrl: data.liveUrl || '',
        githubUrl: data.githubUrl || '',
        featured: data.featured || false,
        imageUrl,
        imagePublicId: imagePublicId || '',
        videoUrl: videoUrl || '',
        videoPublicId: videoPublicId || '',
      };

      if (project) {
        await updateProject(project.id, projectData);
      } else {
        await addProject({
          ...projectData,
          createdAt: new Date().toISOString(),
        });
      }
      reset();
      onClose();
    } catch (error) {
      console.error('Error submitting project:', error);
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
              Project Title *
            </label>
            <input
              type="text"
              {...register('title', { required: 'Project title is required' })}
              className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                isDark
                  ? 'bg-[#0d1117] border-[#30363d] text-white focus:border-blue-500'
                  : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
              } focus:ring-2 focus:ring-blue-500/20 focus:outline-none`}
              placeholder="Enter project title"
            />
            {errors.title && <p className="mt-2 text-sm text-red-500">{errors.title.message}</p>}
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
              Technologies *
            </label>
            <input
              type="text"
              {...register('technologies', { required: 'Technologies are required' })}
              className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                isDark
                  ? 'bg-[#0d1117] border-[#30363d] text-white focus:border-blue-500'
                  : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
              } focus:ring-2 focus:ring-blue-500/20 focus:outline-none`}
              placeholder="React, Node.js, MongoDB"
            />
            <p className={`mt-1 text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Separate technologies with commas
            </p>
            {errors.technologies && (
              <p className="mt-2 text-sm text-red-500">{errors.technologies.message}</p>
            )}
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
              Description *
            </label>
            <textarea
              {...register('description', { required: 'Description is required' })}
              rows={4}
              className={`w-full px-4 py-3 rounded-lg border transition-colors resize-none ${
                isDark
                  ? 'bg-[#0d1117] border-[#30363d] text-white focus:border-blue-500'
                  : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
              } focus:ring-2 focus:ring-blue-500/20 focus:outline-none`}
              placeholder="Describe your project..."
            />
            {errors.description && (
              <p className="mt-2 text-sm text-red-500">{errors.description.message}</p>
            )}
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
              Project Media (Image/Video) *
            </label>
            <input
              type="file"
              accept="image/*,video/*"
              {...register('imageFile', { required: 'Project media is required' })}
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
                {imagePreview.match(/.(mp4|webm|ogg)$/i) ? (
                  <video src={imagePreview} controls className="w-full h-48 object-cover rounded-lg" />
                ) : (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-48 object-cover rounded-lg"
                    onError={() => setImagePreview('')}
                  />
                )}
              </div>
            )}


          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                Live URL
              </label>
              <input
                type="url"
                {...register('liveUrl')}
                className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                  isDark
                    ? 'bg-[#0d1117] border-[#30363d] text-white focus:border-blue-500'
                    : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                } focus:ring-2 focus:ring-blue-500/20 focus:outline-none`}
                placeholder="https://myproject.com"
              />
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                GitHub URL
              </label>
              <input
                type="url"
                {...register('githubUrl')}
                className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                  isDark
                    ? 'bg-[#0d1117] border-[#30363d] text-white focus:border-blue-500'
                    : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                } focus:ring-2 focus:ring-blue-500/20 focus:outline-none`}
                placeholder="https://github.com/username/repo"
              />
            </div>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="featured"
              {...register('featured')}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label htmlFor="featured" className={`ml-2 text-sm font-medium ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
              Featured Project
            </label>
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
                  {project ? 'Updating...' : 'Creating...'}
                </div>
              ) : (
                project ? 'Update Project' : 'Create Project'
              )}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default ProjectForm;