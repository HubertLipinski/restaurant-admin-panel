import { UserRole } from '~/types/user'

export default function () {
  const roles = [
    {
      name: 'Administrator',
      value: UserRole.Admin,
    },
    {
      name: 'Kelner',
      value: UserRole.Waiter,
    },
    {
      name: 'Kuchnia',
      value: UserRole.Kitchen,
    },
    {
      name: 'Gość',
      value: UserRole.Guest,
    },
  ]

  return {
    roles,
  }
}