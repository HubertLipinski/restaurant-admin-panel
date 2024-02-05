import { OrderStatus, PaymentStatus } from '~/types/order'

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

  const paymentStatuses = [
    { name: 'Oczekujące', value: PaymentStatus.PENDING },
    { name: 'Nieudane', value: PaymentStatus.FAILED },
    { name: 'Zakończone', value: PaymentStatus.COMPLETED }
  ]

  const paymentStatusesColors = {
    [PaymentStatus.PENDING]: 'yellow',
    [PaymentStatus.FAILED]: 'red',
    [PaymentStatus.COMPLETED]: 'green',
  }

  return {
    statuses,
    statusLabelColors,
    paymentStatuses,
    paymentStatusesColors,
  }
}
