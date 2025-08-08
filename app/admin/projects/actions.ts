'use server'

import { redirect } from 'next/navigation'
import { v4 as uuidv4 } from 'uuid' // For generating unique IDs
import { addProjectData, updateProjectData, deleteProjectData, getAllProjectsData, Project } from '@/lib/projects-data'
import { protectRoute } from '@/lib/auth'

export async function createProject(formData: FormData) {
  protectRoute()

  const title = formData.get('title') as string
  const description = formData.get('description') as string
  const longDescription = formData.get('longDescription') as string
  const imageUrl = formData.get('imageUrl') as string
  const imagesString = formData.get('images') as string // Comma-separated image URLs
  const demoUrl = formData.get('demoUrl') as string | undefined
  const githubUrl = formData.get('githubUrl') as string | undefined
  const technologiesString = formData.get('technologies') as string // Comma-separated technologies
  const resourcesString = formData.get('resources') as string // JSON string of resources

  if (!title || !description || !longDescription || !imageUrl || !technologiesString) {
    return { success: false, error: 'Missing required fields.' }
  }

  const technologies = technologiesString.split(',').map(tech => tech.trim()).filter(tech => tech)
  const images = imagesString.split(',').map(img => img.trim()).filter(img => img);
  let resources: { name: string; url: string }[] = [];
  try {
    if (resourcesString) {
      resources = JSON.parse(resourcesString);
      if (!Array.isArray(resources) || !resources.every(r => typeof r.name === 'string' && typeof r.url === 'string')) {
        throw new Error('Invalid resources format');
      }
    }
  } catch (e) {
    return { success: false, error: 'Invalid resources JSON format.' }
  }


  const newProject: Project = {
    id: uuidv4(),
    title,
    description,
    longDescription,
    imageUrl,
    images,
    demoUrl: demoUrl || undefined,
    githubUrl: githubUrl || undefined,
    technologies,
    resources,
  }

  addProjectData(newProject)
  redirect('/admin/projects')
}

export async function editProject(projectId: string, formData: FormData) {
  protectRoute()

  const title = formData.get('title') as string
  const description = formData.get('description') as string
  const longDescription = formData.get('longDescription') as string
  const imageUrl = formData.get('imageUrl') as string
  const imagesString = formData.get('images') as string // Comma-separated image URLs
  const demoUrl = formData.get('demoUrl') as string | undefined
  const githubUrl = formData.get('githubUrl') as string | undefined
  const technologiesString = formData.get('technologies') as string // Comma-separated technologies
  const resourcesString = formData.get('resources') as string // JSON string of resources

  if (!title || !description || !longDescription || !imageUrl || !technologiesString) {
    return { success: false, error: 'Missing required fields.' }
  }

  const technologies = technologiesString.split(',').map(tech => tech.trim()).filter(tech => tech)
  const images = imagesString.split(',').map(img => img.trim()).filter(img => img);
  let resources: { name: string; url: string }[] = [];
  try {
    if (resourcesString) {
      resources = JSON.parse(resourcesString);
      if (!Array.isArray(resources) || !resources.every(r => typeof r.name === 'string' && typeof r.url === 'string')) {
        throw new Error('Invalid resources format');
      }
    }
  } catch (e) {
    return { success: false, error: 'Invalid resources JSON format.' }
  }

  const updatedProject: Project = {
    id: projectId, // Ensure ID is preserved
    title,
    description,
    longDescription,
    imageUrl,
    images,
    demoUrl: demoUrl || undefined,
    githubUrl: githubUrl || undefined,
    technologies,
    resources,
  }

  updateProjectData(projectId, updatedProject)
  redirect('/admin/projects')
}

export async function deleteProject(projectId: string) {
  protectRoute()
  deleteProjectData(projectId)
  // No redirect needed here, will trigger re-render on the list page
}
