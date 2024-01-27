export const enum UserRole {
  Admin = <string> 'Admin',
  Waiter = <string> 'Waiter',
  Kitchen = <string> 'Kitchen',
  Guest = <string> 'Guest',
}

export interface User {
  id: number
  name: string
  email: string,
  role: UserRole | null,
  role_label: string | null,
}
