export default function () {
  const toast = useToast()
  const success = (message: string) => {
    toast.add({
      title: 'Sukces!',
      color: 'green',
      description: message,
      icon: 'i-heroicons-check-circle',
      timeout: 5 * 1000,
    })
  }

  const error = (message: string) => {
    toast.add({
      title: 'Oops...',
      color: 'red',
      description: message,
      icon: 'i-heroicons-x-circle',
      timeout: 5 * 1000,
    })
  }

  const errorResponse = (id: string, error: ErrorResponse, seconds?: number = 20) => {
    toast.add({
      id,
      title: `Wystąpił błąd ${error.statusCode}!`,
      color: 'red',
      description: error.message,
      icon: 'i-heroicons-x-circle',
      timeout: seconds * 1000,
      ui: { description: 'break-all' },
    })
  }

  return {
    success,
    error,
    errorResponse,
  }
}
