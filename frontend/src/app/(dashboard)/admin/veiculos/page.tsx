import {
  DashboardHeader,
  DashboardHeaderDescription,
  DashboardHeaderTitle,
  DashboardMain,
} from '@/components/dashboard/dashboard-items'
import { FaCarAlt } from 'react-icons/fa'
import ListVehicles from './_components/list-vehicles'
import { Suspense } from 'react'

export default async function Page() {
  return (
    <>
      <DashboardHeader>
        <DashboardHeaderTitle>
          <FaCarAlt />
          Veículos
        </DashboardHeaderTitle>
        <DashboardHeaderDescription>
          Cadastre, edite, visualize e exclua veículos.
        </DashboardHeaderDescription>
      </DashboardHeader>
      <DashboardMain>
        <Suspense>
          <ListVehicles />
        </Suspense>
      </DashboardMain>
    </>
  )
}
