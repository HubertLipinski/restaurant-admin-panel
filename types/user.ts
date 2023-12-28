export enum UserPrivilegesLevel {
  Admin = 0,
  Waiter = 1,
  Kitchen = 2,
  Guest = 3,
}

export interface User {
  id: number
  name: string
  privilegesLevel: UserPrivilegesLevel
}
