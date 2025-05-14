'use client'

import { vehicleType } from '@/types/vehicle'
import style from './style.module.css'
import { useToast } from '@/components/use-toast'
import { buyVehicle } from '@/actions/vehicle'

interface vehicleProps {
  vehicle: vehicleType
  onBuy: () => void
}

export default function Card({ vehicle, onBuy }: vehicleProps) {
  const { toast } = useToast()

  const handlePurchase = async () => {
    const response = await buyVehicle(vehicle.id)
    const result = JSON.parse(response)

    if (!result.error) {
      toast({
        title: 'Compra realizada com sucesso!',
      })
      onBuy()
    } else {
      toast({
        title: 'Erro ao realizar a compra. Tente novamente!',
      })
    }
  }

  return (
    <div className={style.card}>
      <img
        src={vehicle.image}
        alt="Imagem do veículo"
        className={style.card_img}
      />
      <div className={style.card_body}>
        <h2 className={style.card_name}>{vehicle.name}</h2>
        <p className={style.card_content}>Marca: {vehicle.brand}</p>
        <p className={style.card_content}>Ano: {vehicle.year}</p>
        <p className={style.card_content}>Categoria: {vehicle.category.name}</p>
        <div className={style.card_footer}>
          <p className={style.card_content}>Disponíveis: {vehicle.quantity}</p>
          <button
            onClick={handlePurchase}
            disabled={vehicle.quantity <= 0}
            className={style.card_btn}
          >
            {vehicle.quantity > 0 ? 'Comprar' : 'Indisponível'}
          </button>
        </div>
      </div>
    </div>
  )
}
