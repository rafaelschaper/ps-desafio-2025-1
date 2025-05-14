import { DashboardContainer } from '@/components/dashboard/dashboard-items'
import {
  TabbleCellImage,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/dashboard/table'
import { api } from '@/services/api'
import { vehicleType } from '@/types/vehicle'
import { Button } from '@/components/button'
import { LuInfo, LuPen, LuCirclePlus, LuTrash } from 'react-icons/lu'
import { DialogUpdateVehicle } from './dialog-update-vehicle'
import { DialogVehicleDelete } from './dialog-delete-vehicle'
import { DialogInformationVehicle } from './dialog-information-vehicle'
import { DialogCreateVehicle } from './dialog-create-vehicle'

export default async function ListVehicles() {
  const { response } = await api<vehicleType[]>('GET', '/vehicles') // requisicao para api

  if (!response) {
    return (
      <DashboardContainer className="text-destructive">
        Não foi possível obter os veículos.
      </DashboardContainer>
    )
  }

  const vehicles: vehicleType[] = response

  return (
    <>
      <DashboardContainer className="flex h-min justify-between space-x-0 gap-y-2.5 max-sm:flex-col">
        <DialogCreateVehicle>
          <Button size="sm">
            <LuCirclePlus />
            Novo veículo
          </Button>
        </DialogCreateVehicle>
      </DashboardContainer>
      <DashboardContainer>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Imagem</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>Marca</TableHead>
              <TableHead>Ano</TableHead>
              <TableHead>Quantidade</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {vehicles?.map((vehicle: vehicleType) => (
              <TableRow key={vehicle.id}>
                <TableCell>
                  <TabbleCellImage src={vehicle.image} />
                </TableCell>
                <TableCell>{vehicle.name}</TableCell>
                <TableCell>{vehicle.brand}</TableCell>
                <TableCell>{vehicle.year}</TableCell>
                <TableCell>{vehicle.quantity}</TableCell>
                <TableCell>{vehicle.category.name}</TableCell>
                <TableCell className="flex justify-end gap-2">
                  <DialogInformationVehicle id={vehicle.id}>
                    <Button variant="default-inverse" size="icon">
                      <LuInfo />
                    </Button>
                  </DialogInformationVehicle>
                  <DialogUpdateVehicle id={vehicle.id}>
                    <Button variant="secondary-inverse" size="icon">
                      <LuPen />
                    </Button>
                  </DialogUpdateVehicle>
                  <DialogVehicleDelete id={vehicle.id}>
                    <Button variant="destructive-inverse" size="icon">
                      <LuTrash />
                    </Button>
                  </DialogVehicleDelete>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          {!vehicles.length && (
            <TableCaption>Nenhum veículo encontrado.</TableCaption>
          )}
        </Table>
      </DashboardContainer>
    </>
  )
}
