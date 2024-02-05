export const enum OrderStatus {
  PENDING = <string> 'pending',
  IN_PROGRESS = <string> 'in_progress',
  PAID = <string> 'paid',
  COMPLETED = <string> 'completed',
}

export const enum PaymentStatus {
  PENDING = <string> 'pending',
  FAILED = <string> 'failed',
  COMPLETED = <string> 'completed',
}

export interface Payment {
  id: number
  status: PaymentStatus
  created_at: string | null
  updated_at: string | null
}

export interface Order {
  id: number
  total_price: number
  status: OrderStatus
  status_label: string
  payments: Payment[]
  order_date: string | null
  created_at: string | null
  updated_at: string | null
  table: Table
  dishes: Dish[],
}