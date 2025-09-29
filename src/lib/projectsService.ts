import { ref, get, set, remove, push, update } from 'firebase/database';
import { database } from './firebase';
import { Project } from '../types';

const PROJECTS_REF = 'projects';

export const projectsService = {
  async getAllProjects(): Promise<Project[]> {
    const projectsRef = ref(database, PROJECTS_REF);
    const snapshot = await get(projectsRef);
    
    if (snapshot.exists()) {
      const projects: Project[] = [];
      snapshot.forEach((childSnapshot) => {
        projects.push({
          id: childSnapshot.key,
          ...childSnapshot.val(),
        });
      });
      return projects;
    }
    
    return [];
  },

  async createProject(project: Omit<Project, 'id' | 'createdAt'>): Promise<string> {
    const projectsRef = ref(database, PROJECTS_REF);
    const newProjectRef = push(projectsRef);
    const projectWithDate = {
      ...project,
      createdAt: new Date().toISOString(),
    };
    await set(newProjectRef, projectWithDate);
    return newProjectRef.key!;
  },

  async updateProject(id: string, project: Partial<Project>): Promise<void> {
    const projectRef = ref(database, `${PROJECTS_REF}/${id}`);
    await update(projectRef, project);
  },

  async deleteProject(id: string): Promise<void> {
    const projectRef = ref(database, `${PROJECTS_REF}/${id}`);
    await remove(projectRef);
  },

  async getProject(id: string): Promise<Project | null> {
    const projectRef = ref(database, `${PROJECTS_REF}/${id}`);
    const snapshot = await get(projectRef);
    
    if (snapshot.exists()) {
      return {
        id: snapshot.key,
        ...snapshot.val(),
      };
    }
    
    return null;
  },
};