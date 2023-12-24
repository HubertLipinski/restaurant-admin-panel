export enum UserRole {
  Admin = 'admin',
  Waiter = 'waiter',
  Kitchen = 'kitchen',
  Guest = 'guest',
}

export interface User {
  id: number
  name: string
  lastName: string
  avatar: string | null
  role: UserRole
}
