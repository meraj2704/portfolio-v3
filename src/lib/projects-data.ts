// This module defines and manages project data.
// In Next.js, changes made via Server Actions will persist only for the current session.
// For real persistence, integrate a database.
export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  imageUrl: string; // Main thumbnail image
  images: string[]; // Array of images for the carousel
  demoUrl?: string;
  githubUrl?: string;
  technologies: string[];
  resources?: { name: string; url: string }[];
}

// Using a 'let' variable to allow modification via server actions within the current session
let projectsData: Project[] = [
  {
    id: 'e-commerce-platform',
    title: 'E-commerce Platform',
    description: 'A full-stack e-commerce solution built with Next.js, Nest.js, and PostgreSQL.',
    longDescription: 'Developed a robust e-commerce platform from scratch, covering user authentication, product management, shopping cart functionality, and secure payment processing. The backend is powered by Nest.js for scalable APIs, while the frontend provides a smooth user experience with Next.js. Implemented a PostgreSQL database for efficient data storage and retrieval. Key features include user dashboards, admin panels for product and order management, and integration with a third-party payment gateway.',
    imageUrl: '/placeholder.svg?height=200&width=300&text=E-commerce Thumbnail',
    images: [
      '/placeholder.svg?height=600&width=900&text=E-commerce Screenshot 1',
      '/placeholder.svg?height=600&width=900&text=E-commerce Screenshot 2',
      '/placeholder.svg?height=600&width=900&text=E-commerce Screenshot 3',
    ],
    demoUrl: '#',
    githubUrl: '#',
    technologies: ['Next.js', 'Nest.js', 'PostgreSQL', 'TypeScript', 'Stripe'],
    resources: [
      { name: 'Nest.js Documentation', url: 'https://docs.nestjs.com/' },
      { name: 'Next.js Documentation', url: 'https://nextjs.org/docs' },
    ],
  },
  {
    id: 'real-time-chat-app',
    title: 'Real-time Chat App',
    description: 'A real-time chat application using WebSockets with Node.js and React.',
    longDescription: 'Built a responsive and real-time chat application enabling instant messaging between users. Utilized Socket.IO for WebSocket communication to ensure low-latency message delivery. The frontend is developed with React for a dynamic user interface, and the backend is an Express.js server handling user connections and message broadcasting. Features include private messaging, group chats, online status indicators, and message history persistence using MongoDB.',
    imageUrl: '/placeholder.svg?height=200&width=300&text=Chat App Thumbnail',
    images: [
      '/placeholder.svg?height=600&width=900&text=Chat App Screenshot 1',
      '/placeholder.svg?height=600&width=900&text=Chat App Screenshot 2',
      '/placeholder.svg?height=600&width=900&text=Chat App Screenshot 3',
    ],
    demoUrl: '#',
    githubUrl: '#',
    technologies: ['React', 'Node.js', 'Socket.IO', 'Express.js', 'MongoDB'],
    resources: [
      { name: 'Socket.IO Documentation', url: 'https://socket.io/docs/' },
      { name: 'React Documentation', url: 'https://react.dev/docs' },
    ],
  },
  {
    id: 'restful-api-service',
    title: 'RESTful API Service',
    description: 'A robust and documented RESTful API built with Express.js and MongoDB.',
    longDescription: 'Developed a comprehensive RESTful API to serve as a backend for various applications. The API is built with Express.js, providing well-structured endpoints for user management, data fetching, and CRUD operations for different resources. MongoDB is used as the NoSQL database for flexible data storage. Implemented JWT for secure authentication and authorization. API documentation is generated using Swagger UI, making it easy for other developers to integrate. Focused on performance, error handling, and maintainability.',
    imageUrl: '/placeholder.svg?height=200&width=300&text=API Service Thumbnail',
    images: [
      '/placeholder.svg?height=600&width=900&text=API Service Screenshot 1',
      '/placeholder.svg?height=600&width=900&text=API Service Screenshot 2',
      '/placeholder.svg?height=600&width=900&text=API Service Screenshot 3',
    ],
    demoUrl: '#',
    githubUrl: '#',
    technologies: ['Express.js', 'Node.js', 'MongoDB', 'Swagger', 'JWT'],
    resources: [
      { name: 'Express.js Documentation', url: 'https://expressjs.com/' },
      { name: 'MongoDB Documentation', url: 'https://www.mongodb.com/docs/' },
    ],
  },
  {
    id: 'portfolio-website',
    title: 'Portfolio Website',
    description: 'This very portfolio website, showcasing modern web development practices.',
    longDescription: 'Designed and developed this personal portfolio website to showcase my skills and projects. Built with Next.js for server-side rendering and static site generation, React for component-based UI, and Tailwind CSS for rapid styling. Features include dynamic content loading, smooth scroll animations, a responsive design for all devices, and a dedicated projects page with filtering capabilities. The site emphasizes a modern, dark aesthetic with vibrant accent colors.',
    imageUrl: '/placeholder.svg?height=200&width=300&text=Portfolio Thumbnail',
    images: [
      '/placeholder.svg?height=600&width=900&text=Portfolio Screenshot 1',
      '/placeholder.svg?height=600&width=900&text=Portfolio Screenshot 2',
      '/placeholder.svg?height=600&width=900&text=Portfolio Screenshot 3',
    ],
    demoUrl: '#',
    githubUrl: '#',
    technologies: ['Next.js', 'React', 'Tailwind CSS', 'TypeScript', 'Shadcn/ui'],
    resources: [
      { name: 'Next.js Documentation', url: 'https://nextjs.org/docs' },
      { name: 'Tailwind CSS Documentation', url: 'https://tailwindcss.com/docs' },
    ],
  },
  {
    id: 'task-management-system',
    title: 'Task Management System',
    description: 'A collaborative task management system with real-time updates, user roles, and project organization.',
    longDescription: 'Developed a collaborative task management system designed for teams to organize and track their work efficiently. The application supports real-time updates for tasks and projects, allowing team members to see changes instantly. Features include user authentication, role-based access control, project creation, task assignment, and progress tracking. The backend is built with Nest.js and TypeORM, interacting with a PostgreSQL database, while the frontend provides an intuitive interface using React.',
    imageUrl: '/placeholder.svg?height=200&width=300&text=Task System Thumbnail',
    images: [
      '/placeholder.svg?height=600&width=900&text=Task System Screenshot 1',
      '/placeholder.svg?height=600&width=900&text=Task System Screenshot 2',
      '/placeholder.svg?height=600&width=900&text=Task System Screenshot 3',
    ],
    demoUrl: '#',
    githubUrl: '#',
    technologies: ['Nest.js', 'React', 'TypeORM', 'PostgreSQL', 'WebSockets'],
    resources: [
      { name: 'Nest.js Documentation', url: 'https://docs.nestjs.com/' },
      { name: 'TypeORM Documentation', url: 'https://typeorm.io/' },
    ],
  },
  {
    id: 'blog-platform',
    title: 'Blog Platform',
    description: 'A content-rich blog platform with a custom CMS, markdown support, and SEO optimization.',
    longDescription: 'Created a modern blog platform with a focus on content creation and SEO. The platform includes a custom content management system (CMS) for easy post creation and management, supporting markdown for rich text editing. Built with Next.js for optimal performance and SEO capabilities, ensuring high search engine rankings. Features include category management, tag support, author profiles, and a responsive design for seamless viewing across devices. Integrated with a headless CMS for flexible content delivery.',
    imageUrl: '/placeholder.svg?height=200&width=300&text=Blog Platform Thumbnail',
    images: [
      '/placeholder.svg?height=600&width=900&text=Blog Platform Screenshot 1',
      '/placeholder.svg?height=600&width=900&text=Blog Platform Screenshot 2',
      '/placeholder.svg?height=600&width=900&text=Blog Platform Screenshot 3',
    ],
    demoUrl: '#',
    githubUrl: '#',
    technologies: ['Next.js', 'React', 'GraphQL', 'Headless CMS', 'SEO', 'Markdown'],
    resources: [
      { name: 'Next.js Documentation', url: 'https://nextjs.org/docs' },
      { name: 'GraphQL Documentation', url: 'https://graphql.org/learn/' },
    ],
  },
];

// Export a function to get all projects
export function getAllProjectsData(): Project[] {
  return [...projectsData]; // Return a copy to prevent external modification
}

// Export a function to get all unique technologies
export const allTechnologies = Array.from(new Set(projectsData.flatMap(project => project.technologies))).sort();

export function getProjectById(id: string): Project | undefined {
  return projectsData.find(project => project.id === id);
}

// Server-side functions to modify the in-memory data
// These functions are called by Server Actions
export function addProjectData(project: Project) {
  projectsData.push(project);
}

export function updateProjectData(id: string, updatedProject: Project) {
  const index = projectsData.findIndex(p => p.id === id);
  if (index !== -1) {
    projectsData[index] = { ...updatedProject, id }; // Ensure ID remains consistent
  }
}

export function deleteProjectData(id: string) {
  projectsData = projectsData.filter(p => p.id !== id);
}
