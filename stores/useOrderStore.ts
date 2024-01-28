import type { Order } from '~/types/user'

export const useOrderStore = defineStore('orders', () => {
  const { success } = useNotification()
  const apiPath: string = '/orders'

  async function deleteOrder(id: number): void {
    await useApiFetch<Order>(`${apiPath}/${id}`, { method: 'DELETE' })

    success('Zamówienie zostało pomyślnie usunięte')
  }

  return {
    apiPath,
    deleteOrder,
  }
})
