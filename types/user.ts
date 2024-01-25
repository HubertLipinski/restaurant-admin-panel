export const enum UserPrivilegesLevel {
  Admin = <number>0,
  Waiter = <number>1,
  Kitchen = <number>2,
  Guest = <number>3,
}

export interface User {
  id: number
  name: string
  email: string,
  privilegesLevel: UserPrivilegesLevel
}
