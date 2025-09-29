export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  imagePublicId: string;
  videoUrl?: string;
  videoPublicId?: string;
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  createdAt: string;
}

export interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
}

export interface ContactForm {
  name: string;
  email: string;
  message: string;
}

export interface Certificate {
  id: string;
  title: string;
  issuingOrganization: string;
  issueDate: string;
  credentialId?: string;
  credentialUrl?: string;
  imageUrl: string;
  imagePublicId: string;
  createdAt: string;
}