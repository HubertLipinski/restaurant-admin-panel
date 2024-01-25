interface ErrorResponse {
  message: string,
  statusCode: number,
  statusMessage: string,
  errors?: {
    [key: string]: string[]
  }
}
interface ApiResponse<T> {
  data: T[] | null,
  error?: ErrorResponse,
  links?: any
  meta?: any
}