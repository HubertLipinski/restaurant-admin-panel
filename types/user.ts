export enum UserRole {
  Admin = 'admin',
  Owner = 'owner',
  User = 'user'
}

export interface User {
  id: number
  name: string
  lastName: string
  avatar: string | null
  role: UserRole
}
