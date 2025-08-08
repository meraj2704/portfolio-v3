'use server'

import { redirect } from 'next/navigation'
import { v4 as uuidv4 } from 'uuid'
import { addServiceData, updateServiceData, deleteServiceData, Service } from '@/lib/services-data'
import { protectRoute } from '@/lib/auth'

export async function createService(formData: FormData) {
  protectRoute()

  const title = formData.get('title') as string
  const shortDescription = formData.get('shortDescription') as string
  const longDescription = formData.get('longDescription') as string
  const icon = formData.get('icon') as Service['icon'] // Ensure it's a valid icon name

  if (!title || !shortDescription || !longDescription || !icon) {
    return { success: false, error: 'Missing required fields.' }
  }

  const newService: Service = {
    id: uuidv4(),
    title,
    shortDescription,
    longDescription,
    icon,
  }

  addServiceData(newService)
  redirect('/admin/services')
}

export async function editService(serviceId: string, formData: FormData) {
  protectRoute()

  const title = formData.get('title') as string
  const shortDescription = formData.get('shortDescription') as string
  const longDescription = formData.get('longDescription') as string
  const icon = formData.get('icon') as Service['icon']

  if (!title || !shortDescription || !longDescription || !icon) {
    return { success: false, error: 'Missing required fields.' }
  }

  const updatedService: Service = {
    id: serviceId,
    title,
    shortDescription,
    longDescription,
    icon,
  }

  updateServiceData(serviceId, updatedService)
  redirect('/admin/services')
}

export async function deleteService(serviceId: string) {
  protectRoute()
  deleteServiceData(serviceId)
  // No redirect needed here, will trigger re-render on the list page
}
