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
import { createVehicle } from '@/actions/vehicle'
import { filterFormData } from '@/services/filter-form-data'
import { useEffect, useState } from 'react'
import { useToast } from '@/components/use-toast'
import { ResponseErrorType } from '@/services/api'

interface DialogCreateVehicleProps {
  children: React.ReactNode
}

export function DialogCreateVehicle({ children }: DialogCreateVehicleProps) {
  const [open, setOpen] = useState<boolean>()
  const [error, setError] = useState<ResponseErrorType | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    if (!open) {
      setError(null)
    }
  }, [open])

  const submit = async (form: FormData) => {
    const newForm = await filterFormData(form)

    const { error } = await JSON.parse(await createVehicle(newForm))

    if (error) {
      setError(error)
      toast({
        title: 'Não foi possível criar o veículo!',
      })
    } else {
      toast({
        title: 'Veículo criado com sucesso!',
      })
      setOpen(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar veículo</DialogTitle>
          <DialogDescription>
            Preencha as informações do novo veículo abaixo e clique em
            &rdquo;Salvar&rdquo; para incluí-lo no sistema.
          </DialogDescription>
        </DialogHeader>
        <form action={submit}>
          <FormFieldsVehicle error={error} />
        </form>
      </DialogContent>
    </Dialog>
  )
}
