import { useState, useEffect } from 'react';
import { Project } from '../types';
import { projectsService } from '../lib/projectsService';
import { deleteFromCloudinary } from '../lib/cloudinary';
import toast from 'react-hot-toast';
import { ref, onValue } from 'firebase/database';
import { database } from '../lib/firebase';

export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const projectsRef = ref(database, 'projects');
    
  // Set up real-time listener
  const unsubscribe = onValue(projectsRef, (snapshot) => {
      try {
        if (snapshot.exists()) {
          const projects: Project[] = [];
          snapshot.forEach((childSnapshot) => {
            projects.push({
              id: childSnapshot.key as string,
              ...childSnapshot.val(),
            });
          });
          setProjects(projects);
        } else {
          setProjects([]);
        }
      } catch (error) {
        toast.error('Failed to fetch projects');
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    });

    // Clean up listener
    return () => {
      // onValue returns an unsubscribe function in the modular SDK
      try {
        unsubscribe();
      } catch (e) {
        // fallback: if unsubscribe isn't a function, remove all listeners
        // (keeps behavior safe across SDK versions)
        // @ts-ignore
        ref && (ref as any).off && (ref as any).off(projectsRef);
      }
    };
  }, []);

  const addProject = async (project: Omit<Project, 'id' | 'createdAt'>) => {
    try {
      const id = await projectsService.createProject(project);
      toast.success('Project added successfully');
      return id;
    } catch (error) {
      toast.error('Failed to add project');
      console.error('Error adding project:', error);
      throw error;
    }
  };

  const updateProject = async (id: string, project: Partial<Project>) => {
    try {
      await projectsService.updateProject(id, project);
      toast.success('Project updated successfully');
    } catch (error) {
      toast.error('Failed to update project');
      console.error('Error updating project:', error);
      throw error;
    }
  };

  const deleteProject = async (id: string) => {
    try {
      await projectsService.deleteProject(id);
      toast.success('Project deleted successfully');
    } catch (error) {
      toast.error('Failed to delete project');
      console.error('Error deleting project:', error);
      throw error;
    }
  };

  return {
    projects,
    loading,
    addProject,
    updateProject,
    deleteProject
  };
};