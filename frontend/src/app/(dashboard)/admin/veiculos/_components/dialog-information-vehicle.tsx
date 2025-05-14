'use client'

import {
  DialogHeader,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/dialog'
import FormFieldsVehicle from './form-fields-vehicle'
import { vehicleType } from '@/types/vehicle'
import { api } from '@/services/api'
import { useEffect, useState } from 'react'
import { useToast } from '@/components/use-toast'

interface DialogInformationVehicleProps {
  id: string
  children: React.ReactNode
  isInformation?: boolean
}

export function DialogInformationVehicle({
  id,
  children,
}: DialogInformationVehicleProps) {
  const [vehicle, setVehicle] = useState<vehicleType | null>(null)
  const [open, setOpen] = useState<boolean>()
  const { toast } = useToast()

  useEffect(() => {
    const requestData = async () => {
      const { response } = await api<vehicleType>('GET', `/vehicles/${id}`) // requisicao para api

      if (response) {
        setVehicle(response)
      } else {
        setVehicle(null)
        toast({
          title: 'Veículo não encontrado!',
        })
        setOpen(false)
      }
    }

    requestData()

    return () => setVehicle(null)
  }, [id, open, toast])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Informações do veículo</DialogTitle>
          <DialogDescription>
            Visualize as informações detalhadas do veículo abaixo.
          </DialogDescription>
        </DialogHeader>
        <FormFieldsVehicle vehicle={vehicle} readOnly />
      </DialogContent>
    </Dialog>
  )
}
