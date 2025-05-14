'use server'

import { api } from '@/services/api'
import { revalidatePath } from 'next/cache'

export async function createVehicle(form: FormData) {
  const res = await api('POST', '/vehicles', { data: form })

  if (!res.error) {
    revalidatePath('/admin/veiculos')
  }

  return JSON.stringify(res)
}

export async function updateVehicle(form: FormData) {
  const res = await api('POST', `/vehicles/${form.get('id')}`, { data: form })

  if (!res.error) {
    revalidatePath('/admin/veiculos')
  }

  return JSON.stringify(res)
}

export async function destroyVehicle(id: string) {
  const res = await api('DELETE', `/vehicles/${id}`)

  if (!res.error) {
    revalidatePath('/admin/veiculos')
  }

  return JSON.stringify(res)
}

export async function buyVehicle(id: string) {
  const res = await api('POST', `/vehicles/${id}/buy`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    withCredentials: true, // Permite que o cookie de sessão seja enviado
  })

  if (!res.error) {
    revalidatePath('/')
  }

  return JSON.stringify(res)
}
