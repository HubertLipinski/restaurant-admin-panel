import { OrderStatus } from '~/types/order'

export default function () {
  const statuses: OrderStatus[] = [
    {
      name: 'Oczekujące',
      value: OrderStatus.PENDING,
    },
    {
      name: 'W trakcie realizacji',
      value: OrderStatus.IN_PROGRESS,
    },
    {
      name: 'Zapłacone',
      value: OrderStatus.PAID,
    },
    {
      name: 'Zrealizowane',
      value: OrderStatus.COMPLETED,
    },
  ]

  const statusLabelColors = {
    [OrderStatus.PENDING]: 'yellow',
    [OrderStatus.IN_PROGRESS]: 'orange',
    [OrderStatus.PAID]: 'blue',
    [OrderStatus.COMPLETED]: 'green',
  }

  return {
    statuses,
    statusLabelColors,
  }
}
