'use client'

import { useToast } from '@/components/use-toast'
import { api } from '@/services/api'
import { vehicleType } from '@/types/vehicle'
import { useEffect, useState } from 'react'
import style from './style.module.css'
import Card from '@/components/site_PS/card/card'
import Navbar from '@/components/site_PS/navbar/navbar'
import Footer from '@/components/site_PS/footer/footer'

export default function Home() {
  const [vehicles, setVehicles] = useState<vehicleType[] | undefined>()
  const [filteredVehicles, setFilteredVehicles] = useState<
    vehicleType[] | undefined
  >()
  const [searchTerm, setSearchTerm] = useState<string>('')
  const { toast } = useToast()

  useEffect(() => {
    const requestData = async () => {
      const { response } = await api<vehicleType[]>('GET', `/vehicles`)

      if (response) {
        setVehicles(response)
        setFilteredVehicles(response)
      } else {
        toast({
          title: 'Veículos não encontrados!',
        })
      }
    }
    requestData()
  }, [toast])

  useEffect(() => {
    if (searchTerm === '') {
      setFilteredVehicles(vehicles)
    } else {
      const filtered = vehicles?.filter(
        (vehicle) =>
          vehicle.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          vehicle.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
          vehicle.category.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          vehicle.year.includes(searchTerm),
      )
      setFilteredVehicles(filtered)
    }
  }, [searchTerm, vehicles])

  const handleQuantityUpdate = (id: string) => {
    setVehicles((prev) =>
      prev?.map((vehicle) =>
        vehicle.id === id
          ? { ...vehicle, quantity: vehicle.quantity - 1 }
          : vehicle,
      ),
    )

    setFilteredVehicles((prev) =>
      prev?.map((vehicle) =>
        vehicle.id === id
          ? { ...vehicle, quantity: vehicle.quantity - 1 }
          : vehicle,
      ),
    )
  }

  return (
    <>
      <div className={style.page}>
        <Navbar logo="./images/site-logo.png" />
        <div className={style.banner}>
          <img
            src="./images/banner.jpg"
            alt="Banner background"
            className={style.banner_bg}
          />
          <img
            src="./images/site-logo.png"
            alt="logo"
            className={style.banner_logo}
          />
        </div>
        <h1 className={style.title}>Veículos</h1>

        <input
          type="text"
          placeholder="Busque por nome, marca, categoria ou ano"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={style.search}
        />
        <div className={style.wrapper}>
          {filteredVehicles?.map((vehicle: vehicleType, index: number) => (
            <Card
              vehicle={vehicle}
              key={index}
              onBuy={() => handleQuantityUpdate(vehicle.id)}
            />
          ))}
        </div>
        <Footer />
      </div>
    </>
  )
}
