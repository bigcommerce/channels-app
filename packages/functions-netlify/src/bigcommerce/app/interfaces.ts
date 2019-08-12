export interface AuthResponse {
    access_token: string,
    scope: string,
    user: AuthResponseUser,
    context: string,
}

export interface AuthResponseUser {
    id: number,
    email: string,
    username: string
}

export interface UninstallRequest {
  user: UninstallRequestUser,
  owner: UninstallRequestUser,
  context: string,
  store_hash: string
  timestamp: number
}

export interface UninstallRequestUser {
  id: number,
  email: string
}

