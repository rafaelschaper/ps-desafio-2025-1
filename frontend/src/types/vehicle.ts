import { categoryType } from './category'

export type vehicleType = {
  id: string
  name: string
  brand: string
  year: string
  image: string
  quantity: number
  category_id: string
  category: categoryType
  created_at: Date
  updated_at: Date
}
